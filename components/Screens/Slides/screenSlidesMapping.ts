import type { ScreenSlideType } from "@/types/ConfigurationType"
import NextPrayerTimeSlide from "@/components/Screens/Slides/NextPrayerTimeSlide"
import MetadataSlide from "@/components/Screens/Slides/MetadataSlide"
import SunriseAndJummahSlide
  from "@/components/Screens/Slides/SunriseAndJummahSlide"
import NextPrayerTimeSunriseJummahSlide
  from "@/components/Screens/Slides/NextPrayerTimeSunriseJummahSlide"

export const SCREEN_SLIDES_MAPPING: Record<ScreenSlideType, React.ComponentType> = {
  // "next-salah-countdown": NextSalahCountdownSlide,
  "sunrise-jummah": SunriseAndJummahSlide,
  "next-salah-time": NextPrayerTimeSlide,
  "next-salah-sunrise-jummah": NextPrayerTimeSunriseJummahSlide,
  "metadata": MetadataSlide,
}
