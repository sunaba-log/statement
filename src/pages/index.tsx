import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import PodcastLatestWidget from "@site/src/components/PodcastLatestWidget";
import GithubIcon from "@site/src/components/GithubIcon";
import IconButton from "@site/src/components/IconButton";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const podcastFeedUrl = siteConfig.customFields?.podcastFeedUrl as
    | string
    | undefined;
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className={clsx("container", styles.heroContent)}>
        <div className={styles.heroText}>
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
            <br />
            :sunabalog
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/statement/intro"
            >
              宣言を読む
            </Link>
            <Link className="button button--secondary button--lg" to="/blog">
              記録を読む
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/members/"
            >
              隊員を見る
            </Link>
            <IconButton
              icon={<GithubIcon width={20} height={20} />}
              label="GitHub"
              href="https://github.com/sunaba-log"
              target="_blank"
              rel="noreferrer"
            />
          </div>
        </div>
        <PodcastLatestWidget
          feedUrl={podcastFeedUrl}
          className={styles.podcastWidget}
        />
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main></main>
    </Layout>
  );
}
