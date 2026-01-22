import { useEffect, useRef } from 'react';

// Spatial Grid for O(n) particle lookups instead of O(n²)
class SpatialGrid {
    private cellSize: number;
    private grid: Map<string, Particle[]>;

    constructor(cellSize: number = 100) {
        this.cellSize = cellSize;
        this.grid = new Map();
    }

    private getKey(x: number, y: number): string {
        const col = Math.floor(x / this.cellSize);
        const row = Math.floor(y / this.cellSize);
        return `${col},${row}`;
    }

    clear() {
        this.grid.clear();
    }

    insert(particle: Particle) {
        const key = this.getKey(particle.x, particle.y);
        if (!this.grid.has(key)) {
            this.grid.set(key, []);
        }
        this.grid.get(key)!.push(particle);
    }

    getNearby(particle: Particle, distance: number): Particle[] {
        const nearby: Particle[] = [];
        const cells = Math.ceil(distance / this.cellSize);
        const centerCol = Math.floor(particle.x / this.cellSize);
        const centerRow = Math.floor(particle.y / this.cellSize);

        for (let dx = -cells; dx <= cells; dx++) {
            for (let dy = -cells; dy <= cells; dy++) {
                const key = `${centerCol + dx},${centerRow + dy}`;
                if (this.grid.has(key)) {
                    nearby.push(...this.grid.get(key)!);
                }
            }
        }
        return nearby;
    }
}

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

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let animationFrameId: number;
        const particles: Particle[] = [];
        const spatialGrid = new SpatialGrid(100);

        // Resize Canvas
        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            // Update particle bounds
            particles.forEach(p => p.updateDimensions(width, height));
        };
        window.addEventListener('resize', resize);
        resize();

        // Init Particles
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle(width, height, ctx));
        }

        // Mouse position (stored in ref-like object for performance)
        const mouse = { x: -1000, y: -1000 };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

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

        // Animation Loop
        const animate = () => {
            // Skip rendering if not visible (0% CPU when off-screen)
            if (!isVisibleRef.current) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            ctx.clearRect(0, 0, width, height);

            // Rebuild spatial grid
            spatialGrid.clear();

            // Update and draw all particles, insert into grid
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.update();
                p.draw();
                spatialGrid.insert(p);
            }

            // Draw mouse connections
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < MOUSE_DISTANCE) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 0, 0, ${MOUSE_CONNECTION_OPACITY * (1 - distance / MOUSE_DISTANCE)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }

            // O(n) particle connections using spatial grid
            const processed = new Set<string>();

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const nearby = spatialGrid.getNearby(p, PARTICLE_DISTANCE);

                for (let j = 0; j < nearby.length; j++) {
                    const p2 = nearby[j];
                    if (p === p2) continue;

                    // Create unique pair key to avoid duplicate lines
                    const pairKey = p.x < p2.x || (p.x === p2.x && p.y < p2.y)
                        ? `${p.x},${p.y}-${p2.x},${p2.y}`
                        : `${p2.x},${p2.y}-${p.x},${p.y}`;

                    if (processed.has(pairKey)) continue;

                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < PARTICLE_DISTANCE) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 0, 0, ${PARTICLE_CONNECTION_OPACITY * (1 - dist / PARTICLE_DISTANCE)})`;
                        ctx.lineWidth = 0.2;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                        processed.add(pairKey);
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
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
