import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LucideArrowLeft, LucideMapPin, LucideBuilding2, LucideRocket, LucideUsers, LucideLightbulb, LucideShield, LucidePhone, LucideMail } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { CustomCursor } from "@/components/ui/custom-cursor"
import { usePageMeta } from '@/hooks/usePageMeta'

const translations = {
    en: {
        pageTitle: "About Us",
        pageSubtitle: "Building the digital future from Mosul & Sulaymaniyah to the world",
        backToHome: "Back to Home",
        logoPart1: "ALHAL",
        logoPart2: "TECH",

        // Company Info
        companyTitle: "Who We Are",
        companyDesc: "Al Hal Tech is a registered Iraqi technology company headquartered in Mosul & Sulaymaniyah, Iraq. We specialize in delivering innovative digital solutions that empower businesses to thrive in the modern digital landscape.",

        // Stats
        statLocation: "Mosul & Sulaymaniyah, Iraq",
        statLocationLabel: "Headquarters",
        statType: "Registered Company",
        statTypeLabel: "Legal Status",

        // Mission & Vision
        missionTitle: "Our Mission",
        missionDesc: "To bridge the gap between businesses and cutting-edge technology by providing accessible, affordable, and powerful digital solutions tailored to the unique needs of the Iraqi and Middle Eastern markets.",

        visionTitle: "Our Vision",
        visionDesc: "To become the leading technology partner for businesses across the region, known for innovation, reliability, and transforming ideas into impactful digital products.",

        // Values
        valuesTitle: "Our Values",
        value1Title: "Innovation",
        value1Desc: "We stay ahead of the curve, embracing new technologies to deliver future-proof solutions.",
        value2Title: "Client Focus",
        value2Desc: "Your success is our success. We work closely with you to understand and exceed your expectations.",
        value3Title: "Integrity",
        value3Desc: "Transparency and honesty are at the core of every relationship we build.",

        // Services Summary
        servicesTitle: "What We Do",
        service1: "AI & Automation Solutions",
        service2: "Web Development",
        service3: "Mobile App Development",
        service4: "Custom Software Development",

        // CTA
        ctaTitle: "Ready to Start Your Project?",
        ctaButton: "Contact Us",

        // Contact
        contactTitle: "Get In Touch",
    },
    ar: {
        pageTitle: "من نحن",
        pageSubtitle: "نبني المستقبل الرقمي من الموصل والسليمانية إلى العالم",
        backToHome: "العودة للرئيسية",
        logoPart1: "ALHAL",
        logoPart2: "TECH",

        // Company Info
        companyTitle: "من نحن",
        companyDesc: "الحل التقني هي شركة تكنولوجيا عراقية مسجلة، ومقرها في الموصل والسليمانية، العراق. نتخصص في تقديم حلول رقمية مبتكرة تمكّن الشركات من النجاح في العصر الرقمي الحديث.",

        // Stats
        statLocation: "الموصل والسليمانية، العراق",
        statLocationLabel: "المقر الرئيسي",
        statType: "شركة مسجلة",
        statTypeLabel: "الوضع القانوني",

        // Mission & Vision
        missionTitle: "رسالتنا",
        missionDesc: "سد الفجوة بين الشركات والتكنولوجيا المتطورة من خلال تقديم حلول رقمية سهلة الوصول وبأسعار معقولة ومصممة خصيصاً لتلبية احتياجات السوق العراقي والشرق أوسطي.",

        visionTitle: "رؤيتنا",
        visionDesc: "أن نصبح الشريك التقني الرائد للشركات في المنطقة، معروفين بالابتكار والموثوقية وتحويل الأفكار إلى منتجات رقمية مؤثرة.",

        // Values
        valuesTitle: "قيمنا",
        value1Title: "الابتكار",
        value1Desc: "نبقى في الطليعة، نتبنى التقنيات الجديدة لتقديم حلول جاهزة للمستقبل.",
        value2Title: "التركيز على العميل",
        value2Desc: "نجاحك هو نجاحنا. نعمل معك عن كثب لفهم توقعاتك وتجاوزها.",
        value3Title: "النزاهة",
        value3Desc: "الشفافية والصدق هما جوهر كل علاقة نبنيها.",

        // Services Summary
        servicesTitle: "ماذا نقدم",
        service1: "حلول الذكاء الاصطناعي والأتمتة",
        service2: "تطوير المواقع الإلكترونية",
        service3: "تطوير تطبيقات الجوال",
        service4: "تطوير البرمجيات المخصصة",

        // CTA
        ctaTitle: "جاهز لبدء مشروعك؟",
        ctaButton: "تواصل معنا",

        // Contact
        contactTitle: "تواصل معنا",
    }
};

type Lang = 'en' | 'ar';

export default function AboutPage() {
    usePageMeta({
        title: 'About Us | ALHAL TECH',
        description: 'Al Hal Tech is a registered Iraqi technology company with offices in Mosul and Sulaymaniyah, delivering AI, automation, web and mobile solutions.',
        canonical: 'https://alhaltech.com/about',
    })

    const [lang, setLang] = useState<Lang>(() => {
        const savedLang = localStorage.getItem('alhaltech-lang');
        return (savedLang === 'ar' || savedLang === 'en') ? savedLang : 'ar';
    });
    const t = translations[lang];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        localStorage.setItem('alhaltech-lang', lang);
    }, [lang]);

    return (
        <>
            <CustomCursor variant="light" />
            <div className="min-h-screen bg-[#1a1a1a]">
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

                {/* Main Content */}
                <main className="pt-24 pb-16 px-4">
                    <div className="container max-w-5xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <h1 className="font-['Anton',sans-serif] text-5xl md:text-6xl lg:text-7xl font-normal uppercase text-[#e8e4df] mb-4">
                                {t.pageTitle}
                            </h1>
                            <p className="text-gray-400 text-xl">{t.pageSubtitle}</p>
                        </div>

                        {/* Company Info Cards */}
                        <div className="grid md:grid-cols-2 gap-6 mb-16">
                            <div className="bg-[#2d2d2d] rounded-2xl p-8 border border-white/5 flex items-center gap-6">
                                <div className="w-16 h-16 bg-brand-cyan/10 rounded-2xl flex items-center justify-center shrink-0">
                                    <LucideMapPin className="w-8 h-8 text-brand-cyan" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">{t.statLocationLabel}</p>
                                    <p className="text-white text-2xl font-bold">{t.statLocation}</p>
                                </div>
                            </div>
                            <div className="bg-[#2d2d2d] rounded-2xl p-8 border border-white/5 flex items-center gap-6">
                                <div className="w-16 h-16 bg-brand-red/10 rounded-2xl flex items-center justify-center shrink-0">
                                    <LucideBuilding2 className="w-8 h-8 text-brand-red" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">{t.statTypeLabel}</p>
                                    <p className="text-white text-2xl font-bold">{t.statType}</p>
                                </div>
                            </div>
                        </div>

                        {/* Company Description */}
                        <div className="bg-[#2d2d2d] rounded-3xl p-10 border border-white/5 mb-16">
                            <h2 className="font-['Anton',sans-serif] text-3xl font-normal uppercase text-[#e8e4df] mb-6">
                                {t.companyTitle}
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {t.companyDesc}
                            </p>
                        </div>

                        {/* Mission & Vision */}
                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                            <div className="bg-gradient-to-br from-brand-cyan/10 to-transparent rounded-3xl p-10 border border-brand-cyan/20">
                                <div className="w-14 h-14 bg-brand-cyan/20 rounded-2xl flex items-center justify-center mb-6">
                                    <LucideRocket className="w-7 h-7 text-brand-cyan" />
                                </div>
                                <h3 className="font-['Anton',sans-serif] text-2xl font-normal uppercase text-[#e8e4df] mb-4">
                                    {t.missionTitle}
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {t.missionDesc}
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-brand-red/10 to-transparent rounded-3xl p-10 border border-brand-red/20">
                                <div className="w-14 h-14 bg-brand-red/20 rounded-2xl flex items-center justify-center mb-6">
                                    <LucideLightbulb className="w-7 h-7 text-brand-red" />
                                </div>
                                <h3 className="font-['Anton',sans-serif] text-2xl font-normal uppercase text-[#e8e4df] mb-4">
                                    {t.visionTitle}
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {t.visionDesc}
                                </p>
                            </div>
                        </div>

                        {/* Values */}
                        <div className="mb-16">
                            <h2 className="font-['Anton',sans-serif] text-3xl font-normal uppercase text-[#e8e4df] mb-8 text-center">
                                {t.valuesTitle}
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-[#2d2d2d] rounded-2xl p-8 border border-white/5 text-center">
                                    <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <LucideLightbulb className="w-7 h-7 text-purple-400" />
                                    </div>
                                    <h4 className="text-white font-bold text-lg mb-2">{t.value1Title}</h4>
                                    <p className="text-gray-400 text-sm">{t.value1Desc}</p>
                                </div>
                                <div className="bg-[#2d2d2d] rounded-2xl p-8 border border-white/5 text-center">
                                    <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <LucideUsers className="w-7 h-7 text-green-400" />
                                    </div>
                                    <h4 className="text-white font-bold text-lg mb-2">{t.value2Title}</h4>
                                    <p className="text-gray-400 text-sm">{t.value2Desc}</p>
                                </div>
                                <div className="bg-[#2d2d2d] rounded-2xl p-8 border border-white/5 text-center">
                                    <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <LucideShield className="w-7 h-7 text-blue-400" />
                                    </div>
                                    <h4 className="text-white font-bold text-lg mb-2">{t.value3Title}</h4>
                                    <p className="text-gray-400 text-sm">{t.value3Desc}</p>
                                </div>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="bg-[#2d2d2d] rounded-3xl p-10 border border-white/5 mb-16">
                            <h2 className="font-['Anton',sans-serif] text-3xl font-normal uppercase text-[#e8e4df] mb-8 text-center">
                                {t.servicesTitle}
                            </h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-[#1a1a1a] rounded-xl p-6 text-center border border-white/5">
                                    <p className="text-white font-medium">{t.service1}</p>
                                </div>
                                <div className="bg-[#1a1a1a] rounded-xl p-6 text-center border border-white/5">
                                    <p className="text-white font-medium">{t.service2}</p>
                                </div>
                                <div className="bg-[#1a1a1a] rounded-xl p-6 text-center border border-white/5">
                                    <p className="text-white font-medium">{t.service3}</p>
                                </div>
                                <div className="bg-[#1a1a1a] rounded-xl p-6 text-center border border-white/5">
                                    <p className="text-white font-medium">{t.service4}</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact / Social */}
                        <div className="bg-[#2d2d2d] rounded-3xl p-10 border border-white/5 mb-16">
                            <h2 className="font-['Anton',sans-serif] text-3xl font-normal uppercase text-[#e8e4df] mb-8 text-center">
                                {t.contactTitle}
                            </h2>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a href="https://www.facebook.com/profile.php?id=61586347270934" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-[#1a1a1a] hover:bg-[#1877F2] text-white px-6 py-4 rounded-xl border border-white/5 transition-all hover:-translate-y-1">
                                    <FaFacebookF className="w-5 h-5" />
                                    <span className="font-medium">Facebook</span>
                                </a>
                                <a href="https://www.instagram.com/alhal.tech/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-[#1a1a1a] hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCAF45] text-white px-6 py-4 rounded-xl border border-white/5 transition-all hover:-translate-y-1">
                                    <FaInstagram className="w-5 h-5" />
                                    <span className="font-medium">Instagram</span>
                                </a>
                                <a href="https://wa.me/9647783782248" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-[#1a1a1a] hover:bg-[#25D366] text-white px-6 py-4 rounded-xl border border-white/5 transition-all hover:-translate-y-1">
                                    <FaWhatsapp className="w-5 h-5" />
                                    <span className="font-medium">WhatsApp</span>
                                </a>
                                <a href="tel:+9647783782248" className="flex items-center gap-3 bg-[#1a1a1a] hover:bg-brand-cyan text-white px-6 py-4 rounded-xl border border-white/5 transition-all hover:-translate-y-1">
                                    <LucidePhone className="w-5 h-5" />
                                    <span className="font-medium" dir="ltr">+964 778 378 2248</span>
                                </a>
                                <a href="mailto:info@alhaltech.com" className="flex items-center gap-3 bg-[#1a1a1a] hover:bg-brand-red text-white px-6 py-4 rounded-xl border border-white/5 transition-all hover:-translate-y-1">
                                    <LucideMail className="w-5 h-5" />
                                    <span className="font-medium">info@alhaltech.com</span>
                                </a>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="text-center">
                            <h2 className="font-['Anton',sans-serif] text-3xl md:text-4xl font-normal uppercase text-[#e8e4df] mb-6">
                                {t.ctaTitle}
                            </h2>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white font-bold text-lg px-10 py-4 rounded-2xl transition-all shadow-lg shadow-brand-red/20 hover:shadow-xl hover:shadow-brand-red/30 hover:-translate-y-1"
                            >
                                {t.ctaButton}
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
