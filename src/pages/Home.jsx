import { useRef } from "react"
import * as motion from "motion/react-client"
import { useScroll, useTransform } from "motion/react"
import HeroImage from "../assets/heroImage.jpg"
import Wave from "../components/ui/Wave"
export default function Home() {
    // scroll
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.7]);

    // aboutItems
    const aboutItems = [
        { label: "Since", value: "2016" },
        { label: "Program", value: "15+" },
        { label: "Volunteers", value: "150+" },
    ]
    return (
    <main>
        <section ref={sectionRef} className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <motion.img
                src={HeroImage}
                style={{ scale }}
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-black/40 z-10"/>
            <div className=" flex flex-col gap-6 p-8 z-20 ">
                <motion.h1
                    initial={{ opacity: 0, x: -70 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1}}
                    className="w-65 text-6xl tracking-tight text-white font-bold"
                >
                    Make The Sea Great Again,
                    <span className="block mt-4">With Us!</span>
                </motion.h1>
                <motion.button
                initial={{ opacity: 0, scale:0}}
                whileInView={{ opacity: 1, scale:1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9}}
                className="bg-primary-button max-w-40 p-2 rounded-md font-bold text-xl text-white cursor-pointer hover:bg-background">
                    Join With Us
                </motion.button>
            </div>
            <Wave className="absolute top-140 left-0 w-full z-20 " />
        </section>
        <section className="flex flex-col min-h-screen overflow-hidden z-31">
            
            <div className="space-y-10 p-4">
                <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1}}
                className="text-center text-4xl font-bold text-background">
                    About Our Journey
                </motion.h2>

                <div className="flex justify-center gap-4">
                    {aboutItems.map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                            className="bg-background text-white w-28 h-28 rounded-full flex flex-col items-center justify-center"
                        >
                            <h2 className="text-xl font-bold">{item.value}</h2>
                            <p>{item.label}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-center text-lg text-text-h max-w-2xl mx-auto px-6 mt-4 font-medium"
                >
                    For over 8 years, we've been dedicated to protecting our oceans through meaningful action and continuous education. 
                    This journey has led us to run more than 15 conservation programs, engaging thousands of volunteers 
                    and creating lasting change for marine ecosystems around the world.
                </motion.p>
            </div>
        </section>
    </main>
  )
}