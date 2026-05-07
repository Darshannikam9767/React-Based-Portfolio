import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const starRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // TITLE ANIMATION
    gsap.fromTo(
      titleRef.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // INTRO SECTION ANIMATION
    gsap.fromTo(
      introRef.current,
      {
        y: 200,
        opacity: 0,
        filter: "blur(20px)",
      },
      {
        y:0,
        opacity: 1,
        filter: "blur(0px)",
        delay:0.5,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // FLOATING STARS ANIMATION
    starRef.current.forEach((star, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      const speed = 0.5 + Math.random() * 0.5;

      gsap.to(star, {
        x: direction * (80 + index * 15),
        y: direction * (-40 - index * 10),
        rotation: direction * 360,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: speed,
        },
      });
    });

    // CLEANUP
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const addToStars = (el) => {
    if (el && !starRef.current.includes(el)) {
      starRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-b from-black to-[#9a74cf50]"
    >
      {/* FLOATING STARS */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            ref={addToStars}
            key={`star-${i}`}
            className="rounded-full absolute"
            style={{
              width: `${10 + i * 3}px`,
              height: `${10 + i * 3}px`,
              backgroundColor: "white",
              opacity: 0.2 + Math.random() * 0.4,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col justify-center">
        
        {/* TITLE */}
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-center text-white mb-16 opacity-0"
        >
          About Me
        </h1>

        {/* INTRO SECTION */}
        <div
          ref={introRef}
          className="flex md:flex-row flex-col items-center justify-between gap-10 opacity-0"
        >
          {/* TEXT */}
          <div className="max-w-3xl">
            <h3 className="text-lg md:text-3xl font-bold text-purple-200 leading-relaxed tracking-wide">
              HI, I'm Darshan, a Frontend Developer focused on speed,
              polish, and performance. I craft responsive, user-friendly
              web interfaces using modern tools like React, Tailwind CSS,
              and JavaScript. Whether it's a landing page, a full-scale
              web app, or something in between, I'm all about clean code,
              fast delivery, and seamless user experiences.
            </h3>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              className="lg:h-[40rem] md:h-[30rem] h-[22rem] object-contain mix-blend-lighten"
              src="images/person.png"
              alt="person-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;