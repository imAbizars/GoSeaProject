// ProgramSlider.jsx
import { useRef, useState,useCallback } from "react";

export default function ProgramSlider({ programs }) {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
      const container = scrollRef.current;
      if (!container) return;
      const { scrollLeft, offsetLeft } = container;
      let closestIndex = 0;
      let closestDistance = Infinity;
  
      Array.from(container.children).forEach((child, i) => {
        const distance = Math.abs(child.offsetLeft - offsetLeft - scrollLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });
      setActiveIndex(closestIndex);
    };
  const handlePointerDown = (e) => {
    isDragging.current = true;
    setDragging(true);
    startX.current = e.pageX ?? e.touches?.[0].pageX;
    scrollStart.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.scrollSnapType = "none"; // matikan snap sementara saat drag
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX ?? e.touches?.[0].pageX;
    const walk = x - startX.current;
    scrollRef.current.scrollLeft = scrollStart.current - walk;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    setDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.scrollSnapType = "x mandatory"; // nyalakan lagi
    }
  };
  const scrollToIndex = useCallback((i) => {
      const container = scrollRef.current;
      if (!container) return;
      const card = container.children[i];
      if (!card) return;
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft,
        behavior: "smooth",
      });
    }, []);
  return (
    <>
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className={`flex gap-6 overflow-x-auto px-6 py-6 
        snap-x snap-mandatory scroll-smooth
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
        ${dragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      {programs.map((program, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-lg overflow-hidden w-72 shrink-0 snap-center"
        >
          <div className="h-40  w-full overflow-hidden pointer-events-none">
            <img
              src={program.image}
              alt={program.title}
              className="h-full w-full object-cover "
              draggable={false}
            />
          </div>
          <div className="p-4 space-y-2 pointer-events-none">
            <h3 className="text-lg font-bold text-background">
              {program.title}
            </h3>
            <p className="text-sm text-gray-600 text-justify">
              {program.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-center gap-2 mt-2">
      {programs.map((_, i) => (
        <button
          key={i}
          onClick={() => {
            setActiveIndex(i);
            scrollToIndex(i);
          }}
          aria-label={`Go to slide ${i + 1}`}
          className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
            i === activeIndex
              ? "w-6 bg-white"
              : "w-2.5 bg-white/50 hover:bg-white/80"
          }`}
        />
      ))}
    </div>
    </>
  );
}