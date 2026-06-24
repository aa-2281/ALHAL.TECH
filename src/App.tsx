import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { CanvasBackground } from "@/components/ui/canvas-background"
import { CustomCursor } from "@/components/ui/custom-cursor"
import { SelectedWork } from "@/components/selected-work"
import { ExpertiseSection } from "@/components/expertise-section"

import PixelatedHero from "@/components/PixelatedHero"
import StickyNavbar from "@/components/StickyNavbar"
import Footer from "@/components/Footer"
import { AnimatedText } from "@/components/ui/animated-text"
import { usePageMeta } from '@/hooks/usePageMeta'
import { LucideSend } from "lucide-react"
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
// SVG imports removed. Using absolute paths from public folder.


// --- DATA ---

const translations = {
  en: {
    logoPart1: "ALHAL", logoPart2: "TECH",
    navServices: "Services", navWhy: "Why Us", navPortfolio: "Portfolio", navAbout: "About Us", navContact: "Let's Talk",
    heroBadge: "Accepting New Projects",
    heroTitlePart1: "Smart Solutions,", heroTitlePart2: "Real Results",
    heroSubtitle: "Apps, AI, and automation — everything your business needs to thrive in the digital age.",
    heroCTA: "Contact Us", heroSecondCTA: "Explore Services",
    heroPhase1Title: "Smart Solutions,",
    heroPhase1Subtitle: "for your business.",
    heroPhase1Desc: "Apps, AI, and automation — everything your business needs to thrive in the digital age.",
    heroPhase2Title: "AI Automation",
    heroPhase2Subtitle: "systems, and more...",
    heroPhase2Prefix: "with",
    heroPhase2Brand: "ALHAL TECH",
    heroPhase2Desc: "Streamline your workflow with intelligent automation powered by cutting-edge AI.",
    servicesLabel: "What We Do", servicesTitle: "Our Ecosystem", servicesSubtitle: "A complete suite of digital services designed to scale with your ambition.", viewAllServices: "View full details",
    carouselLabel: "Our Solutions", carouselTitle1: "Comprehensive Digital", carouselTitle2: "Protection & Growth", carouselLearnMore: "Learn more",
    whyUsLabel: "Why Choose Us", whyUsTitle: "Why visionary companies choose Al Hal Tech",
    statsProjects: "Total Projects", statsSatisfaction: "Client Satisfaction", statsSupport: "Support", statsSecurity: "Security", statsClients: "Clients", statsYears: "Years",
    portfolioLabel: "Our Work", portfolioTitle: "Featured Projects", portfolioSubtitle: "Transforming ideas into digital reality. Here's a glimpse of our recent work.", portfolioViewAll: "View All Projects",
    testimonialsLabel: "Testimonials", testimonialsTitle: "What Our Clients Say",
    finalCtaTitle: "Ready to disrupt the market?", finalCtaSubtitle: "Let's build technology that sets you apart. Schedule your free strategy session today.", finalCtaButton: "Launch Project",
    contactLabel: "Get in Touch",
    footerServices: "Services", footerCompany: "Company", footerSocial: "Connect",
    footerWebDev: "Web Development", footerMobile: "Mobile Applications", footerAutomation: "Automation", footerAI: "AI Solutions",
    footerAbout: "About Us", footerServicesLink: "Services", footerCareers: "Careers", footerContact: "Contact",
    footerCopyright: "© 2025 Al Hal Tech. All rights reserved.", footerPrivacy: "Privacy Policy", footerTerms: "Terms of Service",
    sec2Title1: "Your Idea.", sec2Title2: "Our Expertise.",
    expertiseTitle: "HOW\nCAN WE\nHELP YOUR BUSINESS",
    expertiseTagline: "TAILORED SOLUTIONS DESIGNED TO ELEVATE YOUR BRAND AND DRIVE RESULTS",
    expertiseLabel: "EXPERTISE",
    expertiseField: "FIELD",
    expertiseItems: [
      { number: "01", name: "Website Design & Development" },
      { number: "02", name: "AI Automations" },
      { number: "03", name: "Brand Identity Design" },
      { number: "08", name: "Mobile App Development" },
      { number: "09", name: "Hosting & Deployment" },
    ],
    workTitle: "SELECTED WORK",
    workTagline: "IMPACTFUL SOLUTIONS THAT\nSTAND OUT,\nCAPTURE ATTENTION,\nAND DRIVE MEASURABLE SUCCESS",
    workLatest: "LATEST WORK",
    workExplore: "EXPLORE",
    workItems: [
      { id: 1, title: "Automation Solution", category: "AI & Workflow", image: "/card1.webp", link: "/portfolio/automation" },
      { id: 2, title: "Web Design", category: "Development", image: "/card2.webp", link: "/portfolio/web-design" },
      { id: 3, title: "App Development", category: "Mobile", image: "/card3.webp", link: "/portfolio/app-development" },
      { id: 4, title: "Custom Software", category: "Enterprise", image: "/card4.webp", link: "/portfolio/custom-software" },
    ],
    stackTitle: "Unblock the potential\nof your business\nwith AI Automation",
    sec2Subtitle: "We turn your vision into reality with cutting-edge technology and proven expertise.",
    sec2Badge1: "Speed & Innovation", sec2Heading1: "Launch Faster, Scale Smarter",
    sec2Desc1: "Our agile development process turns weeks into days. We build MVPs that validate your idea quickly, then scale with enterprise-grade architecture as you grow.",
    sec2Check1a: "Rapid prototyping & MVPs", sec2Check1b: "Cloud-native from day one", sec2Check1c: "Continuous deployment pipelines",
    sec2Badge2: "Security & Trust", sec2Heading2: "Protected at Every Layer",
    sec2Desc2: "Bank-grade encryption, secure APIs, and compliance-ready systems. Your users' data is protected with the same standards trusted by Fortune 500 companies.",
    sec2Check2a: "End-to-end encryption", sec2Check2b: "Regular security audits", sec2Check2c: "GDPR & SOC2 ready",
    svc1Title: "Mobile App Development", svc1Desc: "Native and cross-platform mobile apps designed for engagement and performance on iOS and Android.",
    svc2Title: "Web Platform Solutions", svc2Desc: "Scalable, secure, and high-performance web applications built with the latest reactive technologies.",
    svc3Title: "Business Automation", svc3Desc: "Streamline operations with n8n & Make.com workflows to solve complex business issues and save time.",
    svc4Title: "AI & Machine Learning", svc4Desc: "Intelligent automation and predictive analytics to drive data-backed decision making.",
    svc5Title: "Custom Software Dev", svc5Desc: "Tailor-made software solutions to address your unique business challenges and workflows."
  },
  ar: {
    logoPart1: "ALHAL", logoPart2: "TECH",
    navServices: "خدماتنا", navWhy: "لماذا نحن", navPortfolio: "أعمالنا", navAbout: "من نحن", navContact: "تواصل معنا",
    heroBadge: "نستقبل مشاريع جديدة",
    heroTitlePart1: "حلول ذكية،", heroTitlePart2: "نتائج حقيقية",
    heroSubtitle: "تطبيقات، ذكاء اصطناعي، وأتمتة — كل ما يحتاجه عملك للنجاح في العصر الرقمي.",
    heroCTA: "ابدأ مشروعك", heroSecondCTA: "استكشف الخدمات",
    heroPhase1Title: "حلول ذكية",
    heroPhase1Subtitle: "لمشروعك.",
    heroPhase1Desc: "تطبيقات، ذكاء اصطناعي، وأتمتة — كل ما تحتاجه شركتك للنجاح في العصر الرقمي.",
    heroPhase2Title: "أتمتة الذكاء الاصطناعي",
    heroPhase2Subtitle: "والأنظمة، والمزيد...",
    heroPhase2Prefix: "مع",
    heroPhase2Brand: "الحل التقني",
    heroPhase2Desc: "قم بتبسيط سير عملك باستخدام الأتمتة الذكية المدعومة بأحدث تقنيات الذكاء الاصطناعي.",
    servicesLabel: "ماذا نقدم", servicesTitle: "نظامنا البيئي", servicesSubtitle: "مجموعة كاملة من الخدمات الرقمية المصممة لتنمو مع طموحك.", viewAllServices: "عرض التفاصيل",
    carouselLabel: "حلولنا", carouselTitle1: "حماية رقمية شاملة", carouselTitle2: "ونمو مستدام", carouselLearnMore: "اعرف المزيد",
    whyUsLabel: "لماذا تختارنا", whyUsTitle: "لماذا تختار الشركات الرائدة الحل التقني",
    statsProjects: "إجمالي المشاريع", statsSatisfaction: "رضا العملاء", statsSupport: "دعم فني", statsSecurity: "أمان", statsClients: "عميل", statsYears: "سنوات خبرة",
    portfolioLabel: "أعمالنا", portfolioTitle: "مشاريع مميزة", portfolioSubtitle: "نحول الأفكار إلى واقع رقمي. إليك لمحة عن أحدث أعمالنا.", portfolioViewAll: "عرض كل المشاريع",
    testimonialsLabel: "آراء العملاء", testimonialsTitle: "ماذا يقول عملاؤنا",
    finalCtaTitle: "جاهز لاكتساح السوق؟", finalCtaSubtitle: "دعنا نبني التكنولوجيا التي تميزك. حدد موعدًا لاستشارتك المجانية اليوم.", finalCtaButton: "أطلق مشروعك",
    contactLabel: "تواصل معنا",
    footerServices: "الخدمات", footerCompany: "الشركة", footerSocial: "تواصل",
    footerWebDev: "تطوير الويب", footerMobile: "تطبيقات الجوال", footerAutomation: "الأتمتة", footerAI: "حلول الذكاء الاصطناعي",
    footerAbout: "من نحن", footerServicesLink: "الخدمات", footerCareers: "الوظائف", footerContact: "تواصل معنا",
    footerCopyright: "© 2025 الحل التقني. جميع الحقوق محفوظة.", footerPrivacy: "سياسة الخصوصية", footerTerms: "شروط الاستخدام",
    sec2Title1: "فكرتك.", sec2Title2: "خبرتنا.",
    expertiseTitle: "كيف يمكننا\nمساعدة\nعملك التجاري",
    expertiseTagline: "حلول مصممة خصيصاً لرفع قيمة علامتك التجارية وتحقيق النتائج",
    expertiseLabel: "الخبرات",
    expertiseField: "المجال",
    expertiseItems: [
      { number: "01", name: "تصميم وتطوير المواقع" },
      { number: "02", name: "أتمتة الذكاء الاصطناعي" },
      { number: "03", name: "تصميم الهوية التجارية" },
      { number: "08", name: "تطوير تطبيقات الجوال" },
      { number: "09", name: "الاستضافة والنشر" },
    ],
    workTitle: "أعمال مختارة",
    workTagline: "حلول مؤثرة\nتتميز،\nتجذب الانتباه،\nوتحقق نجاحاً ملموساً",
    workLatest: "أحدث الأعمال",
    workExplore: "استكشف",
    workItems: [
      { id: 1, title: "حلول الأتمتة", category: "ذكاء اصطناعي", image: "/card1.webp", link: "/portfolio/automation" },
      { id: 2, title: "تصميم الويب", category: "تطوير", image: "/card2.webp", link: "/portfolio/web-design" },
      { id: 3, title: "تطوير التطبيقات", category: "جوال", image: "/card3.webp", link: "/portfolio/app-development" },
      { id: 4, title: "برمجيات مخصصة", category: "مؤسسات", image: "/card4.webp", link: "/portfolio/custom-software" },
    ],
    stackTitle: "نحول أفكارك\nإلى واقع رقمي",
    sec2Subtitle: "نحول رؤيتك إلى واقع بتقنيات حديثة وخبرة مثبتة.",
    sec2Badge1: "السرعة والابتكار", sec2Heading1: "أطلق أسرع، توسع بذكاء",
    sec2Desc1: "عمليتنا المرنة تحول الأسابيع إلى أيام. نبني منتجات أولية تثبت فكرتك بسرعة، ثم نتوسع بهندسة مؤسسية مع نموك.",
    sec2Check1a: "نماذج أولية سريعة", sec2Check1b: "سحابي من اليوم الأول", sec2Check1c: "نشر مستمر آلي",
    sec2Badge2: "الأمان والثقة", sec2Heading2: "حماية في كل طبقة",
    sec2Desc2: "تشفير بمستوى البنوك، واجهات برمجية آمنة، وأنظمة جاهزة للامتثال. بيانات مستخدميك محمية بنفس المعايير التي تثق بها شركات فورتشن 500.",
    sec2Check2a: "تشفير شامل", sec2Check2b: "تدقيق أمني دوري", sec2Check2c: "جاهز لـ GDPR و SOC2",
    svc1Title: "تطوير تطبيقات الجوال", svc1Desc: "تطبيقات أصلية ومتعددة المنصات مصممة للتفاعل والأداء على iOS و Android.",
    svc2Title: "حلول منصات الويب", svc2Desc: "تطبيقات ويب قابلة للتطوير وآمنة وعالية الأداء مبنية بأحدث التقنيات.",
    svc3Title: "أتمتة الأعمال", svc3Desc: "تبسيط العمليات مع سير عمل n8n و Make.com لحل مشاكل الأعمال المعقدة وتوفير الوقت.",
    svc4Title: "الذكاء الاصطناعي والتعلم الآلي", svc4Desc: "أتمتة ذكية وتحليلات تنبؤية لاتخاذ قرارات مدعومة بالبيانات.",
    svc5Title: "تطوير برمجيات مخصصة", svc5Desc: "حلول برمجية مصممة خصيصاً لمواجهة تحديات عملك الفريدة."
  }
};

type Lang = 'en' | 'ar';

function RevealOnScroll({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return <div ref={ref} className={`reveal-on-scroll ${className}`}>{children}</div>;
}

export default function App() {
  usePageMeta({ title: 'ALHAL.TECH | Smart Solutions, Real Results', description: 'شركة عراقية لخدمات المواقع الإلكترونية والأتمتة وخدمات الذكاء الاصطناعي. | An Iraqi company for web design, automation, and AI services.', canonical: 'https://alhaltech.com/' })

  const [lang, setLang] = useState<Lang>(() => {
    // Read saved language from localStorage, default to 'ar' (Arabic)
    const savedLang = localStorage.getItem('alhaltech-lang');
    return (savedLang === 'ar' || savedLang === 'en') ? savedLang : 'ar';
  });
  const t = translations[lang];

  // Update document direction and save language preference
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('alhaltech-lang', lang);
  }, [lang]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Integrate with GSAP ticker instead of separate RAF loop
    // This eliminates one RAF loop and improves synchronization
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)

    // Sync ScrollTrigger with Lenis scroll
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
    }
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Custom Cursor & Canvas Background */}
      <CustomCursor />
      <CanvasBackground />

      <div className="relative z-10">
        {/* Morphing Sticky Navbar */}
        <StickyNavbar translations={t} lang={lang} setLang={setLang} />

        <main className="pt-0">
          {/* Pixelated Hero Section */}
          <PixelatedHero translations={t} />

          {/* Curved Arc Divider */}
          <div className="relative -mb-px">
            <svg
              viewBox="0 0 1440 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-16 sm:h-20 block"
              preserveAspectRatio="none"
            >
              <path
                d="M0,80 L0,0 Q720,80 1440,0 L1440,80 Z"
                fill="#1a1a1a"
              />
            </svg>
          </div>

          {/* Expertise Section */}
          <section id="services"><ExpertiseSection translations={t} /></section>

          <section id="portfolio" className="py-12 bg-[#1a1a1a]">
            <SelectedWork translations={t} />
          </section>

          {/* Simple Cards Section */}
          <section id="why-us" className="py-16 md:py-24 bg-[#1a1a1a] text-[#e8e4df] px-4 md:px-12 lg:px-20">
            <div className="max-w-[1400px] mx-auto">
              <AnimatedText
                text={t.stackTitle}
                className="font-['Anton',sans-serif] text-[32px] sm:text-[52px] md:text-[68px] lg:text-[84px] font-normal leading-[1em] tracking-[0em] uppercase text-[#e8e4df] text-center mb-12 md:mb-16"
                staggerDelay={35}
                duration={750}
              />

              {/* Simple Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="group bg-[#2d2d2d] rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="/3.webp"
                      loading="lazy"
                      decoding="async"
                      alt="Strategic Planning"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="group bg-[#2d2d2d] rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="/4.webp"
                      loading="lazy"
                      decoding="async"
                      alt="AI Implementation"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="group bg-[#2d2d2d] rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="/5.webp"
                      loading="lazy"
                      decoding="async"
                      alt="Growth Analytics"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Wave Divider */}
          <div className="relative -mt-px bg-[#1a1a1a]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto block transform scale-y-[-1]" preserveAspectRatio="none">
              <path fill="#ffffff" fillOpacity="1" d="M0,256L0,96L46.5,96L46.5,224L92.9,224L92.9,256L139.4,256L139.4,224L185.8,224L185.8,160L232.3,160L232.3,32L278.7,32L278.7,224L325.2,224L325.2,96L371.6,96L371.6,96L418.1,96L418.1,256L464.5,256L464.5,128L511,128L511,160L557.4,160L557.4,192L603.9,192L603.9,256L650.3,256L650.3,96L696.8,96L696.8,128L743.2,128L743.2,224L789.7,224L789.7,160L836.1,160L836.1,192L882.6,192L882.6,96L929,96L929,128L975.5,128L975.5,0L1021.9,0L1021.9,224L1068.4,224L1068.4,32L1114.8,32L1114.8,160L1161.3,160L1161.3,128L1207.7,128L1207.7,96L1254.2,96L1254.2,192L1300.6,192L1300.6,96L1347.1,96L1347.1,192L1393.5,192L1393.5,64L1440,64L1440,0L1393.5,0L1393.5,0L1347.1,0L1347.1,0L1300.6,0L1300.6,0L1254.2,0L1254.2,0L1207.7,0L1207.7,0L1161.3,0L1161.3,0L1114.8,0L1114.8,0L1068.4,0L1068.4,0L1021.9,0L1021.9,0L975.5,0L975.5,0L929,0L929,0L882.6,0L882.6,0L836.1,0L836.1,0L789.7,0L789.7,0L743.2,0L743.2,0L696.8,0L696.8,0L650.3,0L650.3,0L603.9,0L603.9,0L557.4,0L557.4,0L511,0L511,0L464.5,0L464.5,0L418.1,0L418.1,0L371.6,0L371.6,0L325.2,0L325.2,0L278.7,0L278.7,0L232.3,0L232.3,0L185.8,0L185.8,0L139.4,0L139.4,0L92.9,0L92.9,0L46.5,0L46.5,0L0,0L0,0Z"></path>
            </svg>
          </div>

          {/* CTA Section */}
          <section id="contact" className="py-16 md:py-24 lg:py-32 bg-white">
            <div className="container max-w-5xl mx-auto px-4 text-center">
              <RevealOnScroll>
                <span className="text-brand-cyan font-semibold text-xs md:text-sm uppercase mb-4 block tracking-widest">{t.contactLabel}</span>
                <AnimatedText
                  text={t.finalCtaTitle}
                  className="font-['Anton',sans-serif] text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal uppercase text-brand-dark mb-4 md:mb-6 leading-[0.95] flex flex-wrap justify-center"
                  staggerDelay={40}
                  duration={800}
                />
                <p className="text-gray-600 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 md:mb-10 px-4">
                  {t.finalCtaSubtitle}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 md:gap-3 bg-brand-red hover:bg-red-700 text-white font-bold text-base md:text-lg px-6 md:px-10 py-3 md:py-5 rounded-2xl transition-all shadow-lg shadow-brand-red/20 hover:shadow-xl hover:shadow-brand-red/30 hover:-translate-y-1"
                >
                  {t.finalCtaButton}
                  <LucideSend className="w-4 md:w-5 h-4 md:h-5 rtl:rotate-180" />
                </Link>
              </RevealOnScroll>
            </div>
          </section>

        </main>

        <Footer translations={t} />
      </div>
    </div>
  )
}
