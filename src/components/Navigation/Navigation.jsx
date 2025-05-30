import NavigationDesktop from './NavigationDesktop';
import NavigationMobile from './NavigationMobile';
import { NavLink, useLocation } from 'react-router';
import Logo from '../../assets/logo.svg?react';
import './Navigation.css';
import { useGlobal } from '../../context/GlobalContext';

const Navigation = () => {
  const { color } = useGlobal();
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <header className='navigation flex flex-row items-center justify-between p-4' style={currentRoute.includes('work') ? { background: color } : null}>
      <NavLink className='navigation__logo' to='/' aria-label='link to homepage'>
          <Logo />
      </NavLink>
      <NavigationDesktop className='hidden md:flex' />
      <NavigationMobile className='hidden max-md:flex' />
    </header>
  );
};

export default Navigation;
