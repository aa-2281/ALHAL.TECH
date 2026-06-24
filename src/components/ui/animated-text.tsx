import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

interface AnimatedTextProps {
    text: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
    duration?: number;
}

export function AnimatedText({
    text,
    className = '',
    delay = 0,
    staggerDelay = 50,
    duration = 750
}: AnimatedTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    // Check if text contains Arabic characters
    const isArabic = (text: string) => /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text);
    const hasArabicText = isArabic(text);

    // Reset animation flag when text changes (e.g., language switch)
    useEffect(() => {
        hasAnimated.current = false;
    }, [text]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || hasAnimated.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated.current) {
                        hasAnimated.current = true;

                        const letters = container.querySelectorAll('.animated-letter');

                        animate(letters, {
                            translateY: ['1.2em', 0],
                            opacity: [0, 1],
                            duration: duration,
                            delay: stagger(staggerDelay, { start: delay }),
                            easing: 'easeOutExpo'
                        });

                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.2 }
        );

        observer.observe(container);

        return () => observer.disconnect();
    }, [text, delay, staggerDelay, duration]);

    // Split text into lines, then words, then letters (or keep whole words for Arabic)
    const lines = text.split('\n');

    return (
        <div ref={containerRef} className={className}>
            {lines.map((line, lineIndex) => (
                <div
                    key={lineIndex}
                    className={hasArabicText ? "overflow-hidden pb-4 pt-2" : "overflow-hidden"}
                    style={hasArabicText ? { clipPath: 'inset(0 0 -10px 0)' } : undefined}
                >
                    <div className="flex flex-wrap">
                        {line.split(' ').map((word, wordIndex) => (
                            <span key={wordIndex} className="inline-flex mr-[0.3em]">
                                {hasArabicText ? (
                                    // For Arabic text, animate the whole word to preserve letter connections
                                    <span
                                        className="animated-letter inline-block opacity-0"
                                        style={{ transform: 'translateY(1.2em)' }}
                                    >
                                        {word}
                                    </span>
                                ) : (
                                    // For non-Arabic text, animate letter by letter
                                    word.split('').map((letter, letterIndex) => (
                                        <span
                                            key={letterIndex}
                                            className="animated-letter inline-block opacity-0"
                                            style={{ transform: 'translateY(1.2em)' }}
                                        >
                                            {letter}
                                        </span>
                                    ))
                                )}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
