import Image from "next/image";
import logo from '@/branding/logo-white.png'
import { cn } from "@/lib/utils"

export default function Logo({className}: {className?: string}) {

  return (
    <Image
      src={logo}
      alt={"mosque-screen-logo"}
      height={100}
      width={150}
      className={cn(className)}
    />
  )
}