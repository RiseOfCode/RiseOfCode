import React from 'react';
import { IButtonProps } from './types';
import styles from './index.module.css';

const SubmitButton = (props: IButtonProps) => {
  return (
    <button type="submit" className={styles.submitButton}>
      {props.title}
    </button>
  );
};

export default SubmitButton;
