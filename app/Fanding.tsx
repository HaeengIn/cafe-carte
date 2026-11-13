"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { imgBucketUrl } from "./config";
import "./fanding.module.css"

const FANDING_IMAGES = Array.from(
  { length: 7 },
  (_, i) => `${imgBucketUrl}/cafe-carte/fanding/${i + 1}.jpg`,
);

export default function Fanding() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const length = FANDING_IMAGES.length;
  const half = Math.floor(length / 2);

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevIndexRef = useRef(0);

  function nextSlide() {
    setCurrentIndex((prev) => (prev + 1) % length);
  }

  function prevSlide() {
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  }

  useLayoutEffect(() => {
    const prevIndex = prevIndexRef.current;
    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      const prevOffset = ((index - prevIndex + length + half) % length) - half;
      const newOffset =
        ((index - currentIndex + length + half) % length) - half;
      if (Math.abs(newOffset - prevOffset) > 1) {
        slide.classList.add("no-transition");
        void slide.offsetWidth;
        requestAnimationFrame(() => slide.classList.remove("no-transition"));
      }
    });
    prevIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fanding">
      <span className="fanding-title fade-down">
        <Image
          src={`${imgBucketUrl}/cafe-carte/fanding.avif`}
          alt="팬딩 로고"
          className="fanding-logo"
          width={0}
          height={0}
        />
        <h1>팬딩 - Fanding</h1>
      </span>
      <h3 className="fade-down">카페 카르테의 굿즈를 만나는 유일한 방법</h3>
      <div className="fanding-carousel fade-down">
        <div className="fanding-carousel-viewport">
          {FANDING_IMAGES.map((src, index) => {
            const offset =
              ((index - currentIndex + length + half) % length) - half;
            const distance = Math.abs(offset);
            const scale = distance === 0 ? 1.5 : distance === 1 ? 0.9 : 0.75;
            const shade = distance === 0 ? 0 : distance === 1 ? 0.45 : 0.75;
            const zIndex = length - distance;

            return (
              <div
                key={src}
                ref={(el) => {
                  slideRefs.current[index] = el;
                }}
                className="fanding-carousel-slide"
                style={
                  {
                    "--offset": offset,
                    "--scale": scale,
                    "--shade": shade,
                    "--z-index": zIndex,
                    opacity: distance <= 2 ? 1 : 0,
                  } as React.CSSProperties
                }
              >
                <Image
                  src={src}
                  alt={`팬딩 이미지 ${index + 1}`}
                  width={1790}
                  height={1000}
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={prevSlide}
          className="carousel-arrow carousel-prev"
          aria-label="이전 이미지"
        >
          &#10094;
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="carousel-arrow carousel-next"
          aria-label="다음 이미지"
        >
          &#10095;
        </button>
      </div>
      <a
        className="fade-down"
        href="https://fanding.kr/@TWILLITSTUDIO_"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="link">팬딩 바로가기</button>
      </a>
    </div>
  );
}
