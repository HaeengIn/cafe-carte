import Link from "next/link";
import Image from "next/image";
import { imgBucketUrl } from "@/app/config"

export default function Members() {
  const memberList = {
    mocoparfe: {
      eng: "mocoparfe",
      kor: "모코 파르페",
    },
    hanseorin: {
      eng: "hanseorin",
      kor: "한서린",
    },
    dangkey: {
      eng: "dangkey",
      kor: "댕키",
    },
    uuhee: {
      eng: "uuhee",
      kor: "유우희",
    },
    aerusolstice: {
      eng: "aerusolstice",
      kor: "에루 솔스티스",
    },
  };

  return (
    <div className="background">
      <div className="title fade-down">
        <h1>멤버 - Members</h1>
        <h3>카페 카르테에서 만날 수 있어요!</h3>
      </div>
      <div className="member-profiles">
        {Object.values(memberList).map((item) => (
          <div
            className="member-profile fade-down"
            data-member={item.eng}
            key={item.eng}
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
