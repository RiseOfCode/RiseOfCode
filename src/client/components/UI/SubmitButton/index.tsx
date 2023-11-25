import React from 'react';
import { IButtonProps } from './types';
import styles from './index.module.css';

const SubmitButton = (props: IButtonProps) => {
  return (
    <button
      type="submit"
      className={styles.submitButton}
      style={props.style}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
};

export default SubmitButton;
