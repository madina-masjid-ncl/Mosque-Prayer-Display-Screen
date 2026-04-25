"use client"

import React, { useEffect, useMemo, useState } from "react"
import type { ConfigurationJson } from "@/types/ConfigurationType"
import { SCREEN_SLIDES_MAPPING } from "@/components/Screens/Slides/screenSlidesMapping"

interface ScreenSlidesFactoryProps {
  config: ConfigurationJson
}

export default function ScreenSlidesFactory({
  config,
}: ScreenSlidesFactoryProps) {
  const screenSlides = useMemo(
    () => config.feature.screen.slides ?? [],
    [config.feature.screen.slides],
  )

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (screenSlides.length <= 1) return

    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % screenSlides.length)
    }, 15_000)

    return () => clearInterval(interval)
  }, [screenSlides.length])

  if (screenSlides.length === 0) return null

  const activeSlide = screenSlides[activeIndex]
  const ActiveComponent = SCREEN_SLIDES_MAPPING[activeSlide]

  if (!ActiveComponent) return null

  return (
    <div className={"py-6 mb-4 w-full h-full"}>
      <ActiveComponent />
      {/*<NextPrayerTimeSlide />*/}
    </div>
  )
}
