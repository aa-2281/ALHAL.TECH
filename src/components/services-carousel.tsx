"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";


interface ServiceData {
    id: number;
    title: string;
    description: string;
    gradient: string;
    image: string;
}

interface ServicesCarouselProps {
    translations: {
        label: string;
        title1: string;
        title2: string;
        learnMore: string;
        solutions: string;
    };
    services: ServiceData[];
}

export function ServicesCarousel({ translations, services }: ServicesCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 400; // Approx card width + gap
            const newScrollLeft = direction === "left"
                ? scrollRef.current.scrollLeft - scrollAmount
                : scrollRef.current.scrollLeft + scrollAmount;

            scrollRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="w-full py-10">
            <div className="container max-w-7xl mx-auto px-4 mb-12 flex flex-col md:flex-row items-end md:items-center justify-between gap-6">
                <div className="max-w-2xl">
                    <span className="text-brand-cyan font-semibold text-sm uppercase tracking-wider mb-2 block">{translations.label}</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        {translations.title1}<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-red">{translations.title2}</span>
                    </h2>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={`p-3 rounded-full border border-white/10 transition-all ${canScrollLeft ? "bg-white/5 hover:bg-white/10 text-white" : "opacity-30 cursor-not-allowed text-gray-500"}`}
                    >
                        <LucideChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className={`p-3 rounded-full border border-white/10 transition-all ${canScrollRight ? "bg-white/5 hover:bg-white/10 text-white" : "opacity-30 cursor-not-allowed text-gray-500"}`}
                    >
                        <LucideChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Carousel Container */}
            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex overflow-x-auto gap-6 px-4 md:px-8 pb-12 snap-x snap-mandatory scrollbar-hide no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {/* Spacer for left padding */}
                <div className="w-0 md:w-4 flex-shrink-0" />

                {services.map((service) => (
                    <motion.div
                        key={service.id}
                        className="flex-shrink-0 w-[300px] md:w-[360px] snap-center group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: service.id * 0.1 }}
                    >
                        {/* Visual Container (Image/Icon wrapper) */}
                        <div className="h-[400px] w-full relative overflow-hidden rounded-3xl mb-6 bg-brand-navy/50">
                            {/* Background Image with Zoom Effect */}
                            <img
                                src={service.image}
                                alt={service.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Dark Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20" />

                            {/* Title INSIDE Visual (Top Left) */}
                            <div className="absolute top-6 left-6 z-10 pr-6">
                                <h3 className="text-2xl font-bold text-white leading-tight">{service.title}</h3>
                            </div>

                            {/* Optional: Blurry backdrop for icon or text readability if needed */}
                            {/* <div className="absolute inset-0 backdrop-blur-[1px] group-hover:backdrop-blur-none transition-all duration-500" /> */}
                        </div>

                        {/* Content BELOW Visual */}
                        <div className="px-2">
                            <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-brand-cyan transition-colors">{service.title}</h4>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                {service.description}
                            </p>
                        </div>
                    </motion.div>
                ))}

                {/* Spacer for right padding */}
                <div className="w-4 md:w-8 flex-shrink-0" />
            </div>
        </div>
    );
}
