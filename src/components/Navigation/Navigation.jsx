import NavigationDesktop from './NavigationDesktop';
import NavigationMobile from './NavigationMobile';
import './Navigation.css';
import { useGlobal } from '@/context/GlobalContext';

const Navigation = () => {
  const { color } = useGlobal();

  return (
    <header className='navigation' style={{ background: color }}>
      <NavigationDesktop className='navigation--desktop hidden md:flex' />
      <NavigationMobile className='navigation--mobile hidden max-md:flex' />
    </header>
  );
};

export default Navigation;
