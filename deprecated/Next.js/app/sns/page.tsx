import Image from "next/image";
import { imgBucketUrl, memberList, sns } from "../config";
import styles from "./sns.module.css";
import type { CSSProperties } from "react";

export default function Sns() {
  return (
    <div className={styles.background}>
      <div className={styles["members-banners"]}>
        {memberList.map((item) => (
          <div
            className={`${styles["member-banner"]}`}
            data-member={item.eng}
            key={item.id}
            style={
              {
                "--member-color": `var(--${item.eng})`,
              } as CSSProperties
            }
          >
            <Image
              className={`${styles.banner} fade-down`}
              src={`${imgBucketUrl}/${item.eng}/banner.avif`}
              alt={`${item.kor} 배너 이미지`}
              width={1707}
              height={282}
            />
            <div className={`${styles["member-links"]} ${item.eng}`}>
              <a
                className={`${item.eng} fade-down`}
                href={sns[item.eng as keyof typeof sns]?.youtube}
              >
                <Image
                  src={`${imgBucketUrl}/${item.eng}/youtube.png`}
                  alt={`${item.kor} 유튜브 링크`}
                  width={256}
                  height={256}
                />
                <span>YouTube</span>
              </a>
              <a
                className={`${item.eng} fade-down`}
                href={sns[item.eng as keyof typeof sns]?.x}
              >
                <Image
                  src={`${imgBucketUrl}/${item.eng}/x.png`}
                  alt={`${item.kor} X 링크`}
                  width={256}
                  height={256}
                />
                <span>X</span>
              </a>
              <a
                className={`${item.eng} fade-down`}
                href={sns[item.eng as keyof typeof sns]?.chzzk}
              >
                <Image
                  src={`${imgBucketUrl}/${item.eng}/chzzk.png`}
                  alt={`${item.kor} 치지직 링크`}
                  width={256}
                  height={256}
                />
                <span>치지직</span>
              </a>
            </div>
          </div>
        ))}
        <div
          className={`${styles["member-banner"]}`}
          data-member="twillit-studio"
          style={
            {
              "--member-color": "var(--twillit-studio)",
            } as CSSProperties
          }
        >
          <Image
            className={`${styles.banner} fade-down`}
            src={`${imgBucketUrl}/twillit-studio/banner.avif`}
            alt="트윌릿 스튜디오 배너 이미지"
            width={1707}
            height={282}
          />
          <div className={`${styles["member-links"]} twillit-studio`}>
            <a
              className={`${styles["twillit-studio"]} fade-down`}
              href={sns["twillit-studio"].youtube}
            >
              <Image
                src={`${imgBucketUrl}/twillit-studio/youtube.png`}
                alt={`트윌릿 스튜디오 유튜브 링크`}
                width={256}
                height={256}
              />
              <span>YouTube</span>
            </a>
            <a
              className={`${styles["twillit-studio"]} fade-down`}
              href={sns["twillit-studio"].x}
            >
              <Image
                src={`${imgBucketUrl}/twillit-studio/x.png`}
                alt={`트윌릿 스튜디오 X 링크`}
                width={256}
                height={256}
              />
              <span>X</span>
            </a>
            <a
              className={`${styles["twillit-studio"]} fade-down`}
              href={sns["twillit-studio"].cafe}
            >
              <Image
                src={`${imgBucketUrl}/twillit-studio/cafe.png`}
                alt={`트윌릿 스튜디오 네이버 카페 링크`}
                width={256}
                height={256}
              />
              <span>네이버 카페</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
