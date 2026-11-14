"use client";

import { useState } from "react";
import { imgBucketUrl, Member, memberList } from "./config";
import Image from "next/image";
import Link from "next/link";
import styles from "./member.module.css";
import type { CSSProperties } from 'react';

export default function MemberList() {
  const [hoveredMember, setHoveredMember] = useState<Member | null>(null);

  return (
    <div className={styles.members}>
      <h1 className="fade-down">멤버 - Members</h1>
      <h3
        className={[styles["member-name"], hoveredMember?.eng ?? ""]
          .filter(Boolean)
          .join(" ")}
      >
        {hoveredMember?.kor ?? ""}
      </h3>
      <div className={styles["members-list"]}>
        {memberList.map((item) => (
          <Link
            key={item.id}
            className={`fade-right ${styles.profile}`}
            href={`/members/${item.eng}`}
            onMouseEnter={() => setHoveredMember(item)}
            onMouseLeave={() => setHoveredMember(null)}
          >
            <Image
              className={styles.profile}
              src={`${imgBucketUrl}/${item.eng}/profile.avif`}
              alt={`${item.kor} 프로필 이미지`}
              width={179}
              height={236}
              style={
                {
                  "--member-color": `var(--${item.eng})`,
                } as CSSProperties
              }
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
