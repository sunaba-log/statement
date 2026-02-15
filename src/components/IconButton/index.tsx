import React, { ReactNode } from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

type IconButtonProps = {
  href?: string;
  to?: string;
  icon: ReactNode;
  label: string;
  className?: string;
  target?: string;
  rel?: string;
};

export default function IconButton({
  href,
  to,
  icon,
  label,
  className,
  target,
  rel,
}: IconButtonProps) {
  const buttonContent = (
    <>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </>
  );

  if (to) {
    return (
      <Link
        className={`button button--secondary button--lg ${className || ""}`}
        to={to}
      >
        <div className={styles.content}>{buttonContent}</div>
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={`button button--secondary button--lg ${className || ""}`}
      target={target}
      rel={rel}
    >
      <div className={styles.content}>{buttonContent}</div>
    </a>
  );
}
