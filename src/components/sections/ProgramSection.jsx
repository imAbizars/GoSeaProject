import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import useScrollReveal from "../../hooks/useScrollReveal";
import ProgramSlider from "../ui/ProgramSlider";
import program1 from "../../assets/programassets/program1.jpeg";
import program2 from "../../assets/programassets/program2.jpeg";
import program3 from "../../assets/programassets/program3.jpeg";

const programImages = [program1, program2, program3];

export default function ProgramSection() {
    const h2Ref = useScrollReveal({ direction: "left", start: "top 60%", end: "bottom top" });
    const pRef = useScrollReveal({ direction: "up", start: "top 60%", end: "bottom top" });
    
    return (
        <section className="min-h-screen bg-background">
            <div className="p-6 space-y-10">
                <h2 ref={h2Ref} className="text-5xl font-bold text-white">
                    Our Program
                </h2>
                <p ref={pRef} className="text-white text-justify text-md">
                    Over the past ten years, we have implemented several programs aimed at promoting the conservation of our marine environment. With the support of passionate marine conservation volunteers, we have continued to work together to develop and expand these programs.
                </p>
            </div>
            
            <ProgramSlider
            images={programImages} 
            interval={4000} />
        </section>
    );
}