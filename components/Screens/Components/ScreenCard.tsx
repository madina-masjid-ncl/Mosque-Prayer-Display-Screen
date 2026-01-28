import { cn } from "@/lib/utils"

interface ScreenCardProps {
  title: string
  value: string
  className?: string
  innerClassName?: string
}

export function ScreenTitleCard({ title, value, className = "" }: ScreenCardProps) {
  return (
    <ScreenCard className={className}>
      <dt className="text-sm lg:text-2xl font-medium">{title}</dt>
      <dd className="mt-2 text-xl lg:text-5xl font-bold tracking-tight">
        {value}
      </dd>
    </ScreenCard>
  )
}


export function ScreenCard({ className, children } : {className?: string, children: React.ReactNode}) {
  return (
    <div
      className={cn(`flex flex-col  justify-center bg-mosqueBrand-primaryAlt text-mosqueBrand-onPrimaryAlt p-4 lg:p-6 w-full rounded-lg`, className)}
    >
      {children}
    </div>
  )
}

