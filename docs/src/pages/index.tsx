import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Terminal from '@site/src/components/Terminal';
import Contributors from '@site/src/components/Contributors';


import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className="hero hero--primary">
      <div className={clsx('container', styles.container)}>
        <aside className={styles.heroText}>
          <h1>jQuery Terminal</h1>
          <p>An open-source, feature-rich JavaScript library that adds a terminal interface to any
          website.</p>
          <p>It's perfect for adding advanced functionality for power users, serving as
          a debugging tool, or creating interactive portfolio websites that resemble a terminal from
          GNU/Linux, macOS, or Windows WSL.</p>
        </aside>
        <Terminal className={styles.terminal}/>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <Contributors />
      </main>
    </Layout>
  );
}
