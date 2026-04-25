import { DailyPrayerTime, UpcomingPrayerTimes } from "./DailyPrayerTimeType"
import { JummahTimes } from "./JummahTimesType"
import { ConfigurationJson } from '@/types/ConfigurationType'

export interface MosqueData {
  metadata: MosqueMetadataType
  jummah_times: JummahTimes
  prayer_times: DailyPrayerTime[]
  config?: ConfigurationJson
}

type KeyValueStringType = { [key: string]: string }

export type MosqueMetadataType = KeyValueStringType

export interface ScreenData {
  today: DailyPrayerTime
  tomorrow: DailyPrayerTime
  jummahTimes: JummahTimes
  mosqueMetadata: MosqueMetadataType
  upcomingPrayerDays: UpcomingPrayerTimes[]
}
