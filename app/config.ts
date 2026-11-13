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

export type Member = {
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

// SNS

const youtube: string = "https://youtube.com";
const chzzk: string = "https://chzzk.naver.com";
const x: string = "https://x.com";

export type Sns = {
  youtube?: string;
  chzzk?: string;
  x?: string;
  cafe?: string;
  homepage?: string;
};

/**
 * @type object
 */
export const sns: Record<string, Sns> = {
  mocoparfe: {
    youtube: `${youtube}/@mocoparfe`,
    chzzk: `${chzzk}/d20f164fe5946abe0bce2e5a43052923`,
    x: `${x}/Mocoparfe`,
  },
  hanseorin: {
    youtube: `${youtube}/@hanseorin_rin`,
    chzzk: `${chzzk}/d83adb241f93618891f71e852bf9c541`,
    x: `${x}/sseorin_0715`,
  },
  dangkey: {
    youtube: `${youtube}/@dangkey_key`,
    chzzk: `${chzzk}/aa37bbdad4f5f9097bbee2faa3e511f7`,
    x: `${x}/DangKey0_0`,
  },
  uuhee: {
    youtube: `${youtube}/@Uuhee`,
    chzzk: `${chzzk}/f794bcbf2cbab8f252b8e47d3c6e7fdf`,
    x: `${x}/uheeeyo`,
  },
  aerusolstice: {
    youtube: `${youtube}/@aerusolstice`,
    chzzk: `${chzzk}/1bacd9d540012f7cf0c77fa968b47394`,
    x: `${x}/aerusolstice`,
  },
  "twillit-studio": {
    youtube: `${youtube}/@TWILLITSTUDIOofficial`,
    cafe: "https://cafe.naver.com/twillitstudio",
    x: `${x}/TWILLIT_studio_`,
  },
  "samg-entertainment": {
    homepage: "https://samg.net",
  },
};

// System Status

const lit: string = "https://lit.link/ko";

export interface LicenseInfo {
  id: number;
  name: string;
  username: string;
  userHandle: string;
  status: number;
  detail: string;
  homepage?: string;
}

export interface AvailabilityInfo {
  id: number;
  url: string;
  status: number;
}

export interface CompatibilityInfo {
  id: number;
  platform: string;
  status: number;
}

export interface StatusConfig {
  parents_profile_image_license: LicenseInfo[];
  system: {
    availability: AvailabilityInfo[];
    compatibility: CompatibilityInfo[];
  };
}

export const status: StatusConfig = {
  parents_profile_image_license: [
    {
      id: 1,
      name: "あつまる",
      username: "atwomaru",
      userHandle: "@atwomaru",
      status: 1,
      detail: "Allowed",
      homepage: `${lit}/ko/atwomaru`,
    },
    {
      id: 2,
      name: "DOHA",
      username: "dohaonya",
      userHandle: "@dohaonya",
      status: 1,
      detail: "Allowed",
    },
    {
      id: 3,
      name: "HAZE",
      username: "HAZE",
      userHandle: "@7h4ze",
      status: 1,
      detail:
        "Allowed. Based on guidelines of homepage. May be deleted if owner wanted.",
      homepage: `${lit}/ko/7h4ze`,
    },
    {
      id: 4,
      name: "Grempa_Live2D",
      username: "Grempa_Live2D",
      userHandle: "@grempa_rigging",
      status: 1,
      detail: "Allowed",
    },
    {
      id: 5,
      name: "Boni",
      username: "boni_53__",
      userHandle: "@AMUGE_5353",
      status: 1,
      detail: "Allowed",
    },
    {
      id: 6,
      name: "Machi",
      username: "Machi_0330",
      userHandle: "@Machi_0330",
      status: 1,
      detail: "Allowed",
    },
    {
      id: 7,
      name: "ソンシル Sonsiru",
      username: "sake_dong",
      userHandle: "@sake_dong",
      status: 1,
      detail: "Allowed",
    },
    {
      id: 8,
      name: "Spe",
      username: "spe",
      userHandle: "@Spe_531",
      status: 1,
      detail:
        "Allowed. Reposting links/images of Aeru Solstice's fanart is also allowed.",
    },
  ],
  system: {
    availability: [
      {
        id: 1,
        url: "/",
        status: 1,
      },
      {
        id: 2,
        url: "/members",
        status: 1,
      },
      {
        id: 3,
        url: "/members/mocoparfe",
        status: 1,
      },
      {
        id: 4,
        url: "/members/hanseorin",
        status: 1,
      },
      {
        id: 5,
        url: "/members/dangkey",
        status: 1,
      },
      {
        id: 6,
        url: "/members/uuhee",
        status: 1,
      },
      {
        id: 7,
        url: "/members/aerusolstice",
        status: 1,
      },
      {
        id: 8,
        url: "/meet-us",
        status: 1,
      },
      {
        id: 9,
        url: "/about",
        status: 1,
      },
      {
        id: 10,
        url: "/status",
        status: 1,
      },
      {
        id: 11,
        url: "/robots.txt",
        status: 1,
      },
      {
        id: 12,
        url: "/sitemap.xml",
        status: 1,
      },
    ],
    compatibility: [
      {
        id: 1,
        platform: "Blink",
        status: 1,
      },
      {
        id: 2,
        platform: "Webkit",
        status: 1,
      },
      {
        id: 3,
        platform: "Gecko",
        status: 2,
      },
    ],
  },
};
