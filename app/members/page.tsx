import Link from "next/link";
import Image from "next/image";
import { imgBucketUrl, memberList } from "@/app/config";
import styles from "./members.module.css";
import { Metadata } from "next";

const title: string = "멤버 | 카페 카르테";
const desc: string = "카페 카르테를 이끌어가는 5명의 멤버들을 만나보세요.";
const url: string = "https://cafe-carte.fans/members";

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

export default function Members() {
  return (
    <div className={styles.background}>
      <div className={`${styles.title} fade-down`}>
        <h1>멤버 - Members</h1>
        <h3>카페 카르테에서 만날 수 있어요!</h3>
      </div>
      <div className={styles["member-profiles"]}>
        {memberList.map((item) => (
          <div
            className={`${styles["member-profile"]} ${item.eng} fade-down`}
            key={item.id}
            data-member={item.eng}
          >
            <Link href={`/members/${item.eng}`}>
              <Image
                src={`${imgBucketUrl}/${item.eng}/profile.avif`}
                alt={`${item.kor} 프로필 이미지`}
                width={179}
                height={236}
              />
              <b>
                <span className={item.eng}>{item.kor}</span>
              </b>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
