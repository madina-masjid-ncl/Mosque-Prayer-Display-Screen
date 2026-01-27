"use client"

import {
  dtHijriNowLocaleCustomFormat,
  dtNowLocaleCustomFormat,
} from "@/lib/datetimeUtils"

export default function Date() {
  const englishDate = dtNowLocaleCustomFormat("dddd D MMMM YYYY")
  const hijriDate = dtHijriNowLocaleCustomFormat("iD iMMMM iYYYY")

  return (
    <div className="text-mosqueBrand-onPrimary text-center md:text-left">
      <p className="font-bold text-xl md:text-5xl">{englishDate}</p>
      <p className="md:mt-5 text-xl md:text-4xl">{hijriDate}</p>
    </div>
  )
}
