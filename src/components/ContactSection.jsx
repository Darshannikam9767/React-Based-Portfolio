import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const ContactSection = () => {
    const sectionRef = useRef(null)
    const circleRef = useRef(null)
    const initialTextRef = useRef(null)
    const finalTextRef = useRef(null)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=200%", // This creates the 200vh of "virtual" scroll space
                    pin: true,
                    scrub: 1, // Smooth scrub
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            })

            // Initial setup
            gsap.set(finalTextRef.current, { opacity: 0, y: 30 })

            // The Animation Sequence
            tl.to(circleRef.current, {
                scale: 25,
                backgroundColor: "#e9d5ff",
                ease: "power2.inOut",
                duration: 1
            })
            .to(initialTextRef.current, {
                opacity: 0,
                duration: 0.2
            }, 0) // Starts at beginning
            .to(finalTextRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.4
            }, 0.6) // Fades in toward the end of the circle growth

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden"
        >
            {/* The scaling circle */}
            <div
                ref={circleRef}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center 
                           bg-gradient-to-r from-violet-400 to-pink-100 relative z-0"
            >
                {/* Initial Text */}
                <p
                    ref={initialTextRef}
                    className="text-black font-bold lg:text-2xl text-center uppercase tracking-widest text-sm pointer-events-none"
                >
                    Scroll <br /> Down
                </p>
            </div>

            {/* Content Overlay */}
            <div 
                ref={finalTextRef}
                className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-6"
            >
                <div className="text-center pointer-events-auto max-w-4xl">
                    <h1 className="text-black font-bold text-4xl md:text-7xl leading-tight mb-6">
                        Step Into the Future with Darshan
                    </h1>
                    <p className="text-black/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                        Front-end developer specialized in crafting modern, 
                        responsive web interfaces using React, Tailwind CSS, 
                        and advanced UI animation.
                    </p>
                    <button className="px-10 py-4 rounded-2xl bg-black text-white font-bold hover:scale-110 transition-transform cursor-pointer">
                        Contact Me
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ContactSection