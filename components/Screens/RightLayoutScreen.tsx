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
import Clock from "@/components/Clock/Clock"
import Date from "@/components/Date/Date"
import PrayerTimes from "@/components/PrayerTimes/PrayerTimes"
import ServiceWorker from "@/components/ServiceWorker/ServiceWorker"
import Announcement from "@/components/Announcement/Announcement"
import Blackout from "@/components/Blackout/Blackout"
import Logo from "@/components/Branding/Logo/Logo"
import ScreenSlidesFactory
  from "@/components/Screens/Slides/ScreenSlidesFactory"
import { ScreenMosqueDataProvider } from "@/providers/ScreenMosqueDataProvider"

export default async function RightLayoutScreen({
  config
} : {
  config: ConfigurationJson
}) {
  const mosqueData: MosqueData = await getMosqueData()
  const today: DailyPrayerTime = await getPrayerTimesForToday()
  const tomorrow: DailyPrayerTime = await getPrayerTimesForTomorrow()
  const jummahTimes: JummahTimes = await getJummahTimes()
  const mosqueMetadata: MosqueMetadataType = await getMetaData()
  const upcomingPrayerDays: UpcomingPrayerTimes[] = await getPrayerTimesForUpcomingDays()

  return (
    <ScreenMosqueDataProvider
      mosqueData={mosqueData}
      today={today}
      tomorrow={tomorrow}
      jummahTimes={jummahTimes}
      mosqueMetadata={mosqueMetadata}
      upcomingPrayerDays={upcomingPrayerDays}
    >
      <div
        className="bg-mosqueBrand h-screen min-w-full relative cursor-none md:overflow-hidden"
        style={{
          ["--font-scale" as any]: String(config.accessibility.fontScale ?? 1),
        }}
      >
        <main className="h-full">
          <div className="md:grid md:grid-cols-8 h-full">
            <div className="p-4 md:p-6 md:col-span-4 h-full flex flex-col gap-4">
              <Clock />
              <Date />
              <ScreenSlidesFactory config={config} />
            </div>
            <div className="p-4 md:p-6 md:col-span-4">
              <PrayerTimes today={today} tomorrow={tomorrow} />
            </div>
          </div>
        </main>
        {config.feature.announcement.enabled && <Announcement />}
        <Blackout prayerTimeToday={today} />
        <div className={"fixed bottom-0 left-0 opacity-50"}>
          <Logo />
        </div>
      </div>
    </ScreenMosqueDataProvider>
  )
}
