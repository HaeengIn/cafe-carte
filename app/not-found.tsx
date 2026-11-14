"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { imgBucketUrl } from "./config";

export default function NotFound() {
  const router = useRouter();

  return (
    <div>
      <div className="title">
        <h1>페이지를 찾을 수 없음</h1>
        <h3>404 Not Found</h3>
        <button
          type="button"
          onClick={() => router.back()}
        >
          <Image
            src={`${imgBucketUrl}/global/backward-icon.avif`}
            alt="뒤로가기 아이콘"
            width={24}
            height={24}
          />
          <span>이전 페이지로 이동</span>
        </button>
      </div>
    </div>
  );
}
