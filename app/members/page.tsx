import Link from "next/link";
import Image from "next/image";
import { imgBucketUrl, memberList } from "@/app/config";

export default function Members() {
  return (
    <div className="background">
      <div className="title fade-down">
        <h1>멤버 - Members</h1>
        <h3>카페 카르테에서 만날 수 있어요!</h3>
      </div>
      <div className="member-profiles">
        {memberList.map((item) => (
          <div className="member-profile fade-down" key={item.id}>
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
