import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";

import styles from "./styles.module.css";

type PodcastItem = {
  title: string;
  audioUrl?: string;
  pageUrl?: string;
  pubDate?: string;
  description?: string;
  imageUrl?: string;
};

type PodcastLatestWidgetProps = {
  feedUrl?: string;
  className?: string;
};

type WidgetState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "loaded"; item: PodcastItem }
  | { status: "error"; message: string };

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

function getTextContent(
  element: Element | null | undefined,
): string | undefined {
  if (!element) {
    return undefined;
  }
  const text = element.textContent?.trim();
  return text && text.length > 0 ? text : undefined;
}

function getImageUrlFromElement(
  element: Element | null | undefined,
): string | undefined {
  if (!element) {
    return undefined;
  }

  const itunesImage = element.querySelector("itunes\\:image");
  const itunesHref = itunesImage?.getAttribute("href")?.trim();
  if (itunesHref) {
    return itunesHref;
  }

  const mediaThumbnail = element.querySelector("media\\:thumbnail");
  const mediaThumbUrl = mediaThumbnail?.getAttribute("url")?.trim();
  if (mediaThumbUrl) {
    return mediaThumbUrl;
  }

  const mediaContent = element.querySelector("media\\:content");
  const mediaType = mediaContent?.getAttribute("type")?.trim();
  const mediaUrl = mediaContent?.getAttribute("url")?.trim();
  if (mediaUrl && (!mediaType || mediaType.startsWith("image"))) {
    return mediaUrl;
  }

  const imageUrl = getTextContent(element.querySelector("image > url"));
  if (imageUrl) {
    return imageUrl;
  }

  return undefined;
}

function parsePodcastItem(xmlText: string): PodcastItem | null {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, "text/xml");
  const item = doc.querySelector("item");
  if (!item) {
    return null;
  }

  const channel = doc.querySelector("channel");
  const fallbackImageUrl = getImageUrlFromElement(channel);

  const title = getTextContent(item.querySelector("title")) ?? "最新エピソード";
  const descriptionRaw =
    getTextContent(item.querySelector("description")) ??
    getTextContent(item.querySelector("content\:encoded")) ??
    "";
  const description = descriptionRaw ? stripHtml(descriptionRaw) : undefined;
  const pubDate = getTextContent(item.querySelector("pubDate"));

  const enclosure = item.querySelector("enclosure");
  const enclosureUrl = enclosure?.getAttribute("url") ?? undefined;

  const mediaContent = item.querySelector("media\\:content");
  const mediaUrl = mediaContent?.getAttribute("url") ?? undefined;

  const link = getTextContent(item.querySelector("link"));
  const itemImageUrl = getImageUrlFromElement(item) ?? fallbackImageUrl;

  return {
    title,
    description,
    pubDate,
    audioUrl: enclosureUrl ?? mediaUrl ?? undefined,
    pageUrl: link ?? undefined,
    imageUrl: itemImageUrl ?? undefined,
  };
}

function formatDate(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export default function PodcastLatestWidget({
  feedUrl,
  className,
}: PodcastLatestWidgetProps) {
  const [state, setState] = useState<WidgetState>({ status: "idle" });

  const resolvedFeedUrl = useMemo(() => feedUrl?.trim(), [feedUrl]);

  useEffect(() => {
    if (!resolvedFeedUrl) {
      setState({
        status: "error",
        message:
          "PodcastのRSSフィードURLが未設定です。設定後に再読み込みしてください。",
      });
      return undefined;
    }

    let isMounted = true;
    const controller = new AbortController();

    const load = async () => {
      try {
        setState({ status: "loading" });
        const response = await fetch(resolvedFeedUrl, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`RSS取得に失敗しました (${response.status})`);
        }
        const xmlText = await response.text();
        const parsed = parsePodcastItem(xmlText);
        if (!parsed) {
          throw new Error("RSSにエピソードが見つかりませんでした");
        }
        if (isMounted) {
          setState({ status: "loaded", item: parsed });
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }
        if ((error as Error).name === "AbortError") {
          return;
        }
        setState({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "RSSの取得でエラーが発生しました",
        });
      }
    };

    void load();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [resolvedFeedUrl]);

  const content = (() => {
    if (state.status === "loading" || state.status === "idle") {
      return (
        <p className={styles.message}>最新エピソードを読み込んでいます…</p>
      );
    }

    if (state.status === "error") {
      return <p className={styles.message}>{state.message}</p>;
    }

    const { item } = state;
    const formattedDate = formatDate(item.pubDate);

    return (
      <div className={styles.episode}>
        <div className={styles.episodeHeader}>
          {item.imageUrl ? (
            <img
              className={styles.episodeArtwork}
              src={item.imageUrl}
              alt={`${item.title}のカバー画像`}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className={styles.episodeArtworkNoImage}>No Image</div>
          )}
          <div className={styles.episodeMeta}>
            <Heading as="h3" className={styles.episodeTitle}>
              {item.title}
            </Heading>
            {formattedDate ? (
              <span className={styles.episodeDate}>{formattedDate}</span>
            ) : null}
          </div>
        </div>
        {item.description ? (
          <p className={styles.episodeDescription}>{item.description}</p>
        ) : null}
        {item.audioUrl ? (
          <audio className={styles.player} controls preload="none">
            <source src={item.audioUrl} />
            お使いのブラウザは音声再生に対応していません。
          </audio>
        ) : (
          <p className={styles.message}>
            音声URLが見つかりませんでした。RSSのenclosure設定を確認してください。
          </p>
        )}
        {item.pageUrl ? (
          <a
            className={styles.link}
            href={item.pageUrl}
            target="_blank"
            rel="noreferrer"
          >
            エピソード詳細へ
          </a>
        ) : null}
      </div>
    );
  })();

  return (
    <section className={clsx(styles.widget, className)}>
      <Heading as="h2" className={styles.title}>
        最新Podcast
      </Heading>
      {content}
    </section>
  );
}
