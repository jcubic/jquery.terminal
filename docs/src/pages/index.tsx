import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Terminal from '@site/src/components/Terminal';
import Contributors from '@site/src/components/Contributors';
import Thanks from '@site/src/components/Thanks';
import Sponsors from '@site/src/components/Sponsors';


import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className="hero hero--primary">
      <div className={clsx('container', styles.container)}>
        <aside className={styles.hero_text}>
          <h1>
            <span>jQuery Terminal</span>
            <span>Summary</span>
          </h1>
          <p>
            <span className={styles.hero_intro}>jQuery Terminal is </span>
            <span className={styles.hero_prefix}>An </span>
            open-source, feature-rich JavaScript library that adds a terminal interface to your
            website.</p>
          <p>
            <span className={styles.hero_second}>jQuery Terminal </span>
            <span className={styles.hero_second}>It </span>
            uses jQuery only as a dependency, and you can think of it as a
            framework.</p>
          <p>It's perfect for adding advanced functionality for power users, serving as
            a debugging tool, or creating cool websites that resemble a terminal from
            GNU/Linux, macOS, or Windows WSL.</p>
        </aside>
        <div className={styles.terminal_container}>
          <Terminal />
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.tagline}
      description="Description will go into a meta tag">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <Contributors />
        <Thanks />
        <Sponsors />
        <div className={styles.spacer} />
      </main>
    </Layout>
  );
}
