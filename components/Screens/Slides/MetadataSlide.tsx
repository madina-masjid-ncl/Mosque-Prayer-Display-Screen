"use client"

import { useNextPrayerTime } from "@/hooks/useNextPrayerTime"
import { dtFormatTimeTo12hAmPm } from "@/lib/datetimeUtils"
import { cn } from "@/lib/utils"
import { useScreenMosqueData } from "@/hooks/useScreenMosqueData"
import MosqueMetadata from "@/components/MosqueMetadata/MosqueMetadata"
import Notice from "@/components/Notice/Notice"

export default function MetadataSlide() {
  const {mosqueMetadata} = useScreenMosqueData()

  return (
    <div
      className={
        "h-full flex flex-col gap-4 pb-[10vh]"
      }
    >
      <div className="py-4">
        {mosqueMetadata && <MosqueMetadata metadata={mosqueMetadata} />}
      </div>
      <div className="block py-4">
        <Notice />
      </div>
    </div>
  )
}
