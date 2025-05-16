import { useLayoutEffect, useState, useRef } from 'react';
import { useGlobal } from '@/context/GlobalContext';
import * as motion from "motion/react-client"
import { useInView } from "motion/react"
import './Home.css';

const Home = () => {
  const [navHeight, setNavHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const { data, loading, error, changeColor } = useGlobal();
  const container = useRef(null)  ;
  const isInView = useInView(container);

  useLayoutEffect(() => {
    setNavHeight(document.getElementsByClassName('navigation')[0].clientHeight || 0);
    setFooterHeight(document.getElementsByClassName('footer')[0].clientHeight || 0);
    changeColor()

  }, [])

  return (
    <motion.div 
      ref={container}
      className='section'
      style={{ minHeight: `calc(100vh - ${footerHeight}px)`,
      paddingTop: `${window.innerWidth <= 768 ? navHeight * 1.5 : navHeight}px`,
      paddingBottom: `${navHeight}px` }}
      initial={{ opacity: 0 }}
      animate={ isInView ? { opacity: 1 } : null}
      transition={{
          duration: 0.5
      }}>
      { !loading || error ?
        (<div className='home__container'>
          <h1 className=''dangerouslySetInnerHTML={{ __html: data.home.header}}></h1>
          <p>{data.home.content.text}</p> 
        </div>) :
        (<div className='home__container'>
          <p>Loading</p>
        </div>)
        }
    </motion.div>
  );
};

export default Home;
