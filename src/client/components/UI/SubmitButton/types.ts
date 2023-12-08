import React from 'react';

export interface IButtonProps {
  onClick?: () => void;
  title?: string;
  style?: React.CSSProperties;
}
