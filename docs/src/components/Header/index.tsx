import Heading from '@theme/Heading';
import slugify from 'slugify';
import { clsx } from 'clsx';

import styles from './style.module.css';

type HeaderProps = {
    children: string;
    className?: string;
};

export default function Header({ children, className }: HeaderProps) {
  return (
    <Heading as="h2" id={slugify(children)} className={clsx(className, styles.header)}>
      {children}
    </Heading>
  );
}
