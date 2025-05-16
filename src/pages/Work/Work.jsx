import { useEffect, useState, useRef } from 'react';
import { useGlobal } from '@/context/GlobalContext';
import Spinner from '@/components/ui/Spinner/Spinner'
import WorkSingle from '@/pages/Work/WorkSingle/WorkSingle';
import * as motion from "motion/react-client"
import { useInView } from "motion/react"
import "./Work.css";

const Work = () => {
  const [navHeight, setNavHeight] = useState(0);
  const { data, loading, changeColor } = useGlobal();
  const sections = useRef([]);
  const container = useRef(null)  
  const isInView = useInView(container)

  useEffect(() => {
    // get nav height
    const nav = document.getElementsByClassName('navigation')[0]
    setNavHeight(nav.clientHeight || 0);

    // add Intersection Observer to sections
    if (!loading && sections.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {  
            if (entry.isIntersecting) {
              changeColor(entry.target.style.background)
            } 
          });
        },
        {
          threshold: .05, // Trigger when the entire component is visible
          rootMargin: '0px 0px -90% 0px', // Consider the top 1% of the viewport
        }
      );

      sections.current.forEach((item) => {
        observer.observe(item);
      });
  
      return () => {
        sections.current.forEach((item) => {
            // console.log('un', item)
            // observer.unobserve(item);
            observer.disconnect();
        });
      };
    }
  }, [sections.current, loading])

  if (!loading) {
    return (
      <motion.div
        ref={container}
        initial={{ opacity: 0, y: 135 }}
        animate={ isInView ? { opacity: 1, y: 0 } : null}
        transition={{
          duration: 0.5
        }}>
        {data.work.singleWork.map((work, i) => {
          return <div className='section'
            key={`work-${i}`} ref={section => sections.current[i] = section}
            style={{ paddingTop: `${window.innerWidth <= 768 ? navHeight * 1.5 : navHeight}px`,
            paddingBottom: `${navHeight}px`,
            background: `${work.darkBg.hex}` }}>
            <WorkSingle 
              className='work'
              reverse={ i % 2 !== 0 } 
              props={work} /> 
          </div> 
        })}
      </motion.div>
    )
  } else {
    return (<Spinner />)
  }
};

export default Work;
