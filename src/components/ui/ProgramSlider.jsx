import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

export default function ProgramSlider({ images, interval = 400,}) {
    const [index, setIndex] = useState(0);

    const goToNext = useCallback(() => {
        setIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const goToSlide = (i) => {
        setIndex(i);
    };

    useEffect(() => {
        const timer = setInterval(goToNext, interval);
        return () => clearInterval(timer);
    }, [goToNext, interval]);

    return (
        <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        >
            <div className="relative h-60 m-4 rounded-2xl overflow-hidden ">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={index}
                        src={images[index]}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute inset-0 object-cover h-full w-full"
                    />
                </AnimatePresence>

            </div>
            <div className="relative justify-center left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                            i === index
                                ? "w-6 bg-white"
                                : "w-2.5 bg-white/50 hover:bg-white/80"
                        }`}
                    />
                ))}
            </div>
        </motion.div>
    );
}