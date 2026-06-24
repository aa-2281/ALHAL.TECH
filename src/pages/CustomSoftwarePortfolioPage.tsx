import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LucideArrowLeft, LucideCog, LucideDatabase, LucideShield, LucideExternalLink } from 'lucide-react'
import { CustomCursor } from "@/components/ui/custom-cursor"
import { AnimatedText } from "@/components/ui/animated-text"
import Footer from "@/components/Footer"
import { usePageMeta } from '@/hooks/usePageMeta'

const translations = {
    en: {
        backToHome: "Back to Home",
        pageTitle: "Custom Software",
        pageSubtitle: "Tailor-made solutions built for your unique business needs",
        description: "Every business is different. I build custom software solutions designed specifically for your workflows, processes, and goals. No templates, no limitations—just software that works exactly the way you need it.",
        capabilities: [
            "Custom business applications",
            "Database design & management",
            "API development & integration",
            "Legacy system modernization",
            "Enterprise solutions",
            "Scalable architecture"
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
                icon: "cog",
                title: "Business Applications",
                tagline: "Software that fits your workflow",
                description: "Custom-built applications designed around your specific business processes. From inventory management to customer portals, I create tools that solve your exact problems.",
                industries: ["Manufacturing", "Logistics", "Healthcare", "Finance"]
            },
            {
                id: 2,
                icon: "database",
                title: "Data Solutions",
                tagline: "Your data, organized and accessible",
                description: "Robust database systems and data management solutions. I design efficient data architectures that grow with your business and integrate with your existing tools.",
                industries: ["Enterprise", "Research", "E-commerce", "Analytics"]
            },
            {
                id: 3,
                icon: "shield",
                title: "Secure Systems",
                tagline: "Built with security in mind",
                description: "Enterprise-grade security from day one. I build systems with encryption, access controls, and compliance requirements baked into the architecture.",
                industries: ["Banking", "Government", "Legal", "Medical"]
            }
        ],
        ctaButton: "Start Your Project"
    },
    ar: {
        backToHome: "العودة للرئيسية",
        pageTitle: "برمجيات مخصصة",
        pageSubtitle: "حلول مصممة خصيصاً لاحتياجات عملك الفريدة",
        description: "كل عمل مختلف. أبني حلول برمجية مخصصة مصممة خصيصاً لسير عملك وعملياتك وأهدافك. لا قوالب، لا قيود—فقط برمجيات تعمل بالضبط بالطريقة التي تحتاجها.",
        capabilities: [
            "تطبيقات أعمال مخصصة",
            "تصميم وإدارة قواعد البيانات",
            "تطوير وتكامل API",
            "تحديث الأنظمة القديمة",
            "حلول المؤسسات",
            "هيكلة قابلة للتوسع"
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
                icon: "cog",
                title: "تطبيقات الأعمال",
                tagline: "برمجيات تناسب سير عملك",
                description: "تطبيقات مبنية خصيصاً حول عمليات عملك المحددة. من إدارة المخزون إلى بوابات العملاء، أنشئ أدوات تحل مشاكلك بالضبط.",
                industries: ["التصنيع", "اللوجستيات", "الرعاية الصحية", "المالية"]
            },
            {
                id: 2,
                icon: "database",
                title: "حلول البيانات",
                tagline: "بياناتك، منظمة ومتاحة",
                description: "أنظمة قواعد بيانات قوية وحلول إدارة البيانات. أصمم هياكل بيانات فعالة تنمو مع عملك وتتكامل مع أدواتك الحالية.",
                industries: ["المؤسسات", "البحث", "التجارة الإلكترونية", "التحليلات"]
            },
            {
                id: 3,
                icon: "shield",
                title: "أنظمة آمنة",
                tagline: "مبنية مع الأمان في الاعتبار",
                description: "أمان على مستوى المؤسسات من اليوم الأول. أبني أنظمة مع التشفير وضوابط الوصول ومتطلبات الامتثال مدمجة في الهيكل.",
                industries: ["البنوك", "الحكومة", "القانون", "الطب"]
            }
        ],
        ctaButton: "ابدأ مشروعك"
    }
};

// Icon component mapping
const IconComponent = ({ name, className }: { name: string; className?: string }) => {
    switch (name) {
        case 'cog':
            return <LucideCog className={className} />;
        case 'database':
            return <LucideDatabase className={className} />;
        case 'shield':
            return <LucideShield className={className} />;
        default:
            return <LucideCog className={className} />;
    }
};

type Lang = 'en' | 'ar';

export default function CustomSoftwarePortfolioPage() {
    const [lang, setLang] = useState<Lang>(() => {
        const savedLang = localStorage.getItem('alhaltech-lang');
        return (savedLang === 'ar' || savedLang === 'en') ? savedLang : 'ar';
    });
    const t = translations[lang];

    usePageMeta({
        title: 'Custom Software Development | ALHAL TECH',
        description: 'Tailor-made software solutions engineered around your unique business workflows.',
        canonical: 'https://alhaltech.com/portfolio/custom-software',
    });

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
