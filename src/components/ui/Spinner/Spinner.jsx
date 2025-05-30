import { motion } from 'motion/react'
import './Spinner.css'

function Spinner() {
    return (
        <div className='spinner__container flex justify-center items-center'>
            <motion.div
                className='spinner__spinner'
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
        </div>
    )
}

export default Spinner;