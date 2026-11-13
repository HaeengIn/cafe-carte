import Link from "next/link";
import Image from "next/image";
import { imgBucketUrl, memberList } from "@/app/config";
import styles from "./members.module.css"

export default function Members() {
  return (
    <div className={styles.background}>
      <div className={`${styles.title} fade-down`}>
        <h1>멤버 - Members</h1>
        <h3>카페 카르테에서 만날 수 있어요!</h3>
      </div>
      <div className={styles["member-profiles"]}>
        {memberList.map((item) => (
          <div className={`${styles["member-profile"]} fade-down`} key={item.id}>
            <Link href={`/members/${item.eng}`}>
              <Image
                src={`${imgBucketUrl}/${item.eng}/profile.avif`}
                alt={`${item.kor} 프로필 이미지`}
                width={179}
                height={236}
              />
              <b>
                <span className={`${styles}.${item.eng}`}></span>
              </b>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
