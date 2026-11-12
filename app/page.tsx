import Image from "next/image";
import { imgBucketUrl } from "./config";

export default function Index() {
  return (
    <div>
      <Image
        src={`${imgBucketUrl}/cafe-carte/front.avif`}
        alt="카페 카르테 프론트 이미지"
        width={1280}
        height={600}
      />
    </div>
  );
}
