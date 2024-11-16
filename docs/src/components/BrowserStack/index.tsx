import Light from '@site/static/img/browserstack-light.svg';
import Dark from '@site/static/img/browserstack-dark.svg';
import styles from './styles.module.css';

type BrowserStackProps = {
    width: number;
    height: number;
};

export default function BrowserStack({ width, height }: BrowserStackProps) {
  return (
    <>
      <Light className={styles.light} width={width} height={height} role="img"/>
      <Dark className={styles.dark} width={width} height={height} role="img"/>
    </>
  );
}
