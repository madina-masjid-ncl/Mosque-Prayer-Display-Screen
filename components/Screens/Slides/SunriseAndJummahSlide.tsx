"use client"

import { useScreenMosqueData } from "@/hooks/useScreenMosqueData"
import { ScreenTitleCard } from "@/components/Screens/Components/ScreenCard"
import { dtFormatTimeTo12h } from "@/lib/datetimeUtils"

export default function SunriseAndJummahSlide() {
  const { today, jummahTimes } = useScreenMosqueData()
  const totalItems = 1 + (jummahTimes?.length ?? 0)
  const isOdd = totalItems % 2 === 1

  return (
    <div className={"w-full flex flex-col items-center justify-center"}>
      <dl
        className={[
          "grid text-center w-full grid-cols-2 grid-flow-row gap-0 md:gap-3",
        ].join(" ")}
      >
        <ScreenTitleCard
          title={"Sunrise"}
          value={dtFormatTimeTo12h(today?.sunrise_start)}
        />

        {jummahTimes &&
          jummahTimes.map((jummahTime, index) => {
            const isLast = index === jummahTimes.length - 1
            const shouldCenter = isOdd && isLast

            return (
              <ScreenTitleCard
                key={index}
                title={jummahTime.label}
                value={dtFormatTimeTo12h(jummahTime.time)}
                className={
                  shouldCenter ? "col-span-1 flex justify-center w-full" : ""
                }
                innerClassName={shouldCenter ? "max-w-md w-full" : ""}
              />
            )
          })}
      </dl>
    </div>
  )
}
