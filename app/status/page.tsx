import Image from "next/image";
import { imgBucketUrl, status } from "../config";
import styles from "./status.module.css";

export default function Status() {
  return (
    <div>
      <details>
        <summary className={styles["status-title"]}>
          [ Profile Image Usage Status ]
        </summary>
        <div className={styles.license}>
          {status["parents_profile_image_license"].map((item) => (
            <div
              className={`${styles["content-container"]} fade-right`}
              key={item.id}
            >
              <Image
                src={`${imgBucketUrl}/parents/${item.username}.avif`}
                alt={`${item.name} 프로필 이미지`}
                width={200}
                height={200}
              />
              <div className={styles.content}>
                <h1>{item.name}</h1>
                <a className={styles.link}
                  href={`https://x.com/${item.userHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.userHandle}
                </a>
                <span>
                  Status: {item.status === 0 && "Rejected"}
                  {item.status === 1 && "Allowed"}
                  {item.status === 2 && "Pending"}
                </span>
                <span>Detail: {item.detail}</span>
                {item.id === 7 && <span>Unable to view due to request</span>}
                {(item.id === 1 || item.id === 3) && (
                  <a className={styles.link}
                    href={item.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit official homepage
                  </a>
                )}
                {item.id !== 7 && item.id !== 1 && item.id !== 3 && (
                  <a className={styles.link}
                    href={`${imgBucketUrl}/license/${item.username}.avif`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Screenshot
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </details>
      <details>
        <summary className={styles["status-title"]}>[ System Status ]</summary>
        <div className={styles.availability}>
          {status["system"]["availability"].map((item) => (
            <div
              className={styles["availability-content"]}
              key={item.id}
            >
              <h1 className="fade-right">{item.url}</h1>
              {item.status === 0 && (
                <span className={`${styles.unavailable} fade-right`}>
                  ❎ Unavailable
                </span>
              )}
              {item.status === 1 && (
                <span className={`${styles.available} fade-right`}>
                  ✅ Available
                </span>
              )}
              {item.status === 2 && (
                <span className={`${styles.ongoing} fade-right`}>
                  🔁 Ongoing
                </span>
              )}
            </div>
          ))}
        </div>
      </details>
      <details>
        <summary className={styles["status-title"]}>
          [ Browser Compatibility Status ]
        </summary>
        <div className={styles.compatibility}>
          {status["system"]["compatibility"].map((item) => (
            <div
              className={styles["compatibility-content"]}
              key={item.id}
            >
              <h1 className="fade-right">{item.engine}</h1>
              {item.status === 0 && (
                <span className={`${styles.uncompatible} fade-right`}>
                  ❎ Uncompatible
                </span>
              )}
              {item.status === 1 && (
                <span className={`${styles.compatible} fade-right`}>
                  ✅ Compatible
                </span>
              )}
              {item.status === 2 && (
                <span className={`${styles.unknown} fade-right`}>
                  ❓ Unknown
                </span>
              )}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
