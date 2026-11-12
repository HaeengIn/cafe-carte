import Link from "next/link";
import Image from "next/image";
import { imgBucketUrl } from "./config";

export default function Navbar() {
  return (
    <nav>
      <Link href="/">
        <Image
          src={`${imgBucketUrl}/cafe-carte/logo.avif`}
          alt="카페 카르테 로고"
          width={238}
          height={127}
        />
      </Link>
      <Link href="/members">멤버</Link>
      <Link href="/sns">SNS</Link>
      <Link href="/about">소개</Link>
      <Link href="/status">시스템 상태</Link>
    </nav>
  );
}
