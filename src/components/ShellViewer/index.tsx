import React, { useMemo, useState } from "react";
import styles from "./styles.module.css";
import HumanShellSVG from "./HumanShellSVG";

type BodyPartKey =
  | "head"
  | "face"
  | "chest"
  | "hip"
  | "hand-right"
  | "hand-left"
  | "arm-right"
  | "arm-left"
  | "thigh-right"
  | "thigh-left"
  | "foot-right"
  | "foot-left";

export type BodyContentItem = {
  title: string;
  image: string;
  description: string;
  url: string;
};

export type ShellViewerProps = {
  content?: Partial<Record<BodyPartKey, BodyContentItem[]>>;
  heading?: string;
};

const PART_LABELS: Record<BodyPartKey, string> = {
  head: "頭",
  face: "顔",
  chest: "胸元",
  hip: "腰",
  "arm-left": "左腕",
  "arm-right": "右腕",
  "hand-left": "左手",
  "hand-right": "右手",
  "thigh-left": "左腿",
  "thigh-right": "右腿",
  "foot-left": "左足",
  "foot-right": "右足",
};

export type ShellRecord = Record<BodyPartKey, BodyContentItem[]>;

const DEFAULT_CONTENT: ShellRecord = {
  head: [
    {
      title: "思考の輪郭",
      image: "/img/statement/head-thoughts.jpg",
      description:
        "静かな集中を生み出すための思考フロー。日々の意思決定を透明にするための整理術。",
      url: "https://example.com/statement/head",
    },
  ],
  face: [
    {
      title: "観察のレイヤー",
      image: "/img/statement/eyes-observation.jpg",
      description:
        "視点をずらし、状況を立体的に捉えるための観察メモとチェックリスト。",
      url: "https://example.com/statement/eyes",
    },
    {
      title: "洞察のスナップショット",
      image: "/img/statement/eyes-insight.jpg",
      description: "短時間で仮説を立てるための洞察ログと、その再現方法。",
      url: "https://example.com/statement/eyes/insight",
    },
  ],
  chest: [
    {
      title: "スタンス宣言",
      image: "/img/statement/chest-stance.jpg",
      description:
        "価値判断の基準を共有するためのスタンスメモ。対話の拠り所を明文化。",
      url: "https://example.com/statement/chest",
    },
  ],
  hip: [],
  "arm-left": [
    {
      title: "実行の手順",
      image: "/img/statement/arms-process.jpg",
      description: "タスクを安全に運ぶための実行手順。段取りの見える化。",
      url: "https://example.com/statement/arms",
    },
  ],
  "arm-right": [],
  "hand-left": [
    {
      title: "共同作業の道具箱",
      image: "/img/statement/hands-toolbox.jpg",
      description: "具体的なアクションを支えるツールとテンプレート集。",
      url: "https://example.com/statement/hands",
    },
  ],
  "hand-right": [
    {
      title: "コミュニケーションのガイドライン",
      image: "/img/statement/hands-communication.jpg",
      description: "対話を円滑にするためのコミュニケーションルールとマナー。",
      url: "https://example.com/statement/hands/communication",
    },
  ],
  "thigh-left": [],
  "thigh-right": [],
  "foot-left": [],
  "foot-right": [],
};

export default function ShellViewer({ content, heading }: ShellViewerProps) {
  const [activePart, setActivePart] = useState<BodyPartKey | null>(null);
  const [hoveredPart, setHoveredPart] = useState<BodyPartKey | null>(null);

  const mergedContent = useMemo(() => {
    const merged = { ...DEFAULT_CONTENT };
    if (!content) {
      return merged;
    }
    (Object.keys(PART_LABELS) as BodyPartKey[]).forEach((key) => {
      if (content[key] !== undefined) {
        merged[key] = content[key] ?? [];
      }
    });
    return merged;
  }, [content]);

  const handleActivate = (part: BodyPartKey) => {
    if (mergedContent[part]?.length) {
      setActivePart(part);
    }
  };

  const activeItems = activePart ? mergedContent[activePart] : [];
  const enabledParts = useMemo(() => {
    const parts = new Set<BodyPartKey>();
    (Object.keys(PART_LABELS) as BodyPartKey[]).forEach((part) => {
      if (mergedContent[part]?.length) {
        parts.add(part);
      }
    });
    return parts;
  }, [mergedContent]);

  return (
    <section className={styles.viewer}>
      <div className={styles.headerArea}>
        <h2 className={styles.heading}>{heading ?? "Shell"}</h2>
        <p className={styles.subtitle}>
          体の各部位に割り当てられたボタンから、拡張パーツを確認できます。
        </p>
      </div>

      <div className={styles.svgWrapper}>
        <HumanShellSVG
          hoveredPart={hoveredPart}
          activePart={activePart}
          enabledParts={enabledParts}
          onPartClick={handleActivate}
          onPartHover={setHoveredPart}
        />

        <div className={styles.legend}>
          {(Object.keys(PART_LABELS) as BodyPartKey[]).map((part) => {
            const disabled = !mergedContent[part]?.length;
            return (
              <button
                key={part}
                type="button"
                className={
                  disabled ? styles.legendButtonDisabled : styles.legendButton
                }
                disabled={disabled}
                onClick={() => handleActivate(part)}
                onFocus={() => setHoveredPart(part)}
                onMouseEnter={() => setHoveredPart(part)}
                onMouseLeave={() => setHoveredPart(null)}
              >
                {PART_LABELS[part]}
              </button>
            );
          })}
        </div>
      </div>

      {activePart && (
        <div
          className={styles.dialogBackdrop}
          role="presentation"
          onClick={() => setActivePart(null)}
        >
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-label={`${PART_LABELS[activePart]}の詳細`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.dialogHeader}>
              <div>
                <p className={styles.dialogEyebrow}>部位</p>
                <h3 className={styles.dialogTitle}>
                  {PART_LABELS[activePart]}
                </h3>
              </div>

              <button
                className={styles.dialogCloseButton}
                onClick={() => setActivePart(null)}
                aria-label="Close"
                type="button"
              >
                ✕
              </button>
            </div>

            <div className={styles.dialogContentGrid}>
              {activeItems.map((item, index) => (
                <article key={`${activePart}-${index}`} className={styles.card}>
                  <div className={styles.cardImageWrapper}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.cardImage}
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <h4 className={styles.cardTitle}>{item.title}</h4>
                    <p className={styles.cardDescription}>{item.description}</p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.cardLink}
                    >
                      {item.url.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
