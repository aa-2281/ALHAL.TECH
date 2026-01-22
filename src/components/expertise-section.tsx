import { cn } from "@/lib/utils"
import { AnimatedText } from "@/components/ui/animated-text"

interface ExpertiseSectionProps {
  translations: any;
}

export function ExpertiseSection({ translations: t }: ExpertiseSectionProps) {
  const expertiseData = t.expertiseItems;

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#e8e4df] px-6 md:px-12 lg:px-20 py-16 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section - Left aligned */}
        <div className="max-w-[900px] mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start mb-12">
            <div className="flex-1">
              <AnimatedText
                text={t.expertiseTitle}
                className="font-['Anton',sans-serif] text-[52px] md:text-[68px] lg:text-[84px] font-normal leading-[1em] tracking-[0em] uppercase"
                staggerDelay={40}
                duration={800}
              />
            </div>
          </div>
        </div>

        {/* Tagline - Right aligned */}
        <div className="flex justify-end mb-8">
          <AnimatedText
            text={t.expertiseTagline}
            className="text-right text-[12px] leading-relaxed tracking-wide max-w-[300px]"
            delay={500}
            staggerDelay={20}
            duration={600}
          />
        </div>

        {/* Section Divider - Full width */}
        <div className="w-full h-px bg-[#e8e4df] mb-6" />

        {/* Labels + List - Right aligned */}
        <div className="w-full max-w-[900px] ml-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold tracking-[1px] uppercase">
              {t.expertiseLabel}
            </span>
            <span className="text-sm font-semibold tracking-[1px] uppercase">
              {t.expertiseField}
            </span>
          </div>

          <ul className="list-none">
            {expertiseData.map((item: any, index: number) => (
              <li
                key={index}
                className={cn(
                  "flex items-center py-6 border-b border-[#3a3a3a]",
                  "hover:bg-[#2a2a2a]/30 transition-colors duration-300"
                )}
              >
                <span className="w-[60px] md:w-[80px] text-[15px] font-medium">
                  {item.number}
                </span>
                <span className="flex-1 text-base md:text-lg font-normal">
                  {item.name}
                </span>
                <div className="w-8 h-8 bg-[#e8e4df] rounded-full flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-[#1a1a1a] rounded-full" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
