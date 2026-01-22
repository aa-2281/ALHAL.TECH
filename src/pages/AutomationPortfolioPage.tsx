import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LucideArrowLeft, LucideExternalLink, LucideUsers, LucideFileText, LucideShare2, LucideMessageCircle, LucideTrendingUp, LucideShield } from 'lucide-react'
import { CustomCursor } from "@/components/ui/custom-cursor"
import { AnimatedText } from "@/components/ui/animated-text"
import Footer from "@/components/Footer"

const translations = {
    en: {
        backToHome: "Back to Home",
        pageTitle: "Automation Solutions",
        pageSubtitle: "Intelligent workflow automation powered by AI",
        description: "I specialize in building powerful automation workflows that save time, reduce errors, and scale your business operations. Using n8n and custom integrations, I create solutions that connect your tools and automate repetitive tasks.",
        capabilities: [
            "Custom n8n workflow development",
            "API integrations & data sync",
            "AI-powered automation triggers",
            "Business process optimization",
            "Real-time notifications & alerts",
            "Multi-platform connectivity"
        ],
        capabilitiesTitle: "What I Automate",
        projectsTitle: "Featured Automations",
        excellentFor: "Excellent for:",
        logoPart1: "ALHAL",
        logoPart2: "TECH",
        footerDesc: "Engineering the digital future from Sulaymaniyah to the world.",
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
        automations: [
            {
                id: 1,
                icon: "users",
                title: "AI Content Creator",
                tagline: "Create stunning content with AI",
                description: "Generate professional images, graphics, and social media content automatically using AI. Create engaging posts, stories, and marketing materials in seconds. Perfect for businesses that need consistent, high-quality visual content without hiring a design team.",
                industries: ["Marketing Agencies", "Social Media Pages", "Content Creators", "E-commerce"]
            },
            {
                id: 2,
                icon: "file",
                title: "Invoice Processing Workflow",
                tagline: "From receipt to ledger in seconds",
                description: "Extracts data from invoices and receipts using OCR technology. Validates entries against your business rules, categorizes expenses automatically, and posts directly to your accounting software. Eliminate manual data entry and reduce errors by 95%.",
                industries: ["Retail", "Wholesale", "Manufacturing", "Services"]
            },
            {
                id: 3,
                icon: "share",
                title: "Social Media Scheduler",
                tagline: "Be everywhere without being online",
                description: "AI-powered content scheduling that maintains your social media presence across multiple platforms. Analyzes optimal posting times, generates content variations, and tracks engagement metrics—all running on autopilot while you focus on creating value.",
                industries: ["Supermarkets", "Real Estate", "Restaurants", "Instagram Pages"]
            },
            {
                id: 4,
                icon: "message",
                title: "Customer Support Bot",
                tagline: "Instant answers, happy customers",
                description: "An intelligent chatbot that handles customer queries instantly, 24/7. Connects seamlessly to Instagram, Messenger, TikTok, WhatsApp, your website widget, and more. Uses AI to understand questions, provides accurate answers, and escalates complex issues to your team.",
                industries: ["E-commerce", "Healthcare", "Banking"]
            },
            {
                id: 5,
                icon: "trending",
                title: "Business Analytics Pipeline",
                tagline: "Data-driven decisions on autopilot",
                description: "Aggregates data from all your business tools—CRM, accounting, marketing, and more. Generates automated reports, triggers alerts for important KPIs, and delivers insights directly to Slack or email. Make informed decisions without spending hours in spreadsheets.",
                industries: ["Startups", "Agencies", "E-commerce", "Enterprise"]
            },
            {
                id: 6,
                icon: "shield",
                title: "Security & Backup Automation",
                tagline: "Peace of mind, fully automated",
                description: "Monitors your systems for security threats, performs automated backups across multiple cloud providers, and sends instant alerts if anything unusual is detected. Your business data stays safe without requiring constant manual oversight.",
                industries: ["Finance", "Healthcare", "Legal", "Tech Companies"]
            }
        ],
        ctaButton: "Start Your Project"
    },
    ar: {
        backToHome: "العودة للرئيسية",
        pageTitle: "حلول الأتمتة",
        pageSubtitle: "أتمتة الأعمال بتقنية الذكاء الاصطناعي",
        description: "أتخصص في بناء سير عمل أتمتة قوية توفر الوقت وتقلل الأخطاء وتوسع عمليات أعمالك. باستخدام n8n والتكاملات المخصصة، أنشئ حلولاً تربط أدواتك وتؤتمت المهام المتكررة.",
        capabilities: [
            "تطوير سير عمل n8n مخصص",
            "تكامل API ومزامنة البيانات",
            "مشغلات أتمتة بالذكاء الاصطناعي",
            "تحسين العمليات التجارية",
            "إشعارات وتنبيهات فورية",
            "اتصال متعدد المنصات"
        ],
        capabilitiesTitle: "ما أقوم بأتمتته",
        projectsTitle: "أعمال الأتمتة المميزة",
        excellentFor: "ممتاز لـ:",
        logoPart1: "ALHAL",
        logoPart2: "TECH",
        footerDesc: "هندسة المستقبل الرقمي من السليمانية إلى العالم.",
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
        automations: [
            {
                id: 1,
                icon: "users",
                title: "منشئ المحتوى بالذكاء الاصطناعي",
                tagline: "أنشئ محتوى مذهل بالذكاء الاصطناعي",
                description: "إنشاء صور ورسومات ومحتوى لوسائل التواصل الاجتماعي تلقائياً باستخدام الذكاء الاصطناعي. أنشئ منشورات وقصص ومواد تسويقية جذابة في ثوانٍ. مثالي للشركات التي تحتاج محتوى بصري عالي الجودة بشكل مستمر دون الحاجة لتوظيف فريق تصميم.",
                industries: ["وكالات التسويق", "صفحات التواصل الاجتماعي", "صناع المحتوى", "التجارة الإلكترونية"]
            },
            {
                id: 2,
                icon: "file",
                title: "سير عمل معالجة الفواتير",
                tagline: "من الإيصال إلى الدفاتر في ثوانٍ",
                description: "استخراج البيانات من الفواتير والإيصالات باستخدام تقنية OCR. التحقق من الإدخالات وفقاً لقواعد عملك، وتصنيف النفقات تلقائياً، والنشر المباشر في برنامج المحاسبة. تخلص من الإدخال اليدوي وقلل الأخطاء بنسبة 95%.",
                industries: ["البيع بالتجزئة", "الجملة", "التصنيع", "الخدمات"]
            },
            {
                id: 3,
                icon: "share",
                title: "جدولة وسائل التواصل الاجتماعي",
                tagline: "كن في كل مكان دون أن تكون متصلاً",
                description: "جدولة محتوى مدعومة بالذكاء الاصطناعي تحافظ على حضورك على وسائل التواصل الاجتماعي عبر منصات متعددة. تحليل أوقات النشر المثلى، وتوليد تنويعات المحتوى، وتتبع مقاييس التفاعل—كل ذلك يعمل تلقائياً.",
                industries: ["السوبرماركت", "العقارات", "المطاعم", "صفحات انستغرام"]
            },
            {
                id: 4,
                icon: "message",
                title: "روبوت دعم العملاء",
                tagline: "إجابات فورية، عملاء سعداء",
                description: "روبوت محادثة ذكي يتعامل مع استفسارات العملاء فوراً على مدار الساعة. يتصل بسلاسة بـ Instagram و Messenger و TikTok و WhatsApp وويدجت موقعك والمزيد. يستخدم الذكاء الاصطناعي لفهم الأسئلة ويوفر إجابات دقيقة ويصعّد المشكلات المعقدة لفريقك.",
                industries: ["التجارة الإلكترونية", "الرعاية الصحية", "البنوك"]
            },
            {
                id: 5,
                icon: "trending",
                title: "أتمتة تحليلات الأعمال",
                tagline: "قرارات مبنية على البيانات تلقائياً",
                description: "تجميع البيانات من جميع أدوات عملك—CRM والمحاسبة والتسويق والمزيد. إنشاء تقارير آلية، وتفعيل تنبيهات لمؤشرات الأداء الرئيسية، وتقديم الرؤى مباشرة إلى Slack أو البريد الإلكتروني.",
                industries: ["الشركات الناشئة", "الوكالات", "التجارة الإلكترونية", "المؤسسات"]
            },
            {
                id: 6,
                icon: "shield",
                title: "أتمتة الأمان والنسخ الاحتياطي",
                tagline: "راحة البال، مؤتمتة بالكامل",
                description: "مراقبة أنظمتك لاكتشاف التهديدات الأمنية، وإجراء نسخ احتياطي آلي عبر مزودي سحابة متعددين، وإرسال تنبيهات فورية إذا تم اكتشاف أي شيء غير عادي. تبقى بيانات عملك آمنة دون الحاجة إلى إشراف يدوي مستمر.",
                industries: ["المالية", "الرعاية الصحية", "القانون", "شركات التقنية"]
            }
        ],
        ctaButton: "ابدأ مشروعك"
    }
};

// Icon component mapping
const IconComponent = ({ name, className }: { name: string; className?: string }) => {
    switch (name) {
        case 'users':
            return <LucideUsers className={className} />;
        case 'file':
            return <LucideFileText className={className} />;
        case 'share':
            return <LucideShare2 className={className} />;
        case 'message':
            return <LucideMessageCircle className={className} />;
        case 'trending':
            return <LucideTrendingUp className={className} />;
        case 'shield':
            return <LucideShield className={className} />;
        default:
            return <LucideUsers className={className} />;
    }
};

type Lang = 'en' | 'ar';

export default function AutomationPortfolioPage() {
    const [lang, setLang] = useState<Lang>(() => {
        // Read saved language from localStorage, default to 'ar' (Arabic)
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
                                    {(t as any).ctaButton}
                                    <LucideExternalLink className="w-4 h-4 rtl:rotate-180" />
                                </Link>
                            </div>
                        </div>

                        {/* Automation Cards Grid */}
                        <div>
                            <h2 className="font-['Anton',sans-serif] text-3xl md:text-4xl font-normal uppercase text-[#1a1a1a] mb-10">
                                {t.projectsTitle}
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {t.automations.map((automation) => (
                                    <div
                                        key={automation.id}
                                        className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
                                    >
                                        {/* Decorative gradient background */}
                                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/40 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Icon */}
                                        <div className="relative z-10 w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                            <IconComponent name={automation.icon} className="w-7 h-7 text-[#1a1a1a]" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="relative z-10 text-xl font-bold text-white mb-2 transition-colors">
                                            {automation.title}
                                        </h3>

                                        {/* Tagline */}
                                        <p className="relative z-10 text-sm font-medium text-white/70 mb-4 italic">
                                            "{automation.tagline}"
                                        </p>

                                        {/* Description */}
                                        <p className="relative z-10 text-gray-400 text-sm leading-relaxed mb-5">
                                            {automation.description}
                                        </p>

                                        {/* Industry pills */}
                                        <div className="relative z-10">
                                            <h4 className="text-sm text-white font-bold mb-3">{t.excellentFor}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {automation.industries.map((industry: string, index: number) => (
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
