import { AnnouncementData } from '@/types/AnnouncementType'

// !IMPORTANT! -
// If this changes, please ensure that /config/ConfigurationDefaults.ts is updated
// with the default values
export interface ConfigurationJson {
  announcement: AnnouncementData | undefined
  feature: {
    announcement: {
      enabled: boolean
    }
    prayer_time_tomorrow: {
      enabled: boolean
    }
    screen: {
      layout: ScreenLayoutOption
      slides: ScreenSlideType[]
    }
  }
  accessibility: {
    fontScale: number
  }
}

type ScreenLayoutOption = "default" | "dynamic-right" | "dynamic-left" | "dynamic-bottom"

type ScreenSlideType =
  | "next-salah-time"
  | "metadata"
  | "sunrise-jummah"
  | "next-salah-sunrise-jummah"
