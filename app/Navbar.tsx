import Link from "next/link";
import Image from "next/image";
import { imgBucketUrl } from "./config";
import "./nav-bar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="logo">
        <Image
          width={93}
          height={50}
          className="nav-logo"
          src={`${imgBucketUrl}/cafe-carte/logo.avif`}
          alt="카페 카르테 로고"
          unoptimized
        />
      </Link>
      <div className="nav-menu">
        <a href="/members">MEMBERS</a>
        <a href="/sns">SNS</a>
        <a href="/about">ABOUT</a>
        <a href="/status">STATUS</a>
      </div>
    </nav>
  );
}
