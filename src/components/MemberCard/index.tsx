import React from "react";
import styles from "./styles.module.css";

export type MemberCardProps = {
  name: string;
  role: string;
  department: string;
  joinDate: string;
  bio: string;
  image?: string;
  skills: string[];
  specialty?: string[];
  hobbies?: string[];
  github?: string;
  twitter?: string;
  website?: string;
};

export default function MemberCard({
  name,
  role,
  department,
  joinDate,
  bio,
  image,
  skills,
  specialty = [],
  hobbies = [],
  github,
  twitter,
  website,
}: MemberCardProps) {
  const joinYear = new Date(joinDate).getFullYear();
  const joinMonth = new Date(joinDate).getMonth() + 1;

  return (
    <div className={styles.memberCard}>
      {image && (
        <div className={styles.imageWrapper}>
          <img src={image} alt={name} className={styles.memberImage} />
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.role}>{role}</p>
        </div>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.label}>部門</span>
            <span className={styles.value}>{department}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.label}>参加時期</span>
            <span className={styles.value}>
              {joinYear}年{joinMonth}月
            </span>
          </div>
        </div>

        <p className={styles.bio}>{bio}</p>

        {skills.length > 0 && (
          <div className={styles.skillsSection}>
            <h4 className={styles.sectionTitle}>スキル</h4>
            <div className={styles.skillsList}>
              {skills.map((skill, index) => (
                <span key={index} className={styles.skillBadge}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {specialty.length > 0 && (
          <div className={styles.specialtySection}>
            <h4 className={styles.sectionTitle}>専門領域</h4>
            <ul className={styles.specialtyList}>
              {specialty.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {hobbies.length > 0 && (
          <div className={styles.hobbiesSection}>
            <h4 className={styles.sectionTitle}>趣味・特技</h4>
            <div className={styles.hobbiesList}>
              {hobbies.map((hobby, index) => (
                <span key={index} className={styles.hobbyItem}>
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        )}

        {(github || twitter || website) && (
          <div className={styles.links}>
            {github && (
              <a
                href={`https://github.com/${github}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                title="GitHub"
              >
                GitHub
              </a>
            )}
            {twitter && (
              <a
                href={`https://twitter.com/${twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                title="Twitter"
              >
                Twitter
              </a>
            )}
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                title="Website"
              >
                ウェブサイト
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
