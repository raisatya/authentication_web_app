import { useState, useEffect, useRef } from 'react';

const useLazyLoadImage = (initialUrl) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            {
                threshold: 0.1
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    return [isVisible, elementRef];
};

export default useLazyLoadImage;
