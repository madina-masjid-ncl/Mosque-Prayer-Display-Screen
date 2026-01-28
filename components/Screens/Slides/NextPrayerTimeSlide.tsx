"use client"

import { useNextPrayerTime } from "@/hooks/useNextPrayerTime"
import { dtFormatTimeTo12hAmPm } from "@/lib/datetimeUtils"
import { cn } from "@/lib/utils"
import { useScreenMosqueData } from "@/hooks/useScreenMosqueData"
import {
  ScreenCard,
} from "@/components/Screens/Components/ScreenCard"

export default function NextPrayerTimeSlide() {
  const {today, tomorrow} = useScreenMosqueData()
  const nextPrayerTime = useNextPrayerTime(today, tomorrow)

  if (!today) {
    return null
  }


  return (
    <ScreenCard className={`w-full bg-mosqueBrand-primary text-mosqueBrand-onPrimary`}>
      <p
        className={cn(
          "text-xl md:text-5xl font-normal",
        )}
      >
        Next Salah
      </p>
      <div className={"flex flex-row gap-8 items-center py-4 font-bold"}>
        <p className={cn("text-xl md:text-7xl ")}>
          {nextPrayerTime.prayerLabel}
        </p>
        <p
          className={cn(
            "text-xl md:text-7xl uppercase underline decoration-mosqueBrand-highlight underline-offset-8",
          )}
        >
          {dtFormatTimeTo12hAmPm(nextPrayerTime.time)}
        </p>
      </div>
    </ScreenCard>
  )
}
