import Header from '@site/src/components/Header';

import styles from './styles.module.css';
import Coveralls from '@site/static/img/coveralls.svg';
import BrowserStack from '@site/src/components/BrowserStack';

export default function Thanks() {
  return (
    <div className="container narrow">
      <Header className={styles.header}>Thanks</Header>
      <p>Personal thanks:</p>
      <ul>
        <li><a href="https://stackoverflow.com/users/157247/t-j-crowder">T.J. Crowder</a> for helping with <a href="https://stackoverflow.com/a/46756077/387194">tracking_replace</a>.</li>
        <li><a href="https://github.com/jerch">@jerch</a> for helping with ANSI Parsing.</li>
        <li><a href="https://stackoverflow.com/users/1551349/cviejo">@cviejo</a> for <a href="https://stackoverflow.com/a/35115703/387194">ASCII table algorithm fix</a>.</li>
      </ul>
      <p>Also thanks to:</p>
      <ul className={styles.services}>
        <li>
          <a href="https://coveralls.io/">
            <Coveralls role="img" width={200} height={35} />
          </a>
        </li>
        <li>
          <a href="https://www.browserstack.com/">
            <BrowserStack width={200} height={43} />
          </a>
        </li>
      </ul>
    </div>
  );
}
