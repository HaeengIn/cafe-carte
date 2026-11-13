import Image from "next/image";
import { imgBucketUrl } from "./config";
import MemberList from "./MemberList";
import Fanding from "./Fanding";
import styles from "./index.module.css";
import { Metadata } from "next";

const title: string = "홈 | 카페 카르테";
const desc: string =
  "트윌릿 스튜디오의 3D 버추얼 그룹, 카페 카르테의 비공식 팬 웹 사이트입니다.";
const url: string = "https://cafe-carte.fans";

export const metadata: Metadata = {
  title: title,
  description: desc,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: title,
    description: desc,
    siteName: "카페 카르테",
    url: url,
    images: [
      {
        url: `${imgBucketUrl}/cafe-carte/banner.jpg`,
        alt: "카페 카르테 배너 이미지",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function Index() {
  return (
    <div className={styles.home}>
      <p className="description">
        TWILLIT STUDIO의 3D VTuber 그룹, 카페 카르테의 비공식 팬 웹사이트. 모코
        파르페, 한서린, 댕키, 유우희, 에루 솔스티스를 포함한 멤버들과 카페
        카르테에 대해 알아보세요.
      </p>
      <div className={styles.front}>
        <Image
          className={`${styles["front-image"]} fade-down`}
          src={`${imgBucketUrl}/cafe-carte/front.avif`}
          alt="카페 카르테 대문"
          width={1280}
          height={600}
        />
      </div>
      <MemberList />
      <Fanding />
    </div>
  );
}
