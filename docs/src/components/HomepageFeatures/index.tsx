import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Simple, beginner friendly API',
    Svg: require('@site/static/img/undraw_terminal_electricity.svg').default,
    description: (
      <>
        jQuery Terminal is quick to learn and intuitive, making it ideal for developers at any level.
      </>
    ),
  },
  {
    title: 'Highly Customizable',
    Svg: require('@site/static/img/undraw_terminal_selectoption.svg').default,
    description: (
      <>
        Easily style and configure to match your project’s needs and design.
      </>
    ),
  },
  {
    title: 'Extremely Flexible',
    Svg: require('@site/static/img/undraw_terminal_pilates.svg').default,
    description: (
      <>
        Adaptable to various use cases, from simple terminals to complex web-based apps.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
