import React, { useLayoutEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface StackCardProps {
  className?: string;
  children: ReactNode;
}

export const StackCard: React.FC<StackCardProps> = ({ children, className = '' }) => (
  <div
    className={`stack-card w-[min(90vw,1200px)] min-h-[400px] md:min-h-[25vw] flex justify-center items-center bg-white rounded-2xl shadow-[0_-16px_24px_rgba(0,0,0,0.15)] origin-top ${className}`.trim()}
  >
    {children}
  </div>
);

interface StackCardsProps {
  className?: string;
  children: ReactNode;
  scaleStep?: number;
  stackGap?: number;
}

const StackCards: React.FC<StackCardsProps> = ({
  children,
  className = '',
  scaleStep = 0.03,
  stackGap = 40
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>('.stack-card');
    const triggers: ScrollTrigger[] = [];

    cards.forEach((card, index) => {
      const isLast = index + 1 === cards.length;
      const targetScale = 1 - scaleStep * (cards.length - index - 1);
      const marginOffset = -(card.offsetHeight - stackGap);

      const tween = gsap.to(card, {
        scale: targetScale,
        marginBottom: marginOffset,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top 20%',
          end: isLast ? 'top 25%' : 'bottom 20%',
          scrub: 0.5,
          pin: container,
          pinSpacing: false
        }
      });

      if (tween.scrollTrigger) {
        triggers.push(tween.scrollTrigger);
      }
    });

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, [scaleStep, stackGap, children]);

  return (
    <section
      ref={containerRef}
      className={`stack flex flex-col items-center ${className}`.trim()}
    >
      {children}
    </section>
  );
};

export default StackCards;
