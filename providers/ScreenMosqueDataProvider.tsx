"use client"

import React, { createContext, useEffect, useMemo, useState } from "react"
import type {
  DailyPrayerTime,
  UpcomingPrayerTimes,
} from "@/types/DailyPrayerTimeType"
import type { JummahTimes } from "@/types/JummahTimesType"
import type { MosqueData, MosqueMetadataType } from "@/types/MosqueDataType"
import { dtNowLocale } from "@/lib/datetimeUtils"
import { find } from "lodash"

type ScreenMosqueDataProviderValue = {
  mosqueData?: MosqueData
  today?: DailyPrayerTime
  tomorrow?: DailyPrayerTime
  jummahTimes?: JummahTimes
  mosqueMetadata?: MosqueMetadataType
  upcomingPrayerDays: UpcomingPrayerTimes[]
  isOfflineData?: boolean
  lastUpdatedAt?: string
}

export const ScreenMosqueDataContext =
  createContext<ScreenMosqueDataProviderValue>({
    upcomingPrayerDays: [],
  })

type ProviderProps = React.PropsWithChildren<ScreenMosqueDataProviderValue>

function deriveFromMosqueData(mosqueData: MosqueData, upcomingDays = 3) {
  const now = dtNowLocale()

  const getPrayerTimeForDayMonth = (
    day_of_month: string,
    month: string,
  ): DailyPrayerTime => {
    const prayer_times = mosqueData.prayer_times ?? []
    return find(prayer_times, { day_of_month, month }) ?? prayer_times[0]
  }

  const today = getPrayerTimeForDayMonth(now.format("D"), now.format("M"))
  const tomorrowDate = now.add(1, "day")
  const tomorrow = getPrayerTimeForDayMonth(
    tomorrowDate.format("D"),
    tomorrowDate.format("M"),
  )

  const upcomingPrayerDays: UpcomingPrayerTimes[] = []
  for (let i = 1; i <= upcomingDays; i++) {
    const d = dtNowLocale().add(i, "day")
    const base = getPrayerTimeForDayMonth(d.format("D"), d.format("M"))
    upcomingPrayerDays.push({
      ...base,
      display_date: d.format("ddd D MMM"),
      display_day_label: d.format("ddd"),
    })
  }

  return {
    today,
    tomorrow,
    jummahTimes: mosqueData.jummah_times,
    mosqueMetadata: mosqueData.metadata,
    upcomingPrayerDays,
  }
}

export function ScreenMosqueDataProvider({
  children,
  ...initial
}: ProviderProps) {
  const [state, setState] = useState<ScreenMosqueDataProviderValue>(initial)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        // IMPORTANT: this must be a browser GET endpoint so the SW can cache it.
        const res = await fetch("/api/data", { cache: "no-store" })
        if (!res.ok) throw new Error(`Failed /api/data: ${res.status}`)
        const mosqueData: MosqueData = await res.json()
        console.log("loaded mosque data from /api/data", mosqueData)

        const derived = deriveFromMosqueData(mosqueData, 3)

        if (cancelled) return
        setState({
          ...state,
          mosqueData,
          ...derived,
          isOfflineData: !navigator.onLine,
          lastUpdatedAt: new Date().toISOString(),
        })
      } catch (e) {
        // If offline, this fetch should still succeed if SW has it cached.
        // If it fails, we use server values
        if (cancelled) return
        setState((prev) => ({
          ...prev,
          isOfflineData: !navigator.onLine,
        }))
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!state.mosqueData) return

    const recompute = () => {
      const derived = deriveFromMosqueData(state.mosqueData!, 3)
      setState((prev) => ({
        ...prev,
        ...derived,
      }))
    }

    recompute()
    const id = setInterval(recompute, 60_000) // every minute
    return () => clearInterval(id)
  }, [state.mosqueData])

  const value = useMemo(() => state, [state])

  return (
    <ScreenMosqueDataContext.Provider value={value}>
      {children}
    </ScreenMosqueDataContext.Provider>
  )
}
