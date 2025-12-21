import { useState, useEffect, useRef } from 'react'
import { cn } from "@/lib/utils"
import { CanvasBackground } from "@/components/ui/canvas-background"
import { CustomCursor } from "@/components/ui/custom-cursor"
import { ServicesCarousel } from "@/components/services-carousel"
import { LucideMenu, LucideX, LucideChevronRight, LucideCheck, LucideMail, LucidePhone, LucideSend, LucideGlobe, LucideZap, LucideShield } from "lucide-react"

// --- DATA ---


const whyUsData = [
  "Agile Development Methodology",
  "24/7 Technical Support",
  "Scalable Architecture",
  "User-Centric Design",
  "Transparent Pricing",
  "Post-Launch Maintenance"
];

const translations = {
  en: {
    logoPart1: "ALHAL", logoPart2: "TECH",
    navServices: "Services", navWhy: "Why Us", navPortfolio: "Portfolio", navContact: "Let's Talk",
    heroBadge: "Accepting New Projects",
    heroTitlePart1: "Smart Solutions,", heroTitlePart2: "Real Results",
    heroSubtitle: "Apps, AI, and automation — everything your business needs to thrive in the digital age.",
    heroCTA: "Contact Us", heroSecondCTA: "Explore Services",
    servicesLabel: "What We Do", servicesTitle: "Our Ecosystem", servicesSubtitle: "A complete suite of digital services designed to scale with your ambition.", viewAllServices: "View full details",
    carouselLabel: "Our Solutions", carouselTitle1: "Comprehensive Digital", carouselTitle2: "Protection & Growth", carouselLearnMore: "Learn more",
    whyUsLabel: "Why Choose Us", whyUsTitle: "Why visionary companies choose Al Hal Tech",
    statsProjects: "Total Projects", statsSatisfaction: "Client Satisfaction", statsSupport: "Support", statsSecurity: "Security", statsClients: "Clients", statsYears: "Years",
    portfolioLabel: "Our Work", portfolioTitle: "Featured Projects", portfolioSubtitle: "Transforming ideas into digital reality. Here's a glimpse of our recent work.", portfolioViewAll: "View All Projects",
    testimonialsLabel: "Testimonials", testimonialsTitle: "What Our Clients Say",
    finalCtaTitle: "Ready to disrupt the market?", finalCtaSubtitle: "Let's build technology that sets you apart. Schedule your free strategy session today.", finalCtaButton: "Launch Project",
    contactLabel: "Get in Touch", contactTitle: "Let's build something extraordinary", contactSubtitle: "Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.",
    contactEmailLabel: "Email Us", contactPhoneLabel: "Call Us",
    formName: "Name", formEmail: "Email", formSubject: "Subject", formMessage: "Message", formSubmit: "Send Message",
    footerDesc: "Engineering the digital future from Sulaymaniyah to the world.", footerServices: "Services", footerCompany: "Company", footerSocial: "Connect",
    footerWebDev: "Web Development", footerMobile: "Mobile Applications", footerAutomation: "Automation", footerAI: "AI Solutions",
    footerAbout: "About Us", footerServicesLink: "Services", footerCareers: "Careers", footerContact: "Contact",
    footerCopyright: "© 2025 Al Hal Tech. All rights reserved.", footerPrivacy: "Privacy Policy", footerTerms: "Terms of Service",
    formOptWebDev: "Web Development", formOptMobile: "Mobile App", formOptConsulting: "Consulting", formOptOther: "Other",
    sec2Title1: "Your Idea.", sec2Title2: "Our Expertise.",
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
    navServices: "خدماتنا", navWhy: "لماذا نحن", navPortfolio: "أعمالنا", navContact: "تواصل معنا",
    heroBadge: "نستقبل مشاريع جديدة",
    heroTitlePart1: "حلول ذكية،", heroTitlePart2: "نتائج حقيقية",
    heroSubtitle: "تطبيقات، ذكاء اصطناعي، وأتمتة — كل ما يحتاجه عملك للنجاح في العصر الرقمي.",
    heroCTA: "ابدأ مشروعك", heroSecondCTA: "استكشف الخدمات",
    servicesLabel: "ماذا نقدم", servicesTitle: "نظامنا البيئي", servicesSubtitle: "مجموعة كاملة من الخدمات الرقمية المصممة لتنمو مع طموحك.", viewAllServices: "عرض التفاصيل",
    carouselLabel: "حلولنا", carouselTitle1: "حماية رقمية شاملة", carouselTitle2: "ونمو مستدام", carouselLearnMore: "اعرف المزيد",
    whyUsLabel: "لماذا تختارنا", whyUsTitle: "لماذا تختار الشركات الرائدة الحل تك",
    statsProjects: "إجمالي المشاريع", statsSatisfaction: "رضا العملاء", statsSupport: "دعم فني", statsSecurity: "أمان", statsClients: "عميل", statsYears: "سنوات خبرة",
    portfolioLabel: "أعمالنا", portfolioTitle: "مشاريع مميزة", portfolioSubtitle: "نحول الأفكار إلى واقع رقمي. إليك لمحة عن أحدث أعمالنا.", portfolioViewAll: "عرض كل المشاريع",
    testimonialsLabel: "آراء العملاء", testimonialsTitle: "ماذا يقول عملاؤنا",
    finalCtaTitle: "جاهز لاكتساح السوق؟", finalCtaSubtitle: "دعنا نبني التكنولوجيا التي تميزك. حدد موعدًا لاستشارتك المجانية اليوم.", finalCtaButton: "أطلق مشروعك",
    contactLabel: "تواصل معنا", contactTitle: "لنصنع شيئاً استثنائياً", contactSubtitle: "هل لديك مشروع في ذهنك؟ نود أن نسمع عنه. راسلنا وسنرد عليك خلال 24 ساعة.",
    contactEmailLabel: "راسلنا", contactPhoneLabel: "اتصل بنا",
    formName: "الاسم", formEmail: "البريد الإلكتروني", formSubject: "الموضوع", formMessage: "الرسالة", formSubmit: "إرسال الرسالة",
    footerDesc: "هندسة المستقبل الرقمي من السليمانية إلى العالم.", footerServices: "الخدمات", footerCompany: "الشركة", footerSocial: "تواصل",
    footerWebDev: "تطوير الويب", footerMobile: "تطبيقات الجوال", footerAutomation: "الأتمتة", footerAI: "حلول الذكاء الاصطناعي",
    footerAbout: "من نحن", footerServicesLink: "الخدمات", footerCareers: "الوظائف", footerContact: "تواصل معنا",
    footerCopyright: "© 2025 الحل تك. جميع الحقوق محفوظة.", footerPrivacy: "سياسة الخصوصية", footerTerms: "شروط الاستخدام",
    formOptWebDev: "تطوير الويب", formOptMobile: "تطبيق جوال", formOptConsulting: "استشارات", formOptOther: "أخرى",
    sec2Title1: "فكرتك.", sec2Title2: "خبرتنا.",
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
  const [lang, setLang] = useState<Lang>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang];
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling DOWN - hide navbar
        setNavVisible(false);
      } else {
        // Scrolling UP - show navbar
        setNavVisible(true);
      }

      // Update scrolled state for styling
      setScrolled(currentScrollY > 50);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="relative min-h-screen">
      {/* Custom Cursor & Canvas Background */}
      <CustomCursor />
      <CanvasBackground />

      <div className="relative z-10">
        {/* Header - hides on scroll down, shows on scroll up */}
        <header
          id="main-header"
          className={cn(
            "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
            "backdrop-blur-md bg-transparent",
            scrolled ? "py-3" : "py-4 sm:py-6",
            navVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          )}
        >
          <div className="container max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <a href="#" dir="ltr" className="flex flex-col leading-none"><span className="font-extrabold text-2xl text-white tracking-tight">{t.logoPart1}</span><span className="font-bold text-sm text-brand-cyan tracking-widest">{t.logoPart2}</span></a>
              <nav className="hidden lg:flex items-center gap-10 text-sm font-medium">
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">{t.navServices}</a>
                <a href="#why-us" className="text-gray-300 hover:text-white transition-colors">{t.navWhy}</a>
                <a href="#portfolio" className="text-gray-300 hover:text-white transition-colors">{t.navPortfolio}</a>
                <a href="#contact" className="bg-brand-red hover:bg-red-700 text-white px-6 py-2.5 rounded-full transition-all hover:scale-105">{t.navContact}</a>
              </nav>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-brand-navy/50 rounded-full p-1">
                  <button onClick={() => setLang('en')} className={cn("px-3 py-1 rounded-full text-xs font-medium transition-all", lang === 'en' ? "bg-white text-brand-navy" : "text-gray-300")}>EN</button>
                  <button onClick={() => setLang('ar')} className={cn("px-3 py-1 rounded-full text-xs font-medium transition-all", lang === 'ar' ? "bg-white text-brand-navy" : "text-gray-300")}>ع</button>
                </div>
                <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-white p-2"><LucideMenu className="w-6 h-6" /></button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        <div className={cn("fixed top-0 right-0 w-full h-screen bg-brand-dark z-[60] lg:hidden transition-transform duration-300", mobileMenuOpen ? "translate-x-0" : "translate-x-full")}>
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-6 border-b border-white/5"><a href="#" dir="ltr" className="flex flex-col leading-none"><span className="font-extrabold text-xl text-white tracking-tight">{t.logoPart1}</span><span className="font-bold text-xs text-brand-cyan tracking-widest">{t.logoPart2}</span></a><button onClick={() => setMobileMenuOpen(false)} className="text-white p-2"><LucideX className="w-6 h-6" /></button></div>
            <nav className="flex flex-col gap-6 p-8 text-lg">
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white">{t.navServices}</a>
              <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white">{t.navWhy}</a>
              <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white">{t.navPortfolio}</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="bg-brand-red text-white px-6 py-3 rounded-full text-center">{t.navContact}</a>
            </nav>
          </div>
        </div>

        <main className="pt-0">
          <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">

            <div className="container max-w-7xl mx-auto px-4 relative z-10 pt-32">
              <div className="text-center max-w-4xl mx-auto">
                <RevealOnScroll className="inline-flex items-center gap-2 bg-brand-navy/50 border border-brand-cyan/20 rounded-full px-4 py-2 mb-8">
                  <span className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse"></span>
                  <span className="text-brand-cyan text-sm font-medium">{t.heroBadge}</span>
                </RevealOnScroll>
                <RevealOnScroll delay={100}>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6">
                    <span className="text-white">{t.heroTitlePart1}</span><br />
                    <span className="bg-gradient-to-r from-brand-cyan to-brand-red bg-clip-text text-transparent">{t.heroTitlePart2}</span>
                  </h1>
                </RevealOnScroll>
                <RevealOnScroll delay={200}>
                  <p className="text-gray-400 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">{t.heroSubtitle}</p>
                </RevealOnScroll>
                <RevealOnScroll delay={300} className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="#contact" className="bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2">
                    {t.heroCTA} <LucideChevronRight className="w-5 h-5 rtl:rotate-180" />
                  </a>
                  <a href="#services" className="border border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-brand-dark px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2">{t.heroSecondCTA}</a>
                </RevealOnScroll>
              </div>
            </div>
          </section>

          {/* Curved Arc Divider */}
          <div className="relative bg-brand-dark -mb-px">
            <svg
              viewBox="0 0 1440 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-16 sm:h-20 block"
              preserveAspectRatio="none"
            >
              <path
                d="M0,80 L0,0 Q720,80 1440,0 L1440,80 Z"
                fill="#DAF6F5"
              />
            </svg>
          </div>

          {/* Value Proposition Section */}
          <section className="py-24 bg-brand-light relative overflow-hidden -mt-px">
            {/* PixelTrail Hover Effect Background - REMOVED */}
            <div className="absolute inset-0 z-0">
            </div>

            <div className="container max-w-7xl mx-auto px-4 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <RevealOnScroll>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-dark">
                    {t.sec2Title1} <span className="text-brand-cyan">{t.sec2Title2}</span>
                  </h2>
                </RevealOnScroll>
                <RevealOnScroll delay={100}>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {t.sec2Subtitle}
                  </p>
                </RevealOnScroll>
              </div>

              {/* Feature Row 1: Image Left, Text Right */}
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
                <RevealOnScroll className="order-2 lg:order-1">
                  <img
                    src="/a0a303f3-8d9d-4a6c-92ac-777891978c3b.svg"
                    alt={t.sec2Badge1}
                    className="w-full max-w-md mx-auto lg:mx-0 drop-shadow-xl"
                  />
                </RevealOnScroll>
                <RevealOnScroll delay={200} className="order-1 lg:order-2">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 bg-brand-cyan/10 text-brand-cyan px-4 py-2 rounded-full text-sm font-semibold">
                      <LucideZap className="w-4 h-4" /> {t.sec2Badge1}
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-brand-dark">
                      {t.sec2Heading1}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {t.sec2Desc1}
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-gray-700">
                        <LucideCheck className="w-5 h-5 text-brand-cyan" /> {t.sec2Check1a}
                      </li>
                      <li className="flex items-center gap-3 text-gray-700">
                        <LucideCheck className="w-5 h-5 text-brand-cyan" /> {t.sec2Check1b}
                      </li>
                      <li className="flex items-center gap-3 text-gray-700">
                        <LucideCheck className="w-5 h-5 text-brand-cyan" /> {t.sec2Check1c}
                      </li>
                    </ul>
                  </div>
                </RevealOnScroll>
              </div>

              {/* Feature Row 2: Text Left, Image Right */}
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <RevealOnScroll delay={100}>
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red px-4 py-2 rounded-full text-sm font-semibold">
                      <LucideShield className="w-4 h-4" /> {t.sec2Badge2}
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-brand-dark">
                      {t.sec2Heading2}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {t.sec2Desc2}
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-gray-700">
                        <LucideCheck className="w-5 h-5 text-brand-red" /> {t.sec2Check2a}
                      </li>
                      <li className="flex items-center gap-3 text-gray-700">
                        <LucideCheck className="w-5 h-5 text-brand-red" /> {t.sec2Check2b}
                      </li>
                      <li className="flex items-center gap-3 text-gray-700">
                        <LucideCheck className="w-5 h-5 text-brand-red" /> {t.sec2Check2c}
                      </li>
                    </ul>
                  </div>
                </RevealOnScroll>
                <RevealOnScroll delay={200}>
                  <img
                    src="/a0a3044c-a1fd-4bf0-a637-03d08f9e5d8e.svg"
                    alt={t.sec2Badge2}
                    className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto drop-shadow-xl"
                  />
                </RevealOnScroll>
              </div>
            </div>
          </section>

          <section id="services" className="py-20 bg-brand-navy/20">
            <ServicesCarousel
              translations={{
                label: t.carouselLabel,
                title1: t.carouselTitle1,
                title2: t.carouselTitle2,
                learnMore: t.carouselLearnMore,
                solutions: ""
              }}
              services={[
                { id: 1, title: t.svc1Title, description: t.svc1Desc, gradient: "from-emerald-500 to-emerald-700", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800" },
                { id: 2, title: t.svc2Title, description: t.svc2Desc, gradient: "from-blue-500 to-blue-700", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800" },
                { id: 3, title: t.svc3Title, description: t.svc3Desc, gradient: "from-red-500 to-red-700", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
                { id: 4, title: t.svc4Title, description: t.svc4Desc, gradient: "from-purple-500 to-purple-700", image: "/istock-962219860-2-scaled.jpg" },
                { id: 5, title: t.svc5Title, description: t.svc5Desc, gradient: "from-pink-500 to-pink-700", image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&q=80&w=800" }
              ]}
            />
          </section>

          <section id="why-us" className="py-24">
            <div className="container max-w-7xl mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <RevealOnScroll>
                  <span className="text-brand-red font-semibold text-sm uppercase mb-3 block">{t.whyUsLabel}</span>
                  <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white">{t.whyUsTitle}</h2>
                </RevealOnScroll>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  {whyUsData.map((point, i) => (
                    <RevealOnScroll key={i} delay={i * 100}>
                      <div className="flex items-center gap-4 group cursor-default glass-panel p-5 rounded-2xl border border-white/5 hover:border-brand-cyan/20 transition-all">
                        <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red border border-brand-red/20 group-hover:bg-brand-red group-hover:text-white transition-all flex-shrink-0">
                          <LucideCheck className="w-5 h-5" />
                        </div>
                        <span className="text-lg text-gray-300 group-hover:text-brand-light transition-colors font-medium">{point}</span>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            </div>
          </section>



          <section className="py-24">
            <div className="container max-w-7xl mx-auto px-4">
              <RevealOnScroll className="glass-panel rounded-3xl p-12 sm:p-16 text-center border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 via-transparent to-brand-cyan/10"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">{t.finalCtaTitle}</h2>
                  <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">{t.finalCtaSubtitle}</p>
                  <a href="#contact" className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold transition-all">
                    {t.finalCtaButton} <LucideChevronRight className="w-5 h-5 rtl:rotate-180" />
                  </a>
                </div>
              </RevealOnScroll>
            </div>
          </section>

          <section id="contact" className="py-24">
            <div className="container max-w-7xl mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                <RevealOnScroll>
                  <span className="text-brand-cyan font-semibold text-sm uppercase mb-3 block">{t.contactLabel}</span>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-light">{t.contactTitle}</h2>
                  <p className="text-gray-400 text-lg mb-12">{t.contactSubtitle}</p>
                  <div className="space-y-8">
                    <div className="flex items-start gap-5 group rtl:flex-row-reverse rtl:text-right">
                      <div className="w-12 h-12 rounded-xl bg-brand-navy/50 flex items-center justify-center text-brand-red group-hover:scale-110 transition-transform border border-brand-light/5">
                        <LucideMail className="w-6 h-6" />
                      </div>
                      <div><h3 className="text-xl font-bold text-brand-light mb-1">{t.contactEmailLabel}</h3><a href="mailto:yasir@alhaltech.com" className="text-gray-400 hover:text-brand-cyan transition-colors">yasir@alhaltech.com</a></div>
                    </div>
                    <div className="flex items-start gap-5 group rtl:flex-row-reverse rtl:text-right">
                      <div className="w-12 h-12 rounded-xl bg-brand-navy/50 flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform border border-brand-light/5">
                        <LucidePhone className="w-6 h-6" />
                      </div>
                      <div><h3 className="text-xl font-bold text-brand-light mb-1">{t.contactPhoneLabel}</h3><a href="tel:+9647507834121" className="text-gray-400 hover:text-brand-cyan transition-colors" dir="ltr">+964 750 783 4121</a></div>
                    </div>
                  </div>
                </RevealOnScroll>
                <RevealOnScroll delay={200}>
                  <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/10">

                    <div className="space-y-2 mb-6"><label htmlFor="subject" className="text-sm font-medium text-gray-300 ml-1">{t.formSubject}</label><select id="contactSubject" className="w-full bg-brand-dark/50 border border-brand-light/10 rounded-xl px-4 py-3 text-brand-light focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all outline-none appearance-none"><option>{t.formOptWebDev}</option><option>{t.formOptMobile}</option><option>{t.formOptConsulting}</option><option>{t.formOptOther}</option></select></div>
                    <div className="space-y-2 mb-8"><label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">{t.formMessage}</label><textarea id="contactMessage" rows={4} className="w-full bg-brand-dark/50 border border-brand-light/10 rounded-xl px-4 py-3 text-brand-light focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all outline-none resize-none" placeholder={lang === 'ar' ? "اكتب تفاصيل مشروعك هنا..." : "Tell us about your project..."}></textarea></div>
                    <button
                      type="button"
                      onClick={() => {
                        const name = (document.getElementById('contactName') as HTMLInputElement)?.value || '';
                        const email = (document.getElementById('contactEmail') as HTMLInputElement)?.value || '';
                        const subject = (document.getElementById('contactSubject') as HTMLSelectElement)?.value || '';
                        const message = (document.getElementById('contactMessage') as HTMLTextAreaElement)?.value || '';
                        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
                        window.location.href = `mailto:yasir@alhaltech.com?subject=${encodeURIComponent(subject)}&body=${body}`;
                      }}
                      className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      {t.formSubmit} <LucideSend className="w-5 h-5 rtl:rotate-180" />
                    </button>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-brand-light border-t border-brand-dark/10 pt-16 pb-8 text-sm">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              <div className="space-y-4">
                <a href="#" dir="ltr" className="flex flex-col leading-none"><span className="font-extrabold text-2xl text-brand-dark tracking-tight">{t.logoPart1}</span><span className="font-bold text-sm text-brand-cyan tracking-widest">{t.logoPart2}</span></a>
                <p className="text-gray-600">{t.footerDesc}</p>
              </div>
              <div><h3 className="font-bold text-brand-dark mb-6 text-lg">{t.footerServices}</h3><ul className="space-y-3"><li><a href="#" className="text-gray-600 hover:text-brand-cyan transition-colors">{t.footerWebDev}</a></li><li><a href="#" className="text-gray-600 hover:text-brand-cyan transition-colors">{t.footerMobile}</a></li><li><a href="#" className="text-gray-600 hover:text-brand-cyan transition-colors">{t.footerAutomation}</a></li><li><a href="#" className="text-gray-600 hover:text-brand-cyan transition-colors">{t.footerAI}</a></li></ul></div>
              <div><h3 className="font-bold text-brand-dark mb-6 text-lg">{t.footerCompany}</h3><ul className="space-y-3"><li><a href="#why-us" className="text-gray-600 hover:text-brand-cyan transition-colors">{t.footerAbout}</a></li><li><a href="#services" className="text-gray-600 hover:text-brand-cyan transition-colors">{t.footerServicesLink}</a></li><li><a href="#" className="text-gray-600 hover:text-brand-cyan transition-colors">{t.footerCareers}</a></li><li><a href="#contact" className="text-gray-600 hover:text-brand-cyan transition-colors">{t.footerContact}</a></li></ul></div>
              <div><h3 className="font-bold text-brand-dark mb-6 text-lg">{t.footerSocial}</h3><div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-brand-dark/10 flex items-center justify-center text-brand-dark hover:bg-brand-red hover:text-white transition-all hover:-translate-y-1"><LucideGlobe className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-brand-dark/10 flex items-center justify-center text-brand-dark hover:bg-brand-red hover:text-white transition-all hover:-translate-y-1"><LucideMail className="w-5 h-5" /></a>
              </div></div>
            </div>
            <div className="border-t border-brand-dark/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"><p className="text-gray-500">{t.footerCopyright}</p><div className="flex gap-6 text-gray-500"><a href="#" className="hover:text-brand-cyan transition-colors">{t.footerPrivacy}</a><a href="#" className="hover:text-brand-cyan transition-colors">{t.footerTerms}</a></div></div>
          </div>
        </footer>
      </div>
    </div>
  )
}
