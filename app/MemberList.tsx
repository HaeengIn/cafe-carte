"use client";

import { useState } from "react";
import { imgBucketUrl, Member, memberList } from "./config";
import Image from "next/image";
import Link from "next/link";
import "./member.module.css";

export default function MemberList() {
  const [hoveredMember, setHoveredMember] = useState<Member | null>(null);

  return (
    <div className="members">
      <h1 className="fade-down">멤버 - Members</h1>
      <h3
        className={`member-name${hoveredMember ? ` ${hoveredMember.eng}` : ""}`}
      >
        {hoveredMember?.kor ?? ""}
      </h3>
      <div className="members-list">
        {memberList.map((item) => (
          <Link
            key={item.id}
            className="fade-right profile"
            href={`/members/${item.eng}`}
            onMouseEnter={() => setHoveredMember(item)}
            onMouseLeave={() => setHoveredMember(null)}
          >
            <Image
              className="profile"
              src={`${imgBucketUrl}/${item.eng}/profile.avif`}
              alt={`${item.kor} 프로필 이미지`}
              width={179}
              height={236}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
