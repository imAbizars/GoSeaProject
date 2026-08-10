// src/components/ui/CountUp.jsx
import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useTransform, animate } from "motion/react";

export default function CountUp({ value, suffix = "", duration = 1.5 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const count = useMotionValue(0);
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const unsubscribe = count.on("change", (latest) => {
            setDisplayValue(Math.round(latest));
        });
        return unsubscribe;
    }, [count]);

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, value, {
                duration,
                ease: "easeOut",
            });
            return controls.stop;
        }
    }, [isInView, value, duration, count]);

    return (
        <span ref={ref}>
            {displayValue}
            {suffix}
        </span>
    );
}