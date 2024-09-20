import { useState, useEffect, useRef } from "react";

const useElementInView = (options) => {
    const [isInView, setIsInView] = useState(false)
    const targetRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries
            setIsInView(entry.isIntersecting)
        }, options)

        if (targetRef.current) {
            observer.observe(targetRef.current)
        }

        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current)
            }
        }
    }, [])
    return [targetRef, isInView ]
}

export default useElementInView