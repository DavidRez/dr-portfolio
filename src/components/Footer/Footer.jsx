import './Footer.css';
import { useGlobal } from '@/context/GlobalContext';

const Footer = () => {
  const { data, loading, error } = useGlobal();

  return (
      <footer className='footer'>
        <p>Designed and built by David Ramirez</p>
        <p>{`© ${new Date().getFullYear()}`}</p>
      </footer>
  );
};

export default Footer;
