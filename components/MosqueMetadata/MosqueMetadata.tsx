import { MosqueMetadataType } from "@/types/MosqueDataType"
import MosqueLogo from "@/components/MosqueMetadata/MosqueLogo"

export default function MosqueMetadata({
  metadata,
}: {
  metadata: MosqueMetadataType
}) {
  return (
    <div className="md:flex text-mosqueBrand-onPrimary text-center md:text-left">
      <div className="mr-4 flex-shrink-0 self-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <MosqueLogo metadata={metadata} />
      </div>
      <div>
        <h2 className="mt-3 md:mt-5 font-bold text-2xl md:text-3xl">
          {metadata.name}
        </h2>
        <p className="mt-3 text-xl mx-5 md:mx-0">{metadata.address}</p>
        <p className="text-xl">{metadata.website}</p>
      </div>
    </div>
  )
}
