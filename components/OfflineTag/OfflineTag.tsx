"use client"


import { useContext, useEffect, useState } from "react"
import { ScreenMosqueDataContext } from "@/providers/ScreenMosqueDataProvider"
import { cn } from "@/lib/utils"

function OfflineTag() {

  const { isOfflineData } = useContext(ScreenMosqueDataContext)
  const [online, setOnline] = useState(true)

  useEffect(() => {
    setOnline(navigator.onLine)

    const handleOnline = () => setOnline(true)
    const handleOffline = () => setOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const ifOffline = isOfflineData || !online || true

  return (
    <div
      id={"offline-tag"}
      className={cn(
        "rounded-lg px-4 py-2 items-center justify-between gap-2",
        ifOffline ? "flex" : "opacity-0",
      )}
    >
      <span className={"rounded-[50vw] bg-red-400 w-[1vh] h-[1vh] aspect-square"} />
      <span className={"text-xs 2x:text-lg 4k:text-xl text-mosqueBrand-onPrimary/50"}>
        Device offline
      </span>
    </div>
  )
}

export default OfflineTag;