import { ReactNode } from 'react';

export type ButtonType = 'blue' | 'red';

export interface IButtonProps {
  type: ButtonType;
  onClick?: () => void;
  children?: ReactNode;
  title?: string;
  disable?: boolean;
}
