import { useLayoutEffect, useState, useRef } from 'react';
import { useGlobal } from '../context/GlobalContext';
import * as motion from "motion/react-client"
import { useInView } from "motion/react"
import Spinner from '../components/ui/Spinner/Spinner';
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

  if (!loading) {
    return (
      <motion.div 
        ref={container}
        className='section'
        style={{ minHeight: `calc(100vh - ${footerHeight}px)`,
        paddingTop: `${window.innerWidth <= 768 ? navHeight * 2 : navHeight * 1.5}px`,
        paddingBottom: `${navHeight}px` }}
        initial={{ opacity: 0 }}
        animate={ isInView ? { opacity: 1 } : null}
        transition={{
            duration: 0.5
        }}>
        <title>{data.home.seoOverride.title}</title>
        <meta name="description" content={data.home.seoOverride.description} />
        <meta name="keywords" content={data.home.seoOverride.keywords} />
        <div className='home__container'>
          <motion.h1 
            className='gradient-header' 
            dangerouslySetInnerHTML={{ __html: data.home.header}}
            initial={{ opacity: 0, y: 48 }}
            animate={ isInView ? { opacity: 1, y: 0 } : null}
            transition={{
                duration: 0.5,
                delay: 0.5
            }}>
          </motion.h1>
          <motion.div 
            dangerouslySetInnerHTML={{ __html: data.home.content.html}}
            initial={{ opacity: 0, y: 48 }}
            animate={ isInView ? { opacity: 1, y: 0 } : null}
            transition={{
                duration: 0.5,
                delay: 0.75
            }}>
          </motion.div> 
        </div>
      </motion.div>
    )
  } else {
    return (<Spinner />)
  }
};

export default Home;
