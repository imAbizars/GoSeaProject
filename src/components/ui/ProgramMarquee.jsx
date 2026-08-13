import { useRef, useState, useCallback, useEffect, useLayoutEffect } from "react";

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function ProgramSlider({ programs }) {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const dragStartDom = useRef(0);
  const [dragging, setDragging] = useState(false);
  const animationFrame = useRef(null);

  const n = programs.length;
  // clone terakhir di awal, clone pertama di akhir -> total n + 2 slide
  const extended = [programs[n - 1], ...programs, programs[0]];

  // domActiveIndex: index di array `extended` (1..n) yang lagi aktif
  const [domActiveIndex, setDomActiveIndex] = useState(1);
  // realIndex untuk dot indicator, selalu 0..n-1
  const realIndex = ((domActiveIndex - 1) % n + n) % n;

  // === set posisi awal langsung ke domIndex 1 (real index 0), tanpa animasi ===
  useLayoutEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[1];
    if (card) {
      container.scrollLeft = card.offsetLeft - container.offsetLeft;
    }
  }, []);

  const getCardOffset = (domIndex) => {
    const container = scrollRef.current;
    const card = container?.children[domIndex];
    if (!container || !card) return 0;
    return card.offsetLeft - container.offsetLeft;
  };

  // === custom smooth scroll dengan easing + callback onComplete ===
  const smoothScrollTo = useCallback((targetLeft, duration, onComplete) => {
    const container = scrollRef.current;
    if (!container) return;
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);

    const startLeft = container.scrollLeft;
    const distance = targetLeft - startLeft;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      container.scrollLeft = startLeft + distance * easeInOutCubic(progress);

      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(step);
      } else {
        animationFrame.current = null;
        onComplete?.();
      }
    };
    animationFrame.current = requestAnimationFrame(step);
  }, []);

  // === setelah animasi selesai, kalau posisi ada di clone (domIndex 0 / n+1),
  //     loncat instan (tanpa animasi) ke card asli yang sepadan ===
  const normalizeIfOnClone = useCallback(
    (landedDomIndex) => {
      const container = scrollRef.current;
      if (!container) return;

      if (landedDomIndex === 0) {
        // clone terakhir di posisi awal -> loncat ke card terakhir asli (domIndex n)
        container.scrollLeft = getCardOffset(n);
        setDomActiveIndex(n);
      } else if (landedDomIndex === n + 1) {
        // clone pertama di posisi akhir -> loncat ke card pertama asli (domIndex 1)
        container.scrollLeft = getCardOffset(1);
        setDomActiveIndex(1);
      } else {
        setDomActiveIndex(landedDomIndex);
      }
    },
    [n]
  );

  const scrollToDomIndex = useCallback(
    (domIndex, duration = 600) => {
      const target = getCardOffset(domIndex);
      smoothScrollTo(target, duration, () => normalizeIfOnClone(domIndex));
    },
    [smoothScrollTo, normalizeIfOnClone]
  );

  const goToNext = useCallback(() => {
    scrollToDomIndex(domActiveIndex + 1);
  }, [domActiveIndex, scrollToDomIndex]);

  const goToPrev = useCallback(() => {
    scrollToDomIndex(domActiveIndex - 1);
  }, [domActiveIndex, scrollToDomIndex]);

  const goToRealIndex = useCallback(
    (i) => {
      scrollToDomIndex(i + 1);
    },
    [scrollToDomIndex]
  );

  useEffect(() => {
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  const getClosestDomIndex = () => {
    const container = scrollRef.current;
    if (!container) return domActiveIndex;
    const { scrollLeft, offsetLeft } = container;
    let closest = 0;
    let closestDistance = Infinity;
    Array.from(container.children).forEach((child, i) => {
      const distance = Math.abs(child.offsetLeft - offsetLeft - scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = i;
      }
    });
    return closest;
  };

  const handleScroll = () => {
    if (animationFrame.current) return; // sedang dianimasikan, biarkan
    if (isDragging.current) return; // biarkan drag handler yang urus
  };

  // === Drag handlers ===
  const handlePointerDown = (e) => {
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    isDragging.current = true;
    setDragging(true);
    startX.current = e.pageX ?? e.touches?.[0].pageX;
    scrollStart.current = scrollRef.current.scrollLeft;
    dragStartDom.current = domActiveIndex;
    scrollRef.current.style.scrollSnapType = "none";
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX ?? e.touches?.[0].pageX;
    const walk = x - startX.current;
    scrollRef.current.scrollLeft = scrollStart.current - walk;
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.scrollSnapType = "x mandatory";
    }

    const closestDom = getClosestDomIndex();
    scrollToDomIndex(closestDom, 350); // snap cepat ke card terdekat
  };

  // === Wheel / trackpad ===
  const wheelLock = useRef(false);
  const handleWheel = (e) => {
    const goingForward = e.deltaX > 0 || (e.deltaX === 0 && e.deltaY > 0);
    const goingBackward = e.deltaX < 0 || (e.deltaX === 0 && e.deltaY < 0);
    if (!goingForward && !goingBackward) return;

    e.preventDefault();
    if (wheelLock.current) return;
    wheelLock.current = true;

    if (goingForward) goToNext();
    else goToPrev();

    setTimeout(() => (wheelLock.current = false), 500);
  };

  return (
    <>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onWheel={handleWheel}
        className={`flex gap-6 overflow-x-auto px-6 py-6 
          snap-x snap-mandatory
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
        {extended.map((program, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg overflow-hidden w-72 shrink-0 snap-center"
          >
            <div className="h-40 w-full overflow-hidden pointer-events-none">
              <img
                src={program.image}
                alt={program.title}
                className="h-full w-full object-cover"
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
            onClick={() => goToRealIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === realIndex
                ? "w-6 bg-white"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </>
  );
}