// ProgramSection.jsx
import { useRef } from "react";
import * as motion from "motion/react-client";
import { StackedCarousel, ResponsiveContainer } from "react-stacked-center-carousel";
import useScrollReveal from "../../hooks/useScrollReveal";
import Wave from "../ui/Wave";
import program1 from "../../assets/programassets/program1.png";
import program2 from "../../assets/programassets/program2.png";
import program3 from "../../assets/programassets/program3.png";
import program4 from "../../assets/programassets/diving.jpg";

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

const ProgramCard = ({ data, dataIndex }) => {
  const { image, title, desc } = data[dataIndex];
  return (
    <div className="h-75  rounded-2xl overflow-hidden shadow-xl bg-white select-none">
      <img src={image} alt={title} className="w-full h-35 object-cover" draggable={false} />
      <div className="p-4">
        <h3 className="text-lg font-bold text-background">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>
      </div>
    </div>
  );
};

export default function ProgramSection() {
  const h2Ref = useScrollReveal({ direction: "up", start: "top 50%", end: "+=800" });
  const pRef = useScrollReveal({ direction: "down", start: "top 65%", end: "bottom top" });
  const carouselRef = useRef(null);

  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      <div className="space-y-10 p-6">
        <h2 ref={h2Ref} className="font-heading text-4xl font-bold text-white text-center ">
          Our <span className="bg-white text-background rounded-3xl px-2">Program</span>
        </h2>
        <p ref={pRef} className=" font-body text-white text-md text-center">
          Over the past ten years, we have implemented several programs aimed at
          promoting the conservation of our marine environment. With the support
          of passionate marine conservation volunteers, we have continued to work
          together to develop and expand these programs.
        </p>
      </div>

      <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="relative max-w-md mx-auto">
        <ResponsiveContainer
          carouselRef={carouselRef}
          render={(width, carouselRef) => (
            <StackedCarousel
              ref={carouselRef}
              slideComponent={ProgramCard}
              slideWidth={250}
              carouselWidth={width}
              data={programs}
              currentVisibleSlide={3}
              maxVisibleSlide={3}
              useGrabCursor
            />
          )}
        />
      </motion.div>
        <Wave
        className="absolute bottom-0 w-full h-20! z-20 "
        fill="var(--semi-background)"
        />
    </section>
  );
}