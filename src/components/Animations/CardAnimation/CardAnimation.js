import React from 'react';
import { motion, useInView } from 'framer-motion';


const AnimatedCard = ({ children, delay }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });

    return (
        <motion.div
            ref={ref}
            className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-md shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.div>
    );
};


export default AnimatedCard;