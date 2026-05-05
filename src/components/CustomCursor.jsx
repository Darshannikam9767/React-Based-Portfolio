import { useRef, useEffect } from "react"
import { gsap } from "gsap" // Changed to "gsap" for standard imports

const CustomCursor = () => {
    const cursorRef = useRef(null)
    const cursorBorderRef = useRef(null)

    // Move this logic below the Hook declarations to follow React rules
    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches

    useEffect(() => {
        if (isMobile) return

        const cursor = cursorRef.current
        const cursorBorder = cursorBorderRef.current

        // Fix: Changed [cursor, cursor] to [cursor, cursorBorder]
        gsap.set([cursor, cursorBorder], {
            xPercent: -50,
            yPercent: -50,
        })

        const xTo = gsap.quickTo(cursor, "x", {
            duration: 0.2,
            ease: "power3.out"
        })

        const yTo = gsap.quickTo(cursor, "y", {
            duration: 0.2,
            ease: "power3.out"
        })

        const xToBorder = gsap.quickTo(cursorBorder, "x", {
            duration: 0.5,
            ease: "power.out" // Fix: changed "power.out" to "power3.out"
        })

        const yToBorder = gsap.quickTo(cursorBorder, "y", {
            duration: 0.5,
            ease: "power3.out"
        })

        const mouseMove = (e) => {
            xTo(e.clientX)
            yTo(e.clientY)
            xToBorder(e.clientX)
            yToBorder(e.clientY)
        }

        window.addEventListener("mousemove", mouseMove)
        document.addEventListener("mousedown",()=>{
            gsap.to([cursor,cursorBorder],{
                scale:0.6,
                duration:0.2
            })
        })

        document.addEventListener("mouseup",()=>{
            gsap.to([cursor,cursorBorder],{
                scale:1,
                duration:0.2
            })
        })
        return () => {
            window.removeEventListener("mousemove", mouseMove)
        }
    }, [isMobile])

    if (isMobile) {
        return null
    }

    return (
        <>
            {/* Main Cursor Dot */}
            <div 
                ref={cursorRef}
                className="fixed top-0 left-0 w-[30px] h-[30px] bg-white rounded-full pointer-events-none z-[999] mix-blend-difference"
            />
            
            {/* Cursor Border */}
            <div
                ref={cursorBorderRef}
                className="fixed top-0 left-0 w-[50px] h-[50px] border rounded-full border-white pointer-events-none z-[999] mix-blend-difference opacity-50"
            />
        </>
    )
}

export default CustomCursor