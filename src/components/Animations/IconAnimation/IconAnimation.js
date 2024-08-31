import React from 'react';
import { motion, useInView } from 'framer-motion';


const AnimatedIcon = ({ icon: Icon, delay, color }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });

    return (
        <motion.div
            ref={ref}
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay }}
        >
            <Icon className= 'w-6 h-6' />
        </motion.div>
    );
};



export default AnimatedIcon;

