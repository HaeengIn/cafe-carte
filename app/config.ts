// Cloudflare R2 Bucket URL

const baseBucketUrl: string = "https://static.cafe-carte.fans";

/**
 * 반환하는 값: https://static.cafe-carte.fans/img
 * @type string
 */
export const imgBucketUrl: string = `${baseBucketUrl}/img`;

/**
 * 반환하는 값: https://static.cafe-carte.fans/favicon
 * @type string
 */
export const faviconBucketUrl: string = `${baseBucketUrl}/favicon`;

// Member List

type Member = {
  id: number;
  eng: string;
  kor: string;
};

/**
 * @type object
 */
export const memberList: Member[] = [
  {
    id: 1,
    eng: "mocoparfe",
    kor: "모코 파르페",
  },
  {
    id: 2,
    eng: "hanseorin",
    kor: "한서린",
  },
  {
    id: 3,
    eng: "dangkey",
    kor: "댕키",
  },
  {
    id: 4,
    eng: "uuhee",
    kor: "유우희",
  },
  {
    id: 5,
    eng: "aerusolstice",
    kor: "에루 솔스티스",
  },
];
