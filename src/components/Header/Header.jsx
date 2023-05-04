import { useState, useEffect } from 'react';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

export default function Header() {
  const [ dark, setDark ] = useState(false);

  const handleThemeSwitch = () => {
    setDark(!dark)
  }

  useEffect(() => {
    const root = document.documentElement;

    if(dark) {
      root.classList.add('dark');
    } else if (!dark) {
      root.classList.remove('dark');
    }
  }, [dark])

  return (
    <header className='flex justify-between px-[10%] py-10 shadow-lg dark:bg-darkModeElements'>
      <h1 className='font-semibold dark:text-white'>Where in the world?</h1>
      <button className='flex gap-1 dark:text-white' onClick={handleThemeSwitch}>
        {dark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
        {dark ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  )
}