import type {
  DailyPrayerTime,
  UpcomingPrayerTimes,
} from "@/types/DailyPrayerTimeType"
import {
  getJummahTimes,
  getMetaData,
  getMosqueData,
  getPrayerTimesForToday,
  getPrayerTimesForTomorrow,
  getPrayerTimesForUpcomingDays,
} from "@/services/MosqueDataService"
import type { JummahTimes } from "@/types/JummahTimesType"
import type { MosqueData, MosqueMetadataType } from "@/types/MosqueDataType"
import { ConfigurationJson } from "@/types/ConfigurationType"
import SunriseJummahTiles from "@/components/SunriseJummahTiles/SunriseJummahTiles"
import UpcomingPrayerDayTiles from "@/components/UpcomingPrayerDayTiles/UpcomingPrayerDayTiles"
import Date from "@/components/Date/Date"
import PrayerTimes from "@/components/PrayerTimes/PrayerTimes"
import NextPrayerTimeSlide
  from "@/components/Screens/Slides/NextPrayerTimeSlide"
import { ScreenMosqueDataProvider } from "@/providers/ScreenMosqueDataProvider"
import MosqueMetadata from "@/components/MosqueMetadata/MosqueMetadata"
import MosqueLogo from "@/components/MosqueMetadata/MosqueLogo"

export default async function MobileScreenLayout({
  config,
}: {
  config: ConfigurationJson
}) {
  const mosqueData: MosqueData = await getMosqueData()
  const today: DailyPrayerTime = await getPrayerTimesForToday()
  const tomorrow: DailyPrayerTime = await getPrayerTimesForTomorrow()
  const jummahTimes: JummahTimes = await getJummahTimes()
  const mosqueMetadata: MosqueMetadataType = await getMetaData()
  const upcomingPrayerDays: UpcomingPrayerTimes[] =
    await getPrayerTimesForUpcomingDays()

  let slides = [
    <SunriseJummahTiles
      sunrise={today.sunrise_start}
      jummahTimes={jummahTimes}
      key={"sunrise_jummah_times"}
    />,
  ]

  upcomingPrayerDays.forEach((times) => {
    slides.push(
      <UpcomingPrayerDayTiles times={times} key={times.display_date} />,
    )
  })

  return (
    <ScreenMosqueDataProvider
      mosqueData={mosqueData}
      today={today}
      tomorrow={tomorrow}
      jummahTimes={jummahTimes}
      mosqueMetadata={mosqueMetadata}
      upcomingPrayerDays={upcomingPrayerDays}
    >
      <div className="bg-mosqueBrand min-h-screen min-w-full cursor-none overflow-x-hidden">
        <main className="md:p-5">
          <div className="md:grid md:grid-cols-8">
            <div className="md:col-span-3">
              {/*<div className="p-4 md:p-6">*/}
              {/*  <Clock />*/}
              {/*</div>*/}

              <div className="p-1">
                <MosqueLogo metadata={mosqueMetadata} />
              </div>
              <div className="p-1">
                <Date />
              </div>
              {/*<div className="hidden md:p-6 md:block">*/}
              {/*  <Notice />*/}
              {/*</div>*/}
            </div>

            <div className="p-2">
              <NextPrayerTimeSlide
                className={
                  "bg-mosqueBrand-primaryAlt text-mosqueBrand-onPrimaryAlt flex-row gap-4 justify-between px-4 py-4"
                }
              />
            </div>
            <div className="p-0">
              <PrayerTimes today={today} tomorrow={tomorrow} />
            </div>
          </div>
          {/*<div className="p-4 md:p-6">*/}
          {/*  <SlidingBanner slides={slides} />*/}
          {/*</div>*/}
          {/*<ServiceWorker />*/}
        </main>
        {/*{config.feature.announcement.enabled && <Announcement />}*/}
        {/*<Blackout prayerTimeToday={today} />*/}
      </div>
    </ScreenMosqueDataProvider>
  )
}
