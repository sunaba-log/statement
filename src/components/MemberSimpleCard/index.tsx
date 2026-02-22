import React from "react";
import styles from "./styles.module.css";

export type MemberSimpleCardProps = {
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
  sns?: string;
  website?: string;
};

export default function MemberSimpleCard({
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
  sns,
  website,
}: MemberSimpleCardProps) {
  const joinYear = new Date(joinDate).getFullYear();
  const joinMonth = new Date(joinDate).getMonth() + 1;

  return (
    <div className={styles.memberSimpleCard}>
      <div className={styles.content}>
        <div className={styles.header}>
          {image && (
            <div className={styles.avatarWrapper}>
              {image ? (
                <img src={image} alt={""} className={styles.avatar} />
              ) : null}
            </div>
          )}
          <div>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.role}>{role}</p>
          </div>
        </div>

        <p className={styles.bio}>{bio}</p>

        {(github || sns || website) && (
          <div className={styles.links}>
            {github && (
              <a
                href={`https://github.com/${github}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                title="GitHub"
              >
                Github: {github}
              </a>
            )}
            {sns && (
              <a
                href={`https://sns.com/${sns}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                title="SNS"
              >
                SNS: {sns}
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
                ウェブサイト: {website.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
