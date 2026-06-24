import { useEffect, useRef } from 'react';

// Particle class defined outside component to avoid recreation
class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    private width: number;
    private height: number;
    private ctx: CanvasRenderingContext2D;

    constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 0.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > this.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.height) this.vy *= -1;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = '#000000';
        this.ctx.fill();
    }

    updateDimensions(width: number, height: number) {
        this.width = width;
        this.height = height;
        // Keep particle within bounds
        if (this.x > width) this.x = width;
        if (this.y > height) this.y = height;
    }
}

export const CanvasBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isVisibleRef = useRef(true);
    const isScrollingRef = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let animationFrameId: number;
        const particles: Particle[] = [];

        // Resize Canvas
        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles.forEach(p => p.updateDimensions(width, height));
        };
        window.addEventListener('resize', resize);
        resize();

        // Reduced particle count for better performance (35 instead of 50)
        const PARTICLE_COUNT = 35;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle(width, height, ctx));
        }

        // Mouse position
        const mouse = { x: -1000, y: -1000 };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        // Pause during scroll for better performance
        let scrollTimeout: number;
        const handleScroll = () => {
            isScrollingRef.current = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = window.setTimeout(() => {
                isScrollingRef.current = false;
            }, 150);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        // IntersectionObserver to pause when off-screen
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisibleRef.current = entry.isIntersecting;
            },
            { threshold: 0 }
        );
        observer.observe(canvas);

        // Configuration
        const MOUSE_CONNECTION_OPACITY = 0.8;
        const PARTICLE_CONNECTION_OPACITY = 0.2;
        const MOUSE_DISTANCE = 200;
        const PARTICLE_DISTANCE = 100;
        const PARTICLE_DISTANCE_SQ = PARTICLE_DISTANCE * PARTICLE_DISTANCE;
        const MOUSE_DISTANCE_SQ = MOUSE_DISTANCE * MOUSE_DISTANCE;

        // Animation Loop
        const animate = () => {
            // Skip rendering if not visible or scrolling
            if (!isVisibleRef.current || isScrollingRef.current) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            ctx.clearRect(0, 0, width, height);

            // Update and draw all particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            // Draw mouse connections
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < MOUSE_DISTANCE_SQ) {
                    const distance = Math.sqrt(distSq);
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 0, 0, ${MOUSE_CONNECTION_OPACITY * (1 - distance / MOUSE_DISTANCE)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }

            // Simplified particle connections - use index comparison instead of string keys
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < PARTICLE_DISTANCE_SQ) {
                        const dist = Math.sqrt(distSq);
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 0, 0, ${PARTICLE_CONNECTION_OPACITY * (1 - dist / PARTICLE_DISTANCE)})`;
                        ctx.lineWidth = 0.2;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[5] pointer-events-none opacity-70"
        />
    );
};
