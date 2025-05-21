import {React, useReducer} from 'react';
import useTheme from '@/hooks/useTheme';
import './ThemeToggle.css'
// import { useGlobal } from '@/context/GlobalContext';
import Moon from '@/assets/moon.svg?react'
import Sun from '@/assets/sun.svg?react'

function ThemeToggle() {
  const [theme, setTheme] = useTheme('dark');

  return (
    <button
      className='theme-toggle-button'
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        // changeTheme(theme === 'dark' ? 'light' : 'dark')
      }}
    >
      {theme === 'dark' 
        ? <Sun />
        : <Moon />
       }
    </button>
  );
}

export default ThemeToggle;
