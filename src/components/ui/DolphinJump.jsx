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
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            });

            // posisi awal: di bawah (tersembunyi di balik wave), miring ke bawah
            gsap.set(el, {
                y: 100,
                x: -40,
                rotate: -15,
                opacity: 0,
            });

            tl.to(el, {
                y: -140,
                x: 20,
                rotate: 20,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out", // gerak naik cepat lalu melambat, khas lompatan
            }).to(el, {
                y: 0,
                x: 0,
                rotate: -10,
                duration: 0.5,
                ease: "power2.in", // jatuh kembali makin cepat (efek gravitasi)
            });
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