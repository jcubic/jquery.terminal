import type { ComponentType, SVGProps } from 'react';


import styles from './styles.module.css';

type SVGComponent = ComponentType<SVGProps<SVGSVGElement>> & { title?: string; };

type SVGThemeProps = {
    width: number;
    height: number;
    Light: SVGComponent;
    Dark: SVGComponent;
};

export default function SVGTheme({ width, height, Dark, Light }: SVGThemeProps) {
  return (
    <>
      <Light className={styles.light} width={width} height={height} role="img"/>
      <Dark className={styles.dark} width={width} height={height} role="img"/>
    </>
  );
}
