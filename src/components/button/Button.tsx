import React, { ReactNode } from 'react'; 
import styles from './button.module.scss';

type buttonType = 'round' | 'square';
type buttonVariant = 'primary' | 'secondary';

interface ButtonInterface {
    children:ReactNode;
    type: buttonType;
    variant: buttonVariant;
    [x:string]:any;
}
export default function Button({children, type, variant, ...rest}: ButtonInterface) {
  
  let buttonBaseClass = styles.btn;
  
  if(variant === 'primary') {
    buttonBaseClass += ' ' + styles.primary;
  }

  if(type === 'round') {
    buttonBaseClass += ' ' + styles.round;
  }
  
  return (
    <button className={buttonBaseClass} {...rest}>
        {children}
    </button>
  )
}
