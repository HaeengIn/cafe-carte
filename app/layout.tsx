import Navbar from "./Navbar";
import ScrollAnimation from "./ScrollAnimation";
import type { ReactNode } from "react";
import "./reset.css";
import "./global.css";
import "./scroll-animation.css";
import { Metadata } from "next";
import { faviconBucketUrl, imgBucketUrl } from "./config";

export const metadata: Metadata = {
  keywords: [
    "카페 카르테",
    "카페카르테",
    "트윌릿 스튜디오",
    "트윌릿스튜디오",
    "모코 파르페",
    "모코파르페",
    "한서린",
    "댕키",
    "유우희",
    "우희",
    "에루 솔스티스",
    "에루솔스티스",
    "Cafe Carte",
    "CafeCarte",
    "Twillit Studio",
    "TwillitStudio",
    "Moco Parfe",
    "MocoParfe",
    "Han Seo Rin",
    "Han SeoRin",
    "HanSeo Rin",
    "HanSeoRin",
    "Dang Key",
    "DangKey",
    "Uu Hee",
    "UuHee",
    "Aeru Solstice",
    "AeruSolstice",
  ],
  generator: "Next.js",
  applicationName: "카페 카르테",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  twitter: {
    card: "summary_large_image",
    creator: "@as_P_ra",
    images: `${imgBucketUrl}/cafe-carte.banner.jpg`,
  },
  icons: {
    icon: `${faviconBucketUrl}/favicon-96x96.png`,
    shortcut: `${faviconBucketUrl}/favicon.ico`,
    apple: `${faviconBucketUrl}/apple-touch-icon.png`,
  },
  appleWebApp: {
    capable: true,
    title: "카페 카르테",
    statusBarStyle: "default",
  },
  manifest: `${faviconBucketUrl}/site.webmanifest`,
};

export default function App({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </head>
      <body>
        <Navbar />
        <ScrollAnimation />
        <main>{children}</main>
      </body>
    </html>
  );
}
