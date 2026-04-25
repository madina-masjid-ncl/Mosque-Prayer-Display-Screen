import { useEffect, useState } from "react"
import { DailyPrayerTime } from "@/types/DailyPrayerTimeType"
import { getNextPrayer } from "@/services/PrayerTimeService"

export function useNextPrayerTime(today?: DailyPrayerTime, tomorrow?: DailyPrayerTime) {
  const [nextPrayerTime, setNextPrayerTime] = useState(() =>
    getNextPrayer(today, tomorrow),
  )

  useEffect(() => {
    setNextPrayerTime(getNextPrayer(today, tomorrow))

    const interval = setInterval(() => {
      setNextPrayerTime(getNextPrayer(today, tomorrow))
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [today, tomorrow])

  return nextPrayerTime
}
