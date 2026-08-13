import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

export default function DolphinJump({ src, className = "" }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                },
            });

            // posisi awal: di bawah (tersembunyi di balik wave), miring ke bawah
            gsap.set(el, {
                y: 60,
                x: 150,
                rotate: 90,
                opacity: 0,
            });

            tl.to(el, {
                y: -70,
                x: 120,
                rotate: 20,
                opacity: 1,
                duration: 0.9,
                ease: "power2.in", // gerak naik cepat lalu melambat, khas lompatan
            }).to(el, {
                y: 10,
                x: 90,
                rotate: -90,
                opacity: 0,
                duration: 0.8,
                ease: "power2.in",
            })
        }, ref);

        return () => ctx.revert();
    }, []);

    return (
        <img
            ref={ref}
            src={src}
            alt="dolphin jumping"
            className={className}
        />
    );
}