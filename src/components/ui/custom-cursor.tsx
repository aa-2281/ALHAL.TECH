import { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorOutlineRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only enable on desktop
        const mediaQuery = window.matchMedia("(min-width: 768px)");
        if (!mediaQuery.matches) return;

        setIsVisible(true);

        const onMouseMove = (e: MouseEvent) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            if (cursorDotRef.current) {
                cursorDotRef.current.style.left = `${posX}px`;
                cursorDotRef.current.style.top = `${posY}px`;
            }

            // Outline follows with lag using animate for smooth performance
            if (cursorOutlineRef.current) {
                cursorOutlineRef.current.animate({
                    left: `${posX}px`,
                    top: `${posY}px`
                }, { duration: 500, fill: "forwards" });
            }
        };

        const onMouseEnter = () => document.body.classList.add('hovering');
        const onMouseLeave = () => document.body.classList.remove('hovering');

        window.addEventListener('mousemove', onMouseMove);

        // Add hover effect listeners to interactive elements
        const addHoverListeners = () => {
            document.querySelectorAll('a, button, input, select, textarea, .hoverable').forEach(el => {
                el.addEventListener('mouseenter', onMouseEnter);
                el.addEventListener('mouseleave', onMouseLeave);
            });
        };

        addHoverListeners();

        // Re-add listeners if DOM changes (simple observer for this use case)
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            observer.disconnect();
            document.querySelectorAll('a, button, input, select, textarea, .hoverable').forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnter);
                el.removeEventListener('mouseleave', onMouseLeave);
            });
            document.body.classList.remove('hovering');
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-brand-cyan rounded-full z-[9999] pointer-events-none shadow-[0_0_10px_var(--brand-cyan)] custom-cursor-dot"
            />
            <div
                ref={cursorOutlineRef}
                className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border border-black/50 rounded-full z-[9999] pointer-events-none transition-[width,height,background-color] duration-200 custom-cursor-outline"
            />
        </>
    );
};
