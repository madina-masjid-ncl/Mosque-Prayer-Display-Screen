"use client"

import { ConfigurationJson } from "@/types/ConfigurationType"
import SunriseJummahTiles from "@/components/SunriseJummahTiles/SunriseJummahTiles"
import UpcomingPrayerDayTiles from "@/components/UpcomingPrayerDayTiles/UpcomingPrayerDayTiles"
import Clock from "@/components/Clock/Clock"
import Date from "@/components/Date/Date"
import MosqueMetadata from "@/components/MosqueMetadata/MosqueMetadata"
import Notice from "@/components/Notice/Notice"
import PrayerTimes from "@/components/PrayerTimes/PrayerTimes"
import SlidingBanner from "@/components/SlidingBanner/SlidingBanner"
import ServiceWorker from "@/components/ServiceWorker/ServiceWorker"
import Announcement from "@/components/Announcement/Announcement"
import Blackout from "@/components/Blackout/Blackout"
import { useContext } from "react"
import { ScreenMosqueDataContext } from "@/providers/ScreenMosqueDataProvider"
import OfflineTag from "@/components/OfflineTag/OfflineTag"


interface DefaultScreenProps {
  config: ConfigurationJson
}

export default function DefaultScreen({ config }: DefaultScreenProps) {
  const { today, tomorrow, mosqueMetadata, jummahTimes, upcomingPrayerDays } = useContext(ScreenMosqueDataContext)

  let slides = [
    <SunriseJummahTiles
      sunrise={today?.sunrise_start ?? ""}
      jummahTimes={jummahTimes ?? []}
      key={"sunrise_jummah_times"}
    />,
  ]

  upcomingPrayerDays.forEach((times) => {
    slides.push(
      <UpcomingPrayerDayTiles times={times} key={times.display_date} />,
    )
  })

  return (
    <div className="bg-mosqueBrand h-full w-full">
      <main className="flex h-full w-full flex-col p-4 md:p-5 2k:p-[1.5vw]">
        <div className="min-h-0 flex-1 md:grid md:grid-cols-8">
          <div className="md:col-span-3 flex flex-col gap-4 2k:gap-[2vh]">
            <div className="p-4 md:p-6 2k:p-[1.5vh]">
              <Clock />
            </div>
            <div className="p-4 md:p-6 2k:p-[1.5vh]">
              <Date />
            </div>
            <div className="p-4 md:p-6 2k:p-[1.5vh]">
              {mosqueMetadata && <MosqueMetadata metadata={mosqueMetadata} />}
            </div>
            <div className="hidden md:p-6 md:block 2k:p-[1.5vh]">
              <Notice />
            </div>
          </div>
          <div className="p-4 md:p-6 md:col-span-5">
            {today && tomorrow && (
              <PrayerTimes today={today} tomorrow={tomorrow} />
            )}
          </div>
        </div>
        <div className="shrink-0 p-4 md:p-6">
          <SlidingBanner slides={slides} />
        </div>
        <ServiceWorker />
      </main>
      {config.feature.announcement.enabled && <Announcement />}
      {today && <Blackout prayerTimeToday={today} />}
      <div className={"fixed bottom-1 right-1"}>
        <OfflineTag />
      </div>
    </div>
  )
}
