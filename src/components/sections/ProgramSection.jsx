// ProgramSection.jsx
import useScrollReveal from "../../hooks/useScrollReveal";
import ProgramMarquee from "../ui/ProgramMarquee";
import program1 from "../../assets/programassets/program1.png";
import program2 from "../../assets/programassets/program2.png";
import program3 from "../../assets/programassets/program3.png";
import program4 from "../../assets/programassets/diving.jpg";


// need refactoring to data
const programs = [
  {
    image: program1,
    title: "Coral Reef Conservation",
    desc: "A coral reef restoration program with local communities to keep marine ecosystems healthy.",
  },
  {
    image: program2,
    title: "Environmental Education",
    desc: "Educating the younger generation about the importance of protecting marine ecosystems from an early age.",
  },
  {
    image: program3,
    title: "Beach Cleanup",
    desc: "Regular beach cleanup activities with volunteers to reduce plastic waste in the ocean.",
  },
  {
    image: program4,
    title: "Conservation Diving",
    desc: "Diving activities to monitor underwater conditions and document marine life.",
  },
];

export default function ProgramSection() {
  const h2Ref = useScrollReveal({ direction: "left", start: "top 60%", end: "bottom top" });
  const pRef = useScrollReveal({ direction: "up", start: "top 60%", end: "bottom top" });

  return (
    <section className="min-h-screen bg-background overflow-hidden">
      <div className="space-y-10 p-6">
        <h2 ref={h2Ref} className="text-5xl font-bold text-white">
          Our <span className="bg-white text-background rounded-3xl px-2 ">Program</span>
        </h2>
        <p ref={pRef} className="text-white text-justify text-md">
          Over the past ten years, we have implemented several programs aimed at
          promoting the conservation of our marine environment. With the support
          of passionate marine conservation volunteers, we have continued to work
          together to develop and expand these programs.
        </p>
      </div>

      <ProgramMarquee programs={programs} interval={3000}  />
    </section>
  );
}