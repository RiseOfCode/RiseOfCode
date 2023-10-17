import React from 'react';
import logoIcon from './logo.svg';
import styles from './index.module.css';

const Logo = () => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: logoIcon }}
      className={styles.logo}
    />
  );
};

export default Logo;
