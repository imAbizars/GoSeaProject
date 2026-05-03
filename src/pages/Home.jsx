import * as motion from "motion/react-client"
import HeroImage from "../assets/heroImage.jpg"
export default function Home() {
  return (
    <section className="flex flex-col justify-center h-120  ">
        <img src={HeroImage} className="absolute inset-0 w-full h-full object-cover z-0"/>
        <div className="absolute inset-0 bg-black/40 z-10"/>
        <div className="p-4 z-20">
            <motion.h1
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7}}
                className="w-65 text-6xl tracking-tight text-white font-bold"
            >
                Make The Sea Great Again,
                <span className="block mt-4">With Us!</span>
            </motion.h1>
        </div>
    </section>
  )
}