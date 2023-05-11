import { motion } from 'framer-motion';
import { styles } from '../styles';

import { staggerContainer } from '../utilis/motion';

const SectionWrapper = (Component , idname) => function Hoc() {
  return (
    <motion.section variants={staggerContainer()} 
    initial="hidden"
    whileInView="show"
    viewport={{ once:true , amount: 0.25}}
    className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
    >
      <span className='hash-span' id={idname}>
         &nbsp;
      </span>
       
     <Component />
    </motion.section>
  )
}

export default SectionWrapper