import { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import "../../widget.css"
import { getNextPrayer } from "@/services/PrayerTimeService"
import {
  getPrayerTimesForToday,
  getPrayerTimesForTomorrow,
} from "@/services/MosqueDataService"
import { cn } from "@/lib/utils"
import {
  dtHijriNow,
  dtNowFormatFull,
  dtNowHijriFormatFull,
  dtNowLocale,
  dtFormatTimeToCustom,
} from "@/lib/datetimeUtils"
import { FaSun } from "react-icons/fa"

type Props = {
  timeFormat?: "h:mm" | "h:mm A" | "HH:mm"
  showSunrise?: boolean
  showDate?: boolean
  showHijri?: boolean
  highlightColor?: string
}

export async function TodayPrayerTime({
  timeFormat = "h:mm",
  showSunrise = false,
  showDate = false,
  showHijri = false,
  highlightColor,
}: Props) {
  const convertTime = (time: string) => dtFormatTimeToCustom(time, timeFormat)

  const today: DailyPrayerTime = await getPrayerTimesForToday()
  const tomorrow: DailyPrayerTime = await getPrayerTimesForTomorrow()
  let currentDailyPrayerTimes = today
  let englishDate = dtNowFormatFull()
  let hijriDate = dtNowHijriFormatFull()

  let nextPrayerTime = getNextPrayer(today)
  if (!nextPrayerTime.today) {
    nextPrayerTime = {
      today: true,
      prayerIndex: 0,
      prayerLabel: "",
      time: ""
    }
    currentDailyPrayerTimes = tomorrow
    englishDate = dtNowLocale().add(1, "day").format("D MMMM YYYY")
    hijriDate = dtHijriNow().add(1, "day").format("iD iMMMM iYYYY")
  }

  let currentSalahTimes: Array<{
    label: string
    start: string
    congregation: string | null
    prayerIndex: number
  }> = [
    {
      label: "Fajr",
      start: currentDailyPrayerTimes.fajr.start,
      congregation: currentDailyPrayerTimes.fajr.congregation_start,
      prayerIndex: 0,
    },
    {
      label: "Zuhr",
      start: currentDailyPrayerTimes.zuhr.start,
      congregation: currentDailyPrayerTimes.zuhr.congregation_start,
      prayerIndex: 1,
    },
    {
      label: "Asr",
      start: currentDailyPrayerTimes.asr.start,
      congregation: currentDailyPrayerTimes.asr.congregation_start,
      prayerIndex: 2,
    },
    {
      label: "Maghrib",
      start: currentDailyPrayerTimes.maghrib.start,
      congregation: currentDailyPrayerTimes.maghrib.congregation_start,
      prayerIndex: 3,
    },
    {
      label: "Isha",
      start: currentDailyPrayerTimes.isha.start,
      congregation: currentDailyPrayerTimes.isha.congregation_start,
      prayerIndex: 4,
    },
  ]

  const isHighlighted = (prayerIndex: number) =>
    nextPrayerTime.today && nextPrayerTime.prayerIndex === prayerIndex

  const highlightStyle = highlightColor
    ? { backgroundColor: `#${highlightColor}`, color: "#fff" }
    : undefined

  return (
    <div className="PrayerTimeWidgetWrapper">
      <table className="w-full ml-0 text-center">
        <thead>
          {(showDate || showHijri) && (
            <tr>
              {/*<th*/}
              {/*  className={"text-sm md:text-base pr-6 text-right text-gray-300"}*/}
              {/*></th>*/}
              <th
                colSpan={currentSalahTimes?.length + 1}
                className={
                  "text-gray-500 font-normal text-center text-sm md:text-base"
                }
              >
                {[showDate && englishDate, showHijri && hijriDate]
                  .filter(Boolean)
                  .join(" • ")}
              </th>
            </tr>
          )}
          <tr>
            <th />
            {currentSalahTimes.map((value, index) => (
              <th
                key={index}
                className={cn(
                  "min-w-[10px] w-24  text-sm md:text-base",
                  isHighlighted(value.prayerIndex) &&
                    (highlightColor
                      ? "rounded-t-md"
                      : "bg-mosqueBrand-primaryAlt text-mosqueBrand-onPrimary rounded-t-md"),
                )}
                style={
                  isHighlighted(value.prayerIndex) ? highlightStyle : undefined
                }
              >
                {value.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th
              className={
                "text-sm md:text-base text-right text-gray-500 font-medium pr-2"
              }
            >
              Begins
            </th>
            {currentSalahTimes.map((value, index) => (
              <td
                key={index}
                className={cn(
                  "min-w-[10px] w-24",
                  isHighlighted(value.prayerIndex) &&
                    !highlightColor &&
                    "bg-mosqueBrand-primaryAlt text-mosqueBrand-onPrimary",
                )}
                style={
                  isHighlighted(value.prayerIndex) ? highlightStyle : undefined
                }
              >
                {value.start ? convertTime(value.start) : ""}
              </td>
            ))}
          </tr>
          <tr>
            <th
              className={
                "text-sm md:text-base text-right text-gray-500 font-medium pr-1 md:pr-2"
              }
            >
              Jama&apos;ah
            </th>

            {currentSalahTimes.map((value, index) => (
              <td
                key={index}
                className={cn(
                  "min-w-[10px] w-24",
                  isHighlighted(value.prayerIndex) &&
                    (highlightColor
                      ? "rounded-b-md"
                      : "bg-mosqueBrand-primaryAlt text-mosqueBrand-onPrimary rounded-b-md"),
                )}
                style={
                  isHighlighted(value.prayerIndex) ? highlightStyle : undefined
                }
              >
                {value.congregation ? convertTime(value.congregation) : ""}
              </td>
            ))}
          </tr>
          {showSunrise && (
            <tr>
              <td></td>
              <td
                className={"text-sm md:text-base text-right text-gray-400 pl-2"}
                colSpan={currentSalahTimes?.length}
              >
                <div className={"flex flex-row items-center gap-1"}>
                  <FaSun style={{color:"orange", opacity: 0.7}} />
                  Sunrise {currentDailyPrayerTimes.sunrise_start}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
