import { useRef,useEffect } from "react"
const CustomCursor = () => {

    const cursorRef =useRef(null)
    const cursorBorderRef = useRef(null)
  return (
   <>
        <dev 
        ref={cursorRef}
        className="fixed top-0 left-0w-[20px]
        h-[20px] bg-white rounded-full 
        pointer-events-none z-[999]
        mix-blend-difference"
        />
        <div
        ref={cursorBorderRef}
        className="fixed top-0 left-0 w-[40px] h-[40px]
         border rounded-full border-white
         pointer-events-none z-[999]
         mix-blend-difference opacity-50
         "
        />
   </>
  )
}

export default CustomCursor
