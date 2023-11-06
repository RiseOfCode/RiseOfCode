import React from 'react';
import { IButtonProps } from './types';
import styles from './index.module.css';

const Button = (props: IButtonProps) => {
  return (
    <div onClick={props.onClick} className={styles.button} title={props.title}>
      <div className={styles.content}>Кнопка</div>
    </div>
  );
};

export default Button;
