import Image from "next/image";
import { imgBucketUrl, memberList, sns } from "../config";
import styles from "./sns.module.css";

export default function Sns() {
  return (
    <div className="background">
      <div className="members-banners">
        {/* {% for item in items %}
            <div className="member-banner" data-member="{{ item.eng_name }}">
                <Image className="banner fade-down" src="{{ image_base_url }}/{{ item.eng_name }}/banner.avif" alt="Member Banner Image" />
                <div className="member-links {{ item.eng_name }}">
                    <a className="{{ item.eng_name }} fade-down" href="{{ links[item.eng_name].youtube }}" target="_blank" rel="noopener noreferrer">
                        <Image src="{{ image_base_url }}/{{ item.eng_name }}/youtube.png" alt="YouTube Link" />
                        YouTube
                    </a>
                    <a className="{{ item.eng_name }} fade-down" href="{{ links[item.eng_name].x }}" target="_blank" rel="noopener noreferrer">
                        <Image src="{{ image_base_url }}/{{ item.eng_name }}/x.png" alt="X Link" />
                        X
                    </a>
                    {% if item.eng_name != "twillit-studio" %}
                        <a className="{{ item.eng_name }} fade-down" href="{{ links[item.eng_name].chzzk }}" target="_blank" rel="noopener noreferrer">
                            <Image src="{{ image_base_url }}/{{ item.eng_name }}/chzzk.png" alt="Chzzk Link" />
                            치지직
                        </a>
                    {% endif %}
                    {% if item.eng_name == "twillit-studio" %}
                        <a className="{{ item.eng_name }} fade-down" href="{{ links[item.eng_name].cafe }}" target="_blank" rel="noopener noreferrer">
                            <Image src="{{ image_base_url }}/{{ item.eng_name }}/cafe.png" alt="Naver Cafe Link" />
                            네이버 카페
                        </a>
                    {% endif %}
                </div>
            </div>
            {% endfor %} */}
        {memberList.map((item) => (
          <div
            className={`${styles["member-banner"]} ${item.eng}`}
            data-member={item.eng}
            key={item.id}
          >
            <Image
              className={`${styles.banner} fade-down`}
              src={`${imgBucketUrl}/${item.eng}/banner.avif`}
              alt={`${item.kor} 배너 이미지`}
              width={179}
              height={236}
            />
            <div className={`${styles["member-links"]} ${item.eng}`}>
              <a
                className={`${item.eng} fade-down`}
                href={sns[item.eng as keyof typeof sns]?.youtube}
              ></a>
              {/* 계속해서 포팅하기 */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
