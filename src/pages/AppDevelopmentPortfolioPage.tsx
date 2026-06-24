import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LucideArrowLeft, LucideSmartphone, LucideCode, LucideRocket, LucideExternalLink } from 'lucide-react'
import { CustomCursor } from "@/components/ui/custom-cursor"
import { AnimatedText } from "@/components/ui/animated-text"
import Footer from "@/components/Footer"
import { usePageMeta } from '@/hooks/usePageMeta'

const translations = {
    en: {
        backToHome: "Back to Home",
        pageTitle: "App Development",
        pageSubtitle: "Native and cross-platform mobile apps for iOS & Android",
        description: "I build mobile applications that users love. From concept to App Store, I handle the entire development process using modern frameworks to deliver fast, reliable, and beautiful apps.",
        capabilities: [
            "iOS app development",
            "Android app development",
            "Cross-platform solutions",
            "UI/UX mobile design",
            "App Store optimization",
            "Maintenance & updates"
        ],
        capabilitiesTitle: "What I Build",
        projectsTitle: "Our Services",
        excellentFor: "Perfect for:",
        logoPart1: "ALHAL",
        logoPart2: "TECH",
        footerDesc: "Engineering the digital future from Mosul & Sulaymaniyah to the world.",
        footerServices: "Services",
        footerCompany: "Company",
        footerSocial: "Connect",
        footerWebDev: "Web Development",
        footerMobile: "Mobile Applications",
        footerAutomation: "Automation",
        footerAI: "AI Solutions",
        footerAbout: "About Us",
        footerServicesLink: "Services",
        footerCareers: "Careers",
        footerContact: "Contact",
        footerCopyright: "© 2025 Al Hal Tech. All rights reserved.",
        footerPrivacy: "Privacy Policy",
        footerTerms: "Terms of Service",
        services: [
            {
                id: 1,
                icon: "smartphone",
                title: "Native Mobile Apps",
                tagline: "Built for performance",
                description: "High-performance native apps for iOS and Android that feel smooth and responsive. Leveraging platform-specific features for the best possible user experience.",
                industries: ["Startups", "Enterprise", "E-commerce", "Healthcare"]
            },
            {
                id: 2,
                icon: "code",
                title: "Cross-Platform Apps",
                tagline: "One codebase, all platforms",
                description: "Build once, deploy everywhere. Using React Native and Flutter, I create apps that work seamlessly on both iOS and Android while maintaining native performance.",
                industries: ["SMBs", "MVPs", "Social Apps", "Utilities"]
            },
            {
                id: 3,
                icon: "rocket",
                title: "App Launch & Support",
                tagline: "From idea to App Store",
                description: "Complete support from development to launch. I handle App Store submissions, updates, and ongoing maintenance to keep your app running smoothly.",
                industries: ["All Businesses", "Entrepreneurs", "Agencies", "Product Teams"]
            }
        ],
        ctaButton: "Start Your Project"
    },
    ar: {
        backToHome: "العودة للرئيسية",
        pageTitle: "تطوير التطبيقات",
        pageSubtitle: "تطبيقات أصلية ومتعددة المنصات لـ iOS و Android",
        description: "أبني تطبيقات جوال يحبها المستخدمون. من الفكرة إلى متجر التطبيقات، أتولى عملية التطوير بالكامل باستخدام أحدث الأطر لتقديم تطبيقات سريعة وموثوقة وجميلة.",
        capabilities: [
            "تطوير تطبيقات iOS",
            "تطوير تطبيقات Android",
            "حلول متعددة المنصات",
            "تصميم UI/UX للجوال",
            "تحسين متجر التطبيقات",
            "الصيانة والتحديثات"
        ],
        capabilitiesTitle: "ما أبنيه",
        projectsTitle: "خدماتنا",
        excellentFor: "مثالي لـ:",
        logoPart1: "ALHAL",
        logoPart2: "TECH",
        footerDesc: "هندسة المستقبل الرقمي من الموصل والسليمانية إلى العالم.",
        footerServices: "الخدمات",
        footerCompany: "الشركة",
        footerSocial: "تواصل",
        footerWebDev: "تطوير الويب",
        footerMobile: "تطبيقات الجوال",
        footerAutomation: "الأتمتة",
        footerAI: "حلول الذكاء الاصطناعي",
        footerAbout: "من نحن",
        footerServicesLink: "الخدمات",
        footerCareers: "الوظائف",
        footerContact: "تواصل معنا",
        footerCopyright: "© 2025 الحل التقني. جميع الحقوق محفوظة.",
        footerPrivacy: "سياسة الخصوصية",
        footerTerms: "شروط الاستخدام",
        services: [
            {
                id: 1,
                icon: "smartphone",
                title: "تطبيقات أصلية",
                tagline: "مصممة للأداء",
                description: "تطبيقات أصلية عالية الأداء لـ iOS و Android تبدو سلسة ومتجاوبة. استغلال ميزات المنصة المحددة لأفضل تجربة مستخدم ممكنة.",
                industries: ["الشركات الناشئة", "المؤسسات", "التجارة الإلكترونية", "الرعاية الصحية"]
            },
            {
                id: 2,
                icon: "code",
                title: "تطبيقات متعددة المنصات",
                tagline: "كود واحد، كل المنصات",
                description: "ابنِ مرة، انشر في كل مكان. باستخدام React Native و Flutter، أنشئ تطبيقات تعمل بسلاسة على iOS و Android مع الحفاظ على الأداء الأصلي.",
                industries: ["الشركات الصغيرة", "المنتجات الأولية", "التطبيقات الاجتماعية", "الأدوات"]
            },
            {
                id: 3,
                icon: "rocket",
                title: "إطلاق ودعم التطبيقات",
                tagline: "من الفكرة إلى المتجر",
                description: "دعم كامل من التطوير إلى الإطلاق. أتولى تقديمات متجر التطبيقات والتحديثات والصيانة المستمرة لإبقاء تطبيقك يعمل بسلاسة.",
                industries: ["جميع الأعمال", "رواد الأعمال", "الوكالات", "فرق المنتجات"]
            }
        ],
        ctaButton: "ابدأ مشروعك"
    }
};

// Icon component mapping
const IconComponent = ({ name, className }: { name: string; className?: string }) => {
    switch (name) {
        case 'smartphone':
            return <LucideSmartphone className={className} />;
        case 'code':
            return <LucideCode className={className} />;
        case 'rocket':
            return <LucideRocket className={className} />;
        default:
            return <LucideSmartphone className={className} />;
    }
};

type Lang = 'en' | 'ar';

export default function AppDevelopmentPortfolioPage() {
    usePageMeta({
        title: 'Mobile App Development | ALHAL TECH',
        description: 'Native and cross-platform iOS and Android apps designed for engagement and performance.',
        canonical: 'https://alhaltech.com/portfolio/app-development'
    });

    const [lang, setLang] = useState<Lang>(() => {
        const savedLang = localStorage.getItem('alhaltech-lang');
        return (savedLang === 'ar' || savedLang === 'en') ? savedLang : 'ar';
    });
    const t = translations[lang];

    // Scroll to top when page loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Update document direction and save language preference
    useEffect(() => {
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        localStorage.setItem('alhaltech-lang', lang);
    }, [lang]);

    return (
        <>
            <CustomCursor variant="light" />
            <div className="min-h-screen bg-[#f5f5f0]">
                {/* Fixed Navbar */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/5">
                    <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                        <Link to="/" className="flex flex-col leading-none" dir="ltr">
                            <span className="font-extrabold text-xl text-white tracking-tight">{t.logoPart1}</span>
                            <span className="font-bold text-xs text-white/60 tracking-widest">{t.logoPart2}</span>
                        </Link>

                        <div className="flex items-center gap-4">
                            <Link
                                to="/"
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                <LucideArrowLeft className="w-4 h-4 rtl:rotate-180" />
                                {t.backToHome}
                            </Link>

                            <button
                                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                                className="px-3 py-1.5 rounded-lg bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-colors border border-white/10"
                            >
                                {lang === 'en' ? 'العربية' : 'English'}
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="pt-32 pb-16 px-4 bg-[#1a1a1a]">
                    <div className="container max-w-6xl mx-auto">
                        <div className="text-center mb-8">
                            <AnimatedText
                                text={t.pageTitle}
                                className="font-['Anton',sans-serif] text-5xl md:text-7xl lg:text-8xl font-normal uppercase text-[#e8e4df] mb-6 leading-[0.95] flex flex-wrap justify-center"
                                staggerDelay={40}
                                duration={800}
                            />
                            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                                {t.pageSubtitle}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <main className="py-16 px-4">
                    <div className="container max-w-6xl mx-auto">
                        {/* Description Section */}
                        <div className="grid lg:grid-cols-2 gap-12 mb-20">
                            <div>
                                <h2 className="font-['Anton',sans-serif] text-3xl md:text-4xl font-normal uppercase text-[#1a1a1a] mb-6">
                                    {t.capabilitiesTitle}
                                </h2>
                                <ul className="space-y-3">
                                    {t.capabilities.map((cap, index) => (
                                        <li key={index} className="flex items-center gap-3 text-gray-700">
                                            <div className="w-2 h-2 bg-brand-cyan rounded-full flex-shrink-0" />
                                            {cap}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {t.description}
                                </p>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 mt-8 bg-brand-red hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-brand-red/20"
                                >
                                    {t.ctaButton}
                                    <LucideExternalLink className="w-4 h-4 rtl:rotate-180" />
                                </Link>
                            </div>
                        </div>

                        {/* Services Cards Grid */}
                        <div>
                            <h2 className="font-['Anton',sans-serif] text-3xl md:text-4xl font-normal uppercase text-[#1a1a1a] mb-10">
                                {t.projectsTitle}
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {t.services.map((service) => (
                                    <div
                                        key={service.id}
                                        className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
                                    >
                                        {/* Decorative gradient background */}
                                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/15 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Icon */}
                                        <div className="relative z-10 w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                            <IconComponent name={service.icon} className="w-7 h-7 text-[#1a1a1a]" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="relative z-10 text-xl font-bold text-white mb-2 transition-colors">
                                            {service.title}
                                        </h3>

                                        {/* Tagline */}
                                        <p className="relative z-10 text-sm font-medium text-white/70 mb-4 italic">
                                            "{service.tagline}"
                                        </p>

                                        {/* Description */}
                                        <p className="relative z-10 text-gray-400 text-sm leading-relaxed mb-5">
                                            {service.description}
                                        </p>

                                        {/* Industry pills */}
                                        <div className="relative z-10">
                                            <h4 className="text-sm text-white font-bold mb-3">{t.excellentFor}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {service.industries.map((industry: string, index: number) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 text-xs font-medium bg-white/10 text-white/80 rounded-full border border-white/10"
                                                    >
                                                        {industry}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                <Footer translations={t} />
            </div>
        </>
    );
}
