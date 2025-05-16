import { animate } from "motion"

export default function animateLines(text, animation, type = 'spring', bounce = 0, duration = 0.25, delay = 0) {
  animate(
      text,
      animation,
      {
          type: type,
          duration: duration,
          bounce: bounce,
          delay: delay,
      }
  )
}