import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { AnimatedText } from "@/components/ui/animated-text"

interface WorkItem {
  id: number;
  title: string;
  category: string;
  image: string;
  link?: string;
}

interface SelectedWorkProps {
  translations: {
    workItems: WorkItem[];
    workTitle: string;
    workTagline: string;
    workLatest: string;
    workExplore: string;
  };
}

export function SelectedWork({ translations: t }: SelectedWorkProps) {
  const workData = t.workItems;

  return (
    <div className="bg-white rounded-[40px] px-8 md:px-12 lg:px-16 py-16 md:py-20 text-[#1a1a1a] mx-4 md:mx-8 lg:mx-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
        <AnimatedText
          text={t.workTitle}
          className="font-['Anton',sans-serif] text-[60px] md:text-[100px] lg:text-[140px] font-normal leading-[0.85] tracking-[-0.02em] uppercase max-w-[900px] text-[#1a1a1a]"
          staggerDelay={30}
          duration={700}
        />
        <AnimatedText
          text={t.workTagline}
          className="text-right text-[13px] leading-relaxed tracking-wide max-w-[280px] pt-5 text-[#1a1a1a]"
          delay={300}
          staggerDelay={15}
          duration={500}
        />
      </div>

      {/* Section Label */}
      <div className="text-xs font-semibold tracking-[1.5px] uppercase mb-8 text-[#1a1a1a]">
        {t.workLatest}
      </div>

      {/* Work Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0">
        {workData.map((item: WorkItem, index: number) => {
          // Add back visual properties
          const gradients = [
            "from-[#1a1a1a] to-[#2a2a2a]",
            "from-[#0a3a2a] to-[#1a4a3a]",
            "from-[#2a2a3a] to-[#3a3a4a]",
            "from-[#3a2a1a] to-[#4a3a2a]"
          ];
          const activeDots = [1, 2, 3, 4];

          const CardContent = (
            <>
              {/* Image Area */}
              <div className={cn(
                "w-[calc(100%-24px)] h-[280px] md:h-[340px] bg-gradient-to-br m-3 rounded-2xl overflow-hidden",
                gradients[index % gradients.length]
              )}>
                {item.image && (
                  <img src={item.image} alt={item.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                )}
              </div>

              {/* Footer */}
              <div className="px-6 md:px-8 py-3 md:py-4 flex justify-between items-center bg-[#1a1a1a] rounded-b-[20px]">
                <div className="flex items-center gap-4">
                  {/* Status Dots */}
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((dotNum) => (
                      <div
                        key={dotNum}
                        className={cn(
                          "w-2.5 h-2.5 rounded-full",
                          dotNum <= activeDots[index % activeDots.length] ? "bg-[#00ff00]" : "bg-[#666]"
                        )}
                      />
                    ))}
                  </div>
                  {/* Details */}
                  <div>
                    <h3 className="text-base font-semibold text-white mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#ccc]">
                      {item.category}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold tracking-[1px] uppercase text-white hover:opacity-70 transition-opacity">
                  {t.workExplore}
                </span>
              </div>
            </>
          );

          // If item has a link, wrap in Link component
          if (item.link) {
            return (
              <Link
                key={item.id}
                to={item.link}
                className={cn(
                  "bg-[#1a1a1a] rounded-3xl border-[4px] border-white block",
                  "transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
                )}
              >
                {CardContent}
              </Link>
            );
          }

          return (
            <div
              key={item.id}
              className={cn(
                "bg-[#1a1a1a] rounded-3xl border-[4px] border-white",
                "transition-transform duration-300 hover:-translate-y-2"
              )}
            >
              {CardContent}
            </div>
          );
        })}
      </div>
    </div>
  )
}
