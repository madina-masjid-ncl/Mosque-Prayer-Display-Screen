import { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import { dtLocale, dtNowLocale } from "@/lib/datetimeUtils"

const blackoutPeriod = process.env.NEXT_PUBLIC_BLACKOUT_PERIOD ?? 13 // defaults to 13 minutes

export function isBlackout(prayerTimes: DailyPrayerTime) {
  const currentTime = dtNowLocale()
  const congregationTimes = [
    prayerTimes.fajr.congregation_start,
    prayerTimes.zuhr.congregation_start,
    prayerTimes.asr.congregation_start,
    prayerTimes.maghrib.congregation_start,
    prayerTimes.isha.congregation_start,
  ]

  let setBlackoutMode = false

  congregationTimes.forEach((time) => {
    if (
      currentTime >= dtLocale(time, ["HH:mm"]) &&
      currentTime <= dtLocale(time, ["HH:mm"]).add(blackoutPeriod, "m")
    ) {
      setBlackoutMode = true
    }
  })

  return setBlackoutMode
}

export function getNextPrayer(today?: DailyPrayerTime, tomorrow?: DailyPrayerTime) {
  let nextPrayertime = {
    today: false,
    prayerIndex: 0,
    prayerLabel: getPrayerLabelFromIndex(0),
    time: tomorrow?.fajr.congregation_start,
  }

  if (!today) {
    return {
      today: false,
      prayerIndex: 0,
      prayerLabel: "",
      time: ""
    }
  }

  const currentTime = dtNowLocale()
  const todaysTimes = [
    today.fajr.congregation_start,
    today.zuhr.congregation_start,
    today.asr.congregation_start,
    today.maghrib.congregation_start,
    today.isha.congregation_start,
  ]
  todaysTimes.forEach((time, index) => {
    if (currentTime < dtLocale(time, ["HH:mm"]) && !nextPrayertime.today) {
      nextPrayertime = {
        today: true,
        prayerIndex: index,
        prayerLabel: getPrayerLabelFromIndex(index),
        time: time,
      }
    }
  })

  return nextPrayertime
}

export function getPrayerLabelFromIndex(index: number): string {
  return DailyPrayerLabels[index] ?? ""
}

export const DailyPrayerLabels = ["Fajr", "Zuhr", "Asr", "Maghrib", "Isha"]
