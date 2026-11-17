import Loading from "@/app/_components/Loading";
import { Suspense, type ReactNode } from "react";
import styles from "./member.module.css";
import Image from "next/image";
import { imgBucketUrl } from "@/app/config";

type LayoutProps = {
  children: ReactNode;
  member: string;
};

type Props = {
  children: ReactNode;
  params: Promise<{ member: string }>;
};

async function RenderLayout({ children, member }: LayoutProps) {
  const data = (await import(`@/public/${member}.json`)).default;

  return (
    <div>
      <div className={styles.profile}>
        <span className={`${styles.info} fade-right`}>
          <p>{data.race}</p>
          <h1 className={data.en_lowercase}>{data.ko}</h1>
          <h5 className={data.en_lowercase}>{data.en_uppercase}</h5>
          <p>{data.story}</p>
          <span className={styles.position}>
            <b className={data.en_lowercase}>
              「{data.position}」 of Cafe Carte
            </b>
          </span>
        </span>
        <div className={styles["image-wrapper"]}>
          <span className={`${styles["debut-date"]} fade-left`}>
            <span>[ 데뷔일 ]</span>
            <span>
              {data.debut_date} on{" "}
              <a
                className={styles.chzzk}
                href={data.chzzk}
                target="_blank"
                rel="noopener noreferrer"
              >
                CHZZK
              </a>
            </span>
          </span>
          <Image
            className="fade-left"
            src={`${imgBucketUrl}/${data.en_lowercase}/portrait.avif`}
            alt={`${data.ko} 프로필 이미지`}
            width={450}
            height={450}
          />
        </div>
      </div>
      {/* div.detail */}
      {children}
    </div>
  );
}

export default async function ({ children, params }: Props) {
  const { member } = await params;

  return (
    <Suspense fallback={<Loading />}>
      <RenderLayout member={member}>{children}</RenderLayout>
    </Suspense>
  );
}
