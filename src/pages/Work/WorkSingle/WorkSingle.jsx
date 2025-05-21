import "./WorkSingle.css";
import { useEffect, useRef } from "react";
import * as motion from "motion/react-client";
import { splitText } from "motion-plus";
import { useInView } from "motion/react";
import { stagger } from "motion";
import { useGlobal } from '@/context/GlobalContext';
import animateLines from "@/utils/animateLines";
import Github from "@/assets/github.svg?react";
import Live from "@/assets/live.svg?react";
// import Quadilateral from "../../../components/ui/Quadilateral/Quadilateral";

const WorkSingle = ({ className, reverse, navHeight, props }) => {
  const { loading, changeColor } = useGlobal();
  const section = useRef(null);
  const container = useRef(null);
  const isContentInView = useInView(container); // for content

  useEffect(() => {
    // once info has been received and ref is set
    // change nav color to match section at the top
    if (!loading && section.current) {

      // add Intersection Observer when top of viewport
      const observerTop = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {  
            if (entry.isIntersecting) {
              changeColor(entry.target.style.background)
            } 
          });
        },
        {
          threshold: .05, // Trigger when the entire component is visible
          rootMargin: '0px 0px -90% 0px', // Consider the top 10% of the viewport
        }
      );

      if (section.current) {
        observerTop.observe(section.current);
      }

      // once fonts are loaded, animate
      document.fonts.ready.then(() => {
        if (!isContentInView) return;

        const { words } = splitText(container.current.querySelector("h1"));
        const { lines } = splitText(container.current.querySelector("p"));

        animateLines(
          words,
          { opacity: [0, 1], y: [10, 0] },
          "spring",
          0,
          1,
          stagger(0.15)
        );
        animateLines(
          lines,
          { opacity: [0, 1], y: [20, 0] },
          "spring",
          0,
          0.75,
          stagger(0.1)
        );
      });

      return () => {
        observerTop.disconnect();
      };
    }
  }, [isContentInView, loading, section.current]);

  return (
    <div
      className="work-single section"
      ref={section}
      style={{
        paddingTop: `${
          window.innerWidth <= 768 ? navHeight * 1.5 : navHeight
        }px`,
        paddingBottom: `${navHeight}px`,
        background: `${props.bg}`
      }}
    >
      {/* <Quadilateral /> */}
      <div
        ref={container}
        className={`${
          reverse ? "work-single__container work-single__container--reverse" : "work-single__container"
        } ${className} `}
      >
        <motion.div
          className="work-single__media"
          initial={{ opacity: 0, y: 45 }}
          animate={isContentInView ? { opacity: 1, y: 0 } : null}
          transition={{
            type: "spring",
            bounce: 0.5,
            duration: 2,
          }}
        >
          {props.hasVideo ? (
            isContentInView ? (
              <video controls>
                <source src={props.video.url} type={props.video.mimeType} />
              </video>
            ) : (
              <div></div>
            )
          ) : isContentInView ? (
            <img src={props.image.url} />
          ) : (
            <div></div>
          )}
        </motion.div>
        <div className="work-single__info">
          <h1 className="h3">{props.title}</h1>
          <p className="work-single__description">{props.description}</p>
          <ul className="work-single__frameworks text-md">
            {props.frameworks.map((str, j) => {
              return (
                <motion.li
                  key={`framework-${j}`}
                  initial={{ opacity: 0, y: 135 }}
                  animate={isContentInView ? { opacity: 1, y: 0 } : null}
                  transition={{
                    duration: 0.5,
                    delay: 0.25 * (j + 0.5),
                  }}
                >
                  {str}
                </motion.li>
              );
            })}
          </ul>
          <div className='work-single__examples'>
            {props.github ? (
              <a
                className="work-single__example"
                href={props.github}
                target="_blank"
                aria-label={`open new tab to GitHub repo for ${props.title}`}
              >
                <Github />
              </a>
            ) : null}
            {props.live ? (
              <a 
                className="work-single__example"
                href={props.live} 
                target='_blank' 
                aria-label={`open new tab to live site for ${props.title}`}>
                <Live />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSingle;
