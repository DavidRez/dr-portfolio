import { motion } from 'motion/react'

function Spinner() {
    return (
        <div className='spinner__container'>
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