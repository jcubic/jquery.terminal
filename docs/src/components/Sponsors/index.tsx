import Header from '@site/src/components/Header';
import styles from './styles.module.css';

export default function Sponsors() {
  return (
    <div className="container narrow">
      <Header className={styles.sponsors}>Sponsors</Header>
      <p><a href="mailto:jcubic@onet.pl?subject=jQuery%20Terminal%20Sponsorship">Become a sponsor</a></p>
    </div>
  );
}
