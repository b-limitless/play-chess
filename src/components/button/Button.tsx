import { ReactNode } from 'react';
import styles from './button.module.scss';
import './button.scss';

type buttonType = 'round' | 'square';
type buttonVariant = 'primary' | 'secondary' | 'dark' | 'red' | 'yellow' | 'dark__2' | 'dark__3';

interface ButtonInterface {
  children: ReactNode;
  type: buttonType;
  variant: buttonVariant;
  small?: boolean;
  addStyles?: any;
  [x: string]: any;
}
export default function Button({ children, type, variant, small, addStyles, ...rest }: ButtonInterface) {

  let buttonBaseClass = small ? styles.btn__small : styles.btn;

  if (variant === 'primary') {
    buttonBaseClass += ' ' + styles.primary;
  }
  if (variant === 'dark') {
    buttonBaseClass += ' ' + styles.dark;
  }

  if (variant === 'red') {
    buttonBaseClass += ' ' + styles.red;
  }

  if (variant === 'yellow') {
    buttonBaseClass += ' ' + styles.yellow;
  }


  if (variant === 'dark__2') {
    buttonBaseClass += ' ' + styles.dark__2;

  }

  if (variant === 'dark__3') {
    buttonBaseClass += ' ' + styles.dark__3;

  }


  if (type === 'round') {
    buttonBaseClass += ' ' + styles.round;
  }

  return (
    <button className={`${buttonBaseClass} ${addStyles}`} {...rest}>
      {children}
    </button>
  )
}
