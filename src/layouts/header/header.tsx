import React, { ChangeEventHandler } from 'react'
import Switch from '../../components/switch/switch';
import './header.scss';

interface IHeader {
  darkModeOnChangeHandler: ChangeEventHandler<HTMLInputElement>;
}
export default function Header({darkModeOnChangeHandler}: IHeader) {
  return (
    <header>
      <Switch
      onChange={darkModeOnChangeHandler}
      />
    </header>
  )
}
