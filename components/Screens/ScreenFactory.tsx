import { ConfigurationJson } from "@/types/ConfigurationType"
import DefaultScreen from "@/components/Screens/DefaultScreen"
import RightLayoutScreen from "@/components/Screens/RightLayoutScreen"
import MobileScreenLayout from "@/components/Screens/Mobile/MobileScreenLayout"

interface ScreenFactoryProps {
  config: ConfigurationJson
}

export default async function ScreenFactory({ config }: ScreenFactoryProps) {
  return (
    <>
      <div className={"md:hidden"}>
        <MobileScreenLayout config={config} />
      </div>
      <div className={"hidden lg:block"}>
        <DesktopScreenFactory config={config} />
      </div>
    </>
  )
}

function DesktopScreenFactory({
  config,
}: ScreenFactoryProps) {
  const selectedLayout = config.feature.screen.layout

  if (selectedLayout === "dynamic-right") {
    return <RightLayoutScreen config={config} />
  }
  return <DefaultScreen config={config} />
}
