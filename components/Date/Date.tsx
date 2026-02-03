"use client"

import {
  dtHijriNowLocaleCustomFormat,
  dtNowLocaleCustomFormat,
} from "@/lib/datetimeUtils"
import { cn } from "@/lib/utils"

export default function Date({
  className = "",
}) {
  const englishDate = dtNowLocaleCustomFormat("dddd D MMMM YYYY")
  const hijriDate = dtHijriNowLocaleCustomFormat("iD iMMMM iYYYY")

  return (
    <div
      className={cn(
        "text-mosqueBrand-onPrimary text-center md:text-left",
        className,
      )}
    >
      <p className="font-bold text-xl md:text-5xl">{englishDate}</p>
      <p className="md:mt-5 text-xl md:text-4xl">{hijriDate}</p>
    </div>
  )
}
