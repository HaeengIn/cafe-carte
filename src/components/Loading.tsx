import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div>
      <h1 className={styles.title}>로딩 중...</h1>
      <h3 className={styles.desc}>
        데이터를 로드하고 있습니다.
        <br />
        잠시만 기다려주세요.
      </h3>
    </div>
  );
}
