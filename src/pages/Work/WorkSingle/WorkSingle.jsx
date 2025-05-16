import "./WorkSingle.css";
import { useEffect, useRef } from "react";
import * as motion from "motion/react-client"
import { splitText } from "motion-plus"
import { useInView } from "motion/react"
import animateLines from "@/utils/animateLines";
import { stagger } from "motion"

const WorkSingle = ({className, reverse, props}) => {
  const container = useRef(null)  
  const isInView = useInView(container)
  
  useEffect(() => {
    // Make the container visible once fonts are loaded
    document.fonts.ready.then(() => {
      if (!isInView) return

      const { words } = splitText(container.current.querySelector("h1"))
      const { lines } = splitText(container.current.querySelector("p"))

      animateLines(
        words,
        { opacity: [0, 1], y: [10, 0] },
        'spring',
        0,
        1,
        stagger(0.15)
      )
      animateLines(
        lines,
        { opacity: [0, 1], y: [20, 0] },
        'spring',
        0,
        0.75,
        stagger(0.1),
      )
    })
  }, [isInView])

  return (
    <div ref={container}
      className={`${reverse ? 'work-single work-single--reverse' : 'work-single'} ${className} `} >
      <motion.div className="work-single__media"
        initial={{ opacity: 0, y: 45 }}
        animate={ isInView ? { opacity: 1, y: 0 } : null}
        transition={{
            type: 'spring',
            bounce: 0.5,
            duration: 2
        }}>
        {props.hasVideo ? (
          isInView ? <video controls>
            <source src={props.video.url} type={props.video.mimeType} />
          </video> :
          <div></div>
        ) : (
          isInView ? <img src={props.image.url} /> : <div></div>
        )}
      </motion.div>
      <div className="work-single__info">
        <h1 className="h3">{props.title}</h1>
        <p className="work-single__description"
          >
          {props.description}
        </p>
        <ul className="work-single__frameworks text-md">
          {props.frameworks.map((str, j) => {
            return <motion.li 
              key={`framework-${j}`}
              initial={{ opacity: 0, y: 135 }}
              animate={ isInView ? { opacity: 1, y: 0 } : null}
              transition={{
                duration: 0.5,
                delay: 0.25 * (j + .5)
              }}>
                {str}
              </motion.li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default WorkSingle;
