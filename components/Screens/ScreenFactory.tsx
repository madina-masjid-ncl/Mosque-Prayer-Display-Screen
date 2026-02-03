import { ConfigurationJson } from "@/types/ConfigurationType"
import DefaultScreen from "@/components/Screens/DefaultScreen"
import RightLayoutScreen from "@/components/Screens/RightLayoutScreen"
import MobileScreenLayout from "@/components/Screens/Mobile/MobileScreenLayout"
import ScreenProviderWrapper from "@/components/Screens/ScreenProviderWrapper"
import LeftLayoutScreen from "@/components/Screens/LeftLayoutScreen"

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

function DesktopScreenFactory({ config }: ScreenFactoryProps) {
  const selectedLayout = config.feature.screen.layout

  if (selectedLayout === "dynamic-right") {
    return (
      <ScreenProviderWrapper>
        <RightLayoutScreen config={config} />
      </ScreenProviderWrapper>
    )
  } else if (selectedLayout === "dynamic-left") {
    return (
      <ScreenProviderWrapper>
        <LeftLayoutScreen config={config} />
      </ScreenProviderWrapper>
    )
  }

  // No change to default screen as we don't want to impact older deployments
  return <DefaultScreen config={config} />
}
