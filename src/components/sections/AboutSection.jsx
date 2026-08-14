import { useRef } from "react";
import * as motion from "motion/react-client";
import StatCircle from "../ui/StatCircle";
import useWordReveal from "../../hooks/useWordReveal";
import { aboutItems, statementText } from "../../data/aboutData";
import Wave from "../ui/Wave";
import DolphinJump from "../ui/DolphinJump";
import dolpin from "../../assets/dolpinChar.png"

export default function AboutSection() {
    const statementRef = useRef(null);
    const textRef = useRef(null);
    const wordsArray = statementText.split(" ");

    useWordReveal(statementRef, textRef);

    return (
        <section
            ref={statementRef}
            id="about"
            className="flex flex-col min-h-screen overflow-hidden z-31"
        >
            <div className="space-y-10 p-6">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className=" text-5xl font-heading font-bold text-background px-2"
                >
                    About Our Journey
                </motion.h2>

                <div className="flex justify-center space-x-2 ">
                    {aboutItems.map((item, i) => (
                        <StatCircle
                            key={item.label}
                            label={item.label}
                            value={item.value}
                            suffix={item.suffix}
                            delay={i * 0.2 + 0.3}
                        />
                    ))}
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 flex  text-justify">
                    <p
                        ref={textRef}
                        className="font-body font-bold text-[23px] sm:text-[40px] md:text-[52px] lg:text-[60px] leading-[1.2] tracking-tight text-black max-w-5xl select-none"
                    >
                        {wordsArray.map((word, idx) => (
                            <span
                                key={idx}
                                className="reveal-word inline-block mr-[0.24em] will-change-[opacity] text-background"
                                style={{ opacity: 0.15 }}
                            >
                                {word}
                            </span>
                        ))}
                    </p>
                </div>
            </div>
            <div className="relative w-full ">
                <Wave
                    fill="var(--background)"
                    className="w-full z-21"
                />
                <DolphinJump
                    src={dolpin}
                    className="absolute bottom-16 left-1/3 w-28 z-20 pointer-events-none"
                />
            </div>
        </section>
    );
}