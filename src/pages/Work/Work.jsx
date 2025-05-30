import { useEffect, useState, useRef } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import Spinner from '../../components/ui/Spinner/Spinner'
import WorkSingle from '../../pages/Work/WorkSingle/WorkSingle';
import * as motion from "motion/react-client";
import { useInView } from "motion/react";

const Work = () => {
  const [navHeight, setNavHeight] = useState(0);
  const { data, loading } = useGlobal();
  const container = useRef(null);
  const isInView = useInView(container);

  useEffect(() => {
    // get nav height
    const nav = document.getElementsByClassName('navigation')[0]
    setNavHeight(nav.clientHeight || 0);
  }, []);

  if (!loading) {
    return (
      <motion.div
        ref={container}
        initial={{ opacity: 0 }}
        animate={ isInView ? { opacity: 1 } : null}
        transition={{
          duration: 0.5
        }}>
        <title>{data.work.seoOverride.title}</title>
        <meta name="description" content={data.work.seoOverride.description} />
        <meta name="keywords" content={data.work.seoOverride.keywords} />
        {data.work.singleWork.map((work, i) => {
          return <WorkSingle 
            key={`work-${i}`}
            className='work z-1'
            reverse={ i % 2 !== 0 } 
            props={work} 
            navHeight={navHeight} />
        })}
      </motion.div>
    )
  } else {
    return (<Spinner />)
  }
};

export default Work;
