"use client"

import SunriseAndJummahSlide
  from "@/components/Screens/Slides/SunriseAndJummahSlide"
import NextPrayerTimeSlide
  from "@/components/Screens/Slides/NextPrayerTimeSlide"

export default function NextPrayerTimeSunriseJummahSlide() {

  return (
    <div className={"h-full flex flex-col gap-3 justify-end "}>
      <NextPrayerTimeSlide />
      <SunriseAndJummahSlide />
    </div>
  )
}
