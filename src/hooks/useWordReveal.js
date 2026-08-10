import { useEffect } from "react";
import { gsap } from "../lib/gsap";

export default function useWordReveal(triggerRef, textRef) {
    useEffect(() => {
        const el = textRef.current;
        if (!el) return;

        const words = el.querySelectorAll(".reveal-word");
        if (!words.length) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                words,
                { opacity: 0.15 },
                {
                    opacity: 1,
                    stagger: 0.1,
                    ease: "power1.out",
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top 80%",
                        end: "bottom 60%",
                        scrub: 0.8,
                    },
                }
            );
        }, triggerRef);

        return () => ctx.revert();
    }, [triggerRef, textRef]);
}