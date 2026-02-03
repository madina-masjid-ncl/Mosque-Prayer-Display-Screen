import { ConfigurationJson } from "@/types/ConfigurationType"
import Clock from "@/components/Clock/Clock"
import Date from "@/components/Date/Date"
import PrayerTimes from "@/components/PrayerTimes/PrayerTimes"
import Announcement from "@/components/Announcement/Announcement"
import Blackout from "@/components/Blackout/Blackout"
import Logo from "@/components/Branding/Logo/Logo"
import ScreenSlidesFactory
  from "@/components/Screens/Slides/ScreenSlidesFactory"
import {
  ScreenMosqueDataContext,
} from "@/providers/ScreenMosqueDataProvider"
import { cn } from "@/lib/utils"
import { useContext } from "react"

export default async function LeftLayoutScreen({
  config,
  className
} : {
  config: ConfigurationJson,
  className?: string
}) {
  const { today, tomorrow } = useContext(ScreenMosqueDataContext)


  return (
    <div
      className={cn(
        "bg-mosqueBrand h-screen min-w-full relative cursor-none md:overflow-hidden",
      )}
      style={{
        ["--font-scale" as any]: String(config.accessibility.fontScale ?? 1),
      }}
    >
      <main className="h-full">
        <div className={cn("md:grid md:grid-cols-8 h-full", className)}>
          <div className="p-4 md:p-6 md:col-span-4">
            {today && tomorrow && (
              <PrayerTimes today={today} tomorrow={tomorrow} />
            )}
          </div>
          <div className="p-4 md:p-6 md:col-span-4 h-full flex flex-col items-end gap-4">
            <Clock />
            <Date className={"md:text-right"} />
            <ScreenSlidesFactory config={config} />
          </div>
        </div>
      </main>
      {config.feature.announcement.enabled && <Announcement />}
      {today && <Blackout prayerTimeToday={today} />}
      <div className={"fixed bottom-0 left-0 opacity-50"}>
        <Logo />
      </div>
    </div>
  )
}
