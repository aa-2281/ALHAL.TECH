import { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
    variant?: 'dark' | 'light';
}

export const CustomCursor = ({ variant = 'dark' }: CustomCursorProps) => {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorOutlineRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Store mouse position in ref for RAF access
    const mousePos = useRef({ x: 0, y: 0 });
    const rafId = useRef<number | null>(null);

    useEffect(() => {
        // Only enable on desktop
        const mediaQuery = window.matchMedia("(min-width: 768px)");
        if (!mediaQuery.matches) return;

        setIsVisible(true);

        // RAF-based cursor update loop
        const updateCursor = () => {
            const { x, y } = mousePos.current;

            // Use transform: translate3d for GPU acceleration
            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform =
                    `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
            }

            // Smooth follow for outline using animate API
            if (cursorOutlineRef.current) {
                cursorOutlineRef.current.animate(
                    {
                        transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
                    },
                    { duration: 500, fill: "forwards" }
                );
            }

            rafId.current = requestAnimationFrame(updateCursor);
        };

        // Simple mousemove - just updates position ref (no DOM work)
        const onMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        const onMouseEnter = () => document.body.classList.add('hovering');
        const onMouseLeave = () => document.body.classList.remove('hovering');

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        rafId.current = requestAnimationFrame(updateCursor);

        // Add hover effect listeners to interactive elements
        const addHoverListeners = () => {
            document.querySelectorAll('a, button, input, select, textarea, .hoverable').forEach(el => {
                el.addEventListener('mouseenter', onMouseEnter);
                el.addEventListener('mouseleave', onMouseLeave);
            });
        };

        addHoverListeners();

        // Debounced MutationObserver (100ms debounce)
        let mutationTimeout: number;
        const observer = new MutationObserver(() => {
            clearTimeout(mutationTimeout);
            mutationTimeout = window.setTimeout(addHoverListeners, 100);
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
            clearTimeout(mutationTimeout);
            observer.disconnect();
            document.querySelectorAll('a, button, input, select, textarea, .hoverable').forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnter);
                el.removeEventListener('mouseleave', onMouseLeave);
            });
            document.body.classList.remove('hovering');
        };
    }, []);

    if (!isVisible) return null;

    const outlineColor = variant === 'light' ? 'border-white/50' : 'border-black/50';
    const dotColor = variant === 'light' ? 'bg-white' : 'bg-brand-cyan';
    const dotShadow = variant === 'light' ? 'shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'shadow-[0_0_10px_var(--brand-cyan)]';

    return (
        <>
            <div
                ref={cursorDotRef}
                className={`fixed left-0 top-0 w-2 h-2 ${dotColor} rounded-full z-[9999] pointer-events-none ${dotShadow} custom-cursor-dot`}
                style={{ willChange: 'transform' }}
            />
            <div
                ref={cursorOutlineRef}
                className={`fixed left-0 top-0 w-10 h-10 border ${outlineColor} rounded-full z-[9999] pointer-events-none transition-[width,height,background-color] duration-200 custom-cursor-outline`}
                style={{ willChange: 'transform' }}
            />
        </>
    );
};
