import React, { useState, useEffect } from 'react';
import {useInView} from 'framer-motion';

const AnimatedText = ({ text }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setCurrentText(prevText => prevText + text[currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        }, 100);
        return () => clearTimeout(timeout);
      }
    }, [currentIndex, text]);
  
    return <span>{isInView ? currentText : currentText}</span>;
  };

  export default AnimatedText;