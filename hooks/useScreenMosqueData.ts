import { useContext } from 'react'
import { ScreenMosqueDataContext } from "@/providers/ScreenMosqueDataProvider"

export function useScreenMosqueData() {
  return useContext(ScreenMosqueDataContext)
}
