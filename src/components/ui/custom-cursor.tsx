import { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
    variant?: 'dark' | 'light';
}

export const CustomCursor = ({ variant = 'dark' }: CustomCursorProps) => {
    const color = variant === 'light' ? '#ffffff' : '#fbbf24';
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isVisible] = useState(() =>
        typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
    );

    useEffect(() => {
        // Only enable on desktop
        if (!isVisible) return;

        const moveCursor = (e: MouseEvent) => {
            if (cursorRef.current) {
                // Direct movement for immediate (native-like) response
                cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }
        };

        const handleMouseDown = () => {
            if (cursorRef.current) {
                cursorRef.current.querySelector('svg')?.style.setProperty('transform', 'scale(0.9) rotate(-12deg)');
            }
        };

        const handleMouseUp = () => {
            if (cursorRef.current) {
                cursorRef.current.querySelector('svg')?.style.setProperty('transform', 'scale(1) rotate(-12deg)');
            }
        };

        const handleLinkHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.matches('a, button, input, select, textarea, .hoverable, [role="button"]')) {
                cursorRef.current?.classList.add('hover-active');
            }
        };

        const handleLinkLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.matches('a, button, input, select, textarea, .hoverable, [role="button"]')) {
                cursorRef.current?.classList.remove('hover-active');
            }
        };

        window.addEventListener('mousemove', moveCursor, { passive: true });
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseover', handleLinkHover, { passive: true });
        document.addEventListener('mouseout', handleLinkLeave, { passive: true });

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseover', handleLinkHover);
            document.removeEventListener('mouseout', handleLinkLeave);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] drop-shadow-lg transition-colors duration-200"
            style={{
                willChange: 'transform',
                // Offset so the tip of the arrow is at the mouse position
                marginTop: '-4px',
                marginLeft: '-4px',
                color: color // 'light' -> white, default amber-400
            }}
        >
            <style>{`
                .hover-active {
                    color: #f59e0b !important; /* amber-500 on hover */
                }
            `}</style>
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full transition-transform duration-100 ease-out"
                style={{ transform: 'rotate(-12deg)' }} // Initial rotation
            >
                <path
                    d="M5.5 3.5L11.5 21.5L14.5 13.5L22.5 10.5L5.5 3.5Z"
                    stroke="none"
                    strokeWidth="0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};
