import { useRef } from "react";
import * as motion from "motion/react-client";
import { useScroll, useTransform } from "motion/react";
import HeroImage from "../../assets/heroImage.jpg";
import CutoutBadge from "../ui/CoutoutBadge";
import Wave from "../ui/Wave";

export default function HeroSection() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.7]);
    const items = [
        { label: "Cheerfull" },
        { label: "Carefull" },
        { label:"Cihuy" }
    ]
    return (
        <section
        id="home"
        ref={sectionRef}
        className="relative flex flex-col justify-center min-h-screen overflow-hidden"
        > 
          <motion.img
              src={HeroImage}
              style={{ scale }}
              className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="flex flex-col space-y-8 p-8 mb-10 z-20">
              <motion.h1
                  initial={{ opacity: 0, y: -70 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="w-65 text-5xl tracking-tight text-white font-heading font-bold"
              >
                  Make The Sea Great Again,
                  <span className="block mt-4">With Us!</span>
              </motion.h1>
              <div className="flex space-x-4 z-20">
                {items.map((item) => (
                  <CutoutBadge key={item.label} text={item.label} fontSize={32} rounded={10} />
                ))}
              </div>
              <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-primary-button max-w-40 p-2 rounded-4xl font-body font-bold text-xl text-white cursor-pointer hover:bg-background"
              >
                  Join With Us
              </motion.button>
        </div>
        <Wave
            className="absolute bottom-0 left-0 w-full z-20 h-20!"
            fill="#ffff"
        />
        </section>
    );
}