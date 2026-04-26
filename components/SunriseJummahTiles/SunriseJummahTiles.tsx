import { JummahTimes } from "@/types/JummahTimesType"
import { dtFormatTimeTo12h } from "@/lib/datetimeUtils"
import { InfoTile } from "@/components/ui/mosque-screen/InfoTile"

export default function SunriseJummahTiles({
  sunrise,
  jummahTimes = [],
}: {
  sunrise: string
  jummahTimes: JummahTimes
}) {
  const sunriseJummahValue = "text-2xl md:text-5xl 2k:text-7xl 4k:text-13xl leading-tight"
  const sunriseJummahLabel = "text-lg md:text-3xl 2k:text-5xl 4k:text-9xl"

  return (
    <dl
      className={`grid justify-items-stretch lg:grid-cols-${
        jummahTimes.length + 1
      } text-center gap-0 md:gap-3`}
    >
      <InfoTile label="Sunrise" labelClassName={sunriseJummahLabel} valueClassName={sunriseJummahValue}>{dtFormatTimeTo12h(sunrise)}</InfoTile>

      {jummahTimes.map((jummahTime, index) => (
        <InfoTile
          label={jummahTime.label}
          labelClassName={sunriseJummahLabel}
          valueClassName={sunriseJummahValue}
          key={index}
        >
          {dtFormatTimeTo12h(jummahTime.time)}
        </InfoTile>
      ))}
    </dl>
  )
}
