import React, { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";
import { renderMermaid, THEMES } from "beautiful-mermaid";
import { useColorMode } from "@docusaurus/theme-common";
import RenderMermaid, { MermaidConfig } from "react-x-mermaid";
export type GhostViewerProps = {
  heading?: string;
  mindset: string;
  mindmap: string;
};

const DEFAULT_GHOST = {
  mindset:
    "このマインドセットは、私たちが日々の活動や意思決定において大切にしている価値観や考え方を表しています。これを共有することで、私たちの行動や選択がどのような原則に基づいているかを理解し、共通の方向性を持って進むことができます。",
  mindmap: `
mindmap
  root((心の原動力))
    突き動かされるもの
      心を動かす瞬間
        多くの人への波及
        感動の創出
      知的好奇心
        技術への忌憚ない批評
        流行り廃りを楽しむ
      未知の課題解決
        ITを手段とした貢献
    拒絶するもの
      不透明な目的
        ビジョンの欠如
      責任の不在
        盲目的な会議
      停滞と退屈
        新しいものが生まれない状況
    理想とする姿
      世の中を面白くする先導者
      適材適所の仕組み
        人の可能性を最大化する環境
      枯れない好奇心
        10年後もあーだこーだ言える関係
`,
};

export default function GhostViewer({
  heading,
  mindset = DEFAULT_GHOST.mindset,
  mindmap = DEFAULT_GHOST.mindmap,
}: GhostViewerProps) {
  const [isExpandedModalOpen, setIsExpandedModalOpen] = useState(false);
  // const { colorMode } = useColorMode();
  const isDarkMode = "dark";

  return (
    <>
      <section className={styles.viewer}>
        <div className={styles.headerArea}>
          <h2 className={styles.heading}>{heading ?? "Ghost"}</h2>
        </div>

        <div className={styles.section}>
          {/* <h3 className={styles.sectionTitle}>マインドセット</h3> */}
          <p className={styles.mindsetText}>{mindset}</p>
        </div>

        <div className={styles.section}>
          {/* <h3 className={styles.sectionTitle}>マインドマップ</h3> */}
          <div
            className={styles.mindmapContainer}
            onClick={() => setIsExpandedModalOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsExpandedModalOpen(true);
              }
            }}
          >
            <RenderMermaid
              mermaidCode={mindmap}
              mermaidConfig={{
                theme: "base",
              }}
            />
          </div>
        </div>
      </section>

      {isExpandedModalOpen && (
        <div className={styles.expandedModalBackdrop}>
          <div className={styles.expandedModal}>
            <div className={styles.expandedModalHeader}>
              <button
                className={styles.expandedModalCloseButton}
                onClick={() => setIsExpandedModalOpen(false)}
                aria-label="Close"
                type="button"
              >
                ✕
              </button>
            </div>
            <div className={styles.expandedModalContent}>
              <RenderMermaid
                mermaidCode={mindmap}
                mermaidConfig={{
                  theme: "base",
                }}
                disableCopy={true}
                disableDownload={true}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
