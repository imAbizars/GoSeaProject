import { useRef } from "react"
import * as motion from "motion/react-client"
import { useScroll, useTransform } from "motion/react"
import HeroImage from "../assets/heroImage.jpg"

export default function Home() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.7]);
    return (
    <section ref={sectionRef} className="relative flex flex-col justify-center min-h-screen border border-black overflow-hidden">
        <motion.img
            src={HeroImage}
            style={{ scale }}
            className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/40 z-10"/>
        <div className="p-6 z-20">
            <motion.h1
                initial={{ opacity: 0, x: -70 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.3}}
                className="w-65 text-6xl tracking-tight text-white font-bold"
            >
                Make The Sea Great Again,
                <span className="block mt-4">With Us!</span>
            </motion.h1>
        </div>
    </section>
  )
}