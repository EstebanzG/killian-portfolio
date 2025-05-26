import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Header() {
  const container = useRef<HTMLDivElement>(null);
  const div = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!div.current || !container.current) return;

    gsap.fromTo(
      div.current,
      { scale: 1 },
      {
        scale: 1.4,
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        transformOrigin: "center center",
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div className="h-[200vh] pb-[25dvh]" ref={container}>
      <div
        ref={div}
        className="sticky top-[7.5dvh] border h-[85dvh] w-auto aspect-[1/2] sm:aspect-[3/2]"
      >
        <img src="/images/portrait.png" alt="background" className="w-full h-full object-cover" />

        <header className="absolute top-0 left-0 w-full h-full z-10 text-white text-4xl md:text-6xl lg:text-8xl 2xl:text-9xl font-bold blur-[1px] title-animation">
          <h1 className="absolute left-[3%] lg:left-[14%] top-[12%] lg:top-[10%]">KILLIAN</h1>
          <h1 className="absolute right-[5%] lg:right-[10%] top-[17%] lg:top-[22%]">GOMEZ</h1>
        </header>

        <img
          src="/images/portrait-cutout.png"
          alt="portrait of Killian GOMEZ"
          className="absolute top-0 left-0 z-10 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
