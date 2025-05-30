import './Footer.css';

const Footer = () => {

  return (
      <footer className='footer p-4'>
        <p>{`David Ramirez © ${new Date().getFullYear()}`}</p>
      </footer>
  );
};

export default Footer;
