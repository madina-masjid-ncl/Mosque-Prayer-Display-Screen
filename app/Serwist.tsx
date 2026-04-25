"use client"
import { SerwistProvider } from "@serwist/turbopack/react"

export default function Serwist({children}: {children?: any}) {

  return <SerwistProvider swUrl="/serwist/sw.js">{children}</SerwistProvider>
}