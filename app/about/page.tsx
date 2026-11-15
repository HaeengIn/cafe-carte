import styles from "./about.module.css";

export default function About() {
  return (
    <div className={styles.content}>
      <p className={styles.warning}>
        <span className={styles["warning-content"]}>
          본 웹 사이트는{" "}
          <a
            className={styles.link}
            href="https://samg.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            SAMG Entertainment
          </a>
          의 브랜드인 Twillit Studio의 3D 버추얼 그룹, '카페 카르테'의 비공식 팬
          웹 사이트입니다.
        </span>
        <span className={styles["warning-content"]}>
          SAMG Entertainment 또는 Twillit Studio의 허가 없이 제작된 웹
          사이트이며, 사전 공지 없이 언제든 삭제될 수 있습니다.
        </span>
      </p>
      <span className={styles["dev-info"]}>
        <b className={styles.header}>[개발자]</b>
        <a
          className={styles.link}
          href="http://haeengin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          HaeengIn
        </a>
        <b className={styles.header}>[문의 및 연락]</b>
        <a
          className={styles.link}
          href="mailto:haeengin@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          haeengin@gmail.com
        </a>
        <b className={styles.header}>[GitHub 리포지토리 URL]</b>
        <a
          className={styles.link}
          href="https://github.com/HaeengIn/cafe-carte"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/HaeengIn/cafe-carte
        </a>
      </span>
    </div>
  );
}
