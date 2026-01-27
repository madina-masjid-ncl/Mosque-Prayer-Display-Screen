"use client"

import { useNextPrayerTime } from "@/hooks/useNextPrayerTime"
import { dtFormatTimeTo12hAmPm } from "@/lib/datetimeUtils"
import { cn } from "@/lib/utils"
import { useScreenMosqueData } from "@/hooks/useScreenMosqueData"
import {
  ScreenCard,
} from "@/components/Screens/Components/ScreenCard"

export default function NextPrayerTimeSlide({className} : {className?: string}) {
  const {today, tomorrow} = useScreenMosqueData()
  const nextPrayerTime = useNextPrayerTime(today, tomorrow)

  if (!today) {
    return null
  }


  return (
    <ScreenCard
      className={cn(
        `w-full bg-mosqueBrand-primary text-mosqueBrand-onPrimary `,
        className,
      )}
    >
      <p className={cn("text-xl md:text-5xl font-normal")}>Next Salah</p>
      <div
        className={
          "flex flex-row gap-2 md:gap-8 items-center md:py-4 font-bold"
        }
      >
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
