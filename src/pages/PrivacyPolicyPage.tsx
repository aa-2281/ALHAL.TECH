import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LucideArrowLeft } from 'lucide-react'
import { CustomCursor } from "@/components/ui/custom-cursor"
import { usePageMeta } from '@/hooks/usePageMeta'

const translations = {
    en: {
        pageTitle: "Privacy Policy",
        lastUpdated: "Last Updated: January 2025",
        backToHome: "Back to Home",
        logoPart1: "ALHAL",
        logoPart2: "TECH",

        intro: "This website is owned by Al Hal Tech Company, headquartered in Mosul & Sulaymaniyah, Iraq. This document can be printed for reference using the print command in any browser settings.",

        section1Title: "Our Commitment to Your Privacy",
        section1Content: "We value your concerns and interest regarding the privacy of your data on the internet. This policy has been prepared to help you understand the nature of the data we collect when you visit our website and how we handle this personal data.",

        section2Title: "Data We Collect",
        section2Content: "Among the data that this website collects from you are your full name, email address, phone number, and business/project details. All this data is information that you provide to us when requested, and not providing this data may make this website unable to provide the services you request.",

        section3Title: "How We Use Your Data",
        section3List: [
            "To provide and improve our services",
            "To communicate with you about your projects",
            "To send important updates and notifications",
            "To analyze and improve our website performance"
        ],

        section4Title: "Data Sharing",
        section4Content: "Your data will not be sold or shared with any other party except government authorities and state institutions as required by law. You are free to request deletion or modification of this data by contacting us at info@alhaltech.com.",

        section5Title: "Analytics & Cookies",
        section5Content: "There is some other data that is automatically collected through Google Analytics service, which helps identify the website audience and other details about visitors that help us understand our audience and how visitors interact with the site to ensure we continue to provide the best services. This website also records your cookies and we have the right to work with any other party to analyze this data to improve the quality of services we provide to our valued customers.",

        section6Title: "Data Security",
        section6Content: "The owner of this website takes appropriate security measures to prevent unauthorized access, disclosure, modification, or unauthorized destruction of data. Data is processed using computers and IT-enabled tools, following organizational procedures and methods strictly related to the purposes indicated.",

        section7Title: "Your Rights",
        section7List: [
            "Request access to your personal data",
            "Request correction or deletion of your data",
            "Object to the processing of your personal data",
            "Request restriction of processing"
        ],
        section7Contact: "For inquiries about privacy rights or to request deletion or modification of data, please contact us at: info@alhaltech.com",

        section8Title: "Policy Updates",
        section8Content: "We reserve the right to update or change the privacy policy at any time without prior notice, and these amendments shall be effective from the date of publication. Therefore, we invite you to review the privacy policy whenever you decide to use the website.",

        copyright: "© 2025 Al Hal Tech. All rights reserved."
    },
    ar: {
        pageTitle: "سياسة الخصوصية",
        lastUpdated: "آخر تحديث: يناير 2025",
        backToHome: "العودة للرئيسية",
        logoPart1: "ALHAL",
        logoPart2: "TECH",

        intro: "هذا الموقع مملوك من قبل شركة الحل التقني، ومقرها في الموصل والسليمانية، العراق. يمكن طباعة هذا المستند كمرجع باستخدام أمر الطباعة في إعدادات أي متصفح.",

        section1Title: "التزامنا بخصوصيتك",
        section1Content: "نحن نقدر مخاوفكم واهتمامكم بشأن خصوصية بياناتكم على شبكة الإنترنت. ولقد تم إعداد هذه السياسة لمساعدتكم في فهم طبيعة البيانات التي نقوم بتجميعها منكم عند زيارتكم لموقعنا على شبكة الانترنت وكيفية تعاملنا مع هذه البيانات الشخصية.",

        section2Title: "البيانات التي نجمعها",
        section2Content: "من بين البيانات التي يقوم هذا الموقع بجمعها عنك هي اسمك الكامل وعنوان البريد الإلكتروني ورقم هاتفك وتفاصيل العمل/المشروع. حيث إن جميع هذه البيانات هي بيانات تقوم أنت بتزويدها لنا حين يتم طلبها منك، وعدم تقديم هذه البيانات قد يؤدي إلى جعل هذا الموقع غير قادر على تقديم الخدمات التي تطلبونها.",

        section3Title: "كيف نستخدم بياناتك",
        section3List: [
            "لتقديم وتحسين خدماتنا",
            "للتواصل معك بشأن مشاريعك",
            "لإرسال التحديثات والإشعارات المهمة",
            "لتحليل وتحسين أداء موقعنا"
        ],

        section4Title: "مشاركة البيانات",
        section4Content: "سوف لن يتم بيع أو مشاركة هذه البيانات مع أي طرف آخر ما عدا الحكومات ومؤسسات الدولة حسب ما يقتضيه القانون. ولك مُطلق الحرية في طلب حذف هذه البيانات أو تعديلها من خلال التواصل معنا على info@alhaltech.com.",

        section5Title: "التحليلات وملفات تعريف الارتباط",
        section5Content: "هنالك بعض البيانات الأخرى التي يتم جمعها تلقائياً من خلال خدمة Google Analytics والتي تعمل بدورها على تحديد جمهور الموقع وبعض التفاصيل الأخرى التي تخص زوار الموقع والتي تساعدنا بدورها على معرفة جمهورنا وطريقة تعامل زوارنا مع الموقع لكي نضمن الاستمرار في تقديم أفضل الخدمات. يقوم هذا الموقع أيضاً بتسجيل ملفات تعريف الارتباط (Cookies) الخاصة بك ويحق لنا التعامل مع أي طرف آخر لتحليل هذه البيانات من أجل تحسين جودة الخدمات التي نقدمها لعملائنا الكرام.",

        section6Title: "أمان البيانات",
        section6Content: "يتخذ مالك هذا الموقع تدابير أمنية مناسبة لمنع الوصول غير المصرح به أو الكشف أو التعديل أو التدمير غير المصرح به للبيانات. حيث تتم معالجة البيانات باستخدام أجهزة الكمبيوتر والأدوات الممكّنة لتكنولوجيا المعلومات، باتباع الإجراءات التنظيمية والأساليب المرتبطة بشكل صارم بالأغراض المشار إليها.",

        section7Title: "حقوقك",
        section7List: [
            "طلب الوصول إلى بياناتك الشخصية",
            "طلب تصحيح أو حذف بياناتك",
            "الاعتراض على معالجة بياناتك الشخصية",
            "طلب تقييد المعالجة"
        ],
        section7Contact: "للاستفسار حول حقوق الخصوصية أو لطلب حذف أو تعديل البيانات، يرجى التواصل معنا على: info@alhaltech.com",

        section8Title: "تحديثات السياسة",
        section8Content: "نحتفظ بحق تحديث أو تغيير سياسة الخصوصية في أي وقت من دون إنذار مسبق بحيث تكون هذه التعديلات نافذة المفعول من تاريخ نشرها. لذلك، ندعوك لمراجعة سياسة الخصوصية كلما قررت استخدام الموقع.",

        copyright: "© 2025 الحل التقني. جميع الحقوق محفوظة."
    }
};

type Lang = 'en' | 'ar';

export default function PrivacyPolicyPage() {
    usePageMeta({ title: 'Privacy Policy | ALHAL TECH', description: 'How Al Hal Tech collects, uses, and protects your data.', canonical: 'https://alhaltech.com/privacy-policy' });
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
                    <div className="container max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="font-['Anton',sans-serif] text-4xl md:text-5xl lg:text-6xl font-normal uppercase text-[#e8e4df] mb-4">
                                {t.pageTitle}
                            </h1>
                            <p className="text-gray-500">{t.lastUpdated}</p>
                        </div>

                        {/* Content */}
                        <div className="bg-[#2d2d2d] rounded-3xl p-8 md:p-12 border border-white/5 space-y-8">
                            <p className="text-gray-400 leading-relaxed">
                                {t.intro}
                            </p>

                            {/* Section 1 */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-4">{t.section1Title}</h2>
                                <p className="text-gray-400 leading-relaxed">{t.section1Content}</p>
                            </div>

                            {/* Section 2 */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-4">{t.section2Title}</h2>
                                <p className="text-gray-400 leading-relaxed">{t.section2Content}</p>
                            </div>

                            {/* Section 3 */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-4">{t.section3Title}</h2>
                                <ul className="space-y-2">
                                    {t.section3List.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-400">
                                            <div className="w-2 h-2 bg-brand-cyan rounded-full mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Section 4 */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-4">{t.section4Title}</h2>
                                <p className="text-gray-400 leading-relaxed">{t.section4Content}</p>
                            </div>

                            {/* Section 5 */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-4">{t.section5Title}</h2>
                                <p className="text-gray-400 leading-relaxed">{t.section5Content}</p>
                            </div>

                            {/* Section 6 */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-4">{t.section6Title}</h2>
                                <p className="text-gray-400 leading-relaxed">{t.section6Content}</p>
                            </div>

                            {/* Section 7 */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-4">{t.section7Title}</h2>
                                <ul className="space-y-2 mb-4">
                                    {t.section7List.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-400">
                                            <div className="w-2 h-2 bg-brand-cyan rounded-full mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-gray-400 leading-relaxed">{t.section7Contact}</p>
                            </div>

                            {/* Section 8 */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-4">{t.section8Title}</h2>
                                <p className="text-gray-400 leading-relaxed">{t.section8Content}</p>
                            </div>

                            {/* Copyright */}
                            <div className="pt-8 border-t border-white/10 text-center">
                                <p className="text-gray-500">{t.copyright}</p>
                                <Link to="/" className="text-brand-cyan hover:underline mt-2 inline-block">
                                    {t.backToHome}
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
