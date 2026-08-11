import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

/**
 * Reveal elemen dari arah tertentu saat scroll, hilang lagi saat scroll balik.
 * @param {Object} options
 * @param {"left"|"right"|"up"|"down"} options.direction - arah datang animasi
 * @param {number} options.distance - jarak geser (px)
 * @param {number} options.duration - durasi animasi (detik)
 * @param {string} options.start - trigger start
 * @param {string} options.end - trigger end
 */
export default function useScrollReveal({
    direction = "left",
    distance = 150,
    duration = 0.8,
    start = "top 80%",
    end = "bottom top",
    } = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const axis = direction === "left" || direction === "right" ? "x" : "y";
        const fromValue =
            direction === "left" || direction === "up" ? -distance : distance;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                el,
                { [axis]: fromValue, opacity: 0 },
                {
                    [axis]: 0,
                    opacity: 1,
                    duration,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start,
                        end,
                        toggleActions: "play reverse play reverse",
                    },
                }
            );
        }, ref);

        return () => ctx.revert();
    }, [direction, distance, duration, start, end]);

    return ref;
}