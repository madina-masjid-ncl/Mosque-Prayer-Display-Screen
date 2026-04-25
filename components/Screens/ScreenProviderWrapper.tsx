import type { MosqueData, MosqueMetadataType } from "@/types/MosqueDataType"
import {
  getJummahTimes, getMetaData,
  getMosqueData,
  getPrayerTimesForToday, getPrayerTimesForTomorrow,
  getPrayerTimesForUpcomingDays
} from "@/services/MosqueDataService"
import type { DailyPrayerTime, UpcomingPrayerTimes } from "@/types/DailyPrayerTimeType"
import type { JummahTimes } from "@/types/JummahTimesType"
import { ScreenMosqueDataProvider } from "@/providers/ScreenMosqueDataProvider"

async function ScreenProviderWrapper({children}: {children: React.ReactNode}) {
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
      {children}
    </ScreenMosqueDataProvider>
  )
}

export default ScreenProviderWrapper