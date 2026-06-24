import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LucideArrowLeft } from 'lucide-react'
import { CustomCursor } from "@/components/ui/custom-cursor"
import { usePageMeta } from '@/hooks/usePageMeta'

const translations = {
    en: {
        pageTitle: "Terms of Service",
        lastUpdated: "Last Updated: January 2025",
        backToHome: "Back to Home",
        logoPart1: "ALHAL",
        logoPart2: "TECH",

        intro: "This website is owned by Al Hal Tech Company, headquartered in Mosul & Sulaymaniyah, Iraq. This page outlines all the terms and conditions for using the Al Hal Tech website and services.",

        section1Title: "Acceptance of Terms",
        section1Content: "By using this website and/or the services provided therein, you expressly agree to comply with all terms and conditions of use and all applicable laws and regulations. You agree that you are responsible for compliance with applicable local and international laws. We reserve the right to update or change the terms and conditions of use at any time without prior notice, and these amendments shall be effective from the date of publication.",

        section2Title: "Definitions",
        section2List: [
            "\"Client\", \"Customer\", \"You\", \"Your\" refer to you as a user of Al Hal Tech services",
            "\"We\", \"Our\", \"Ourselves\" refer to Al Hal Tech",
            "\"Parties\" and/or \"We\" refer to both parties (us and you)"
        ],

        section3Title: "Age Requirement",
        section3Content: "You may not use this website or the services provided if you are under (18) years of age. By agreeing to these terms, you confirm that you are at least the age specified in this clause. If registering a personal account for a legal entity (company, institution, association, or other), you confirm that you are authorized by that legal entity and have full authority to create the account and use the website and its services on its behalf.",

        section4Title: "Acceptable Use",
        section4Intro: "Users must use the services for legitimate purposes only. In particular, they may not:",
        section4List: [
            "Use any obscene, threatening, offensive, abusive, defamatory materials or those that violate any law or regulation",
            "Use the services of this company to make other users or third parties receive unwanted or unauthorized advertisements",
            "Collect or store personal data of other users or third parties",
            "Intentionally or accidentally exploit company services to cause harm or malfunction to the company's systems"
        ],
        section4Warning: "Any violation of the above authorizes the company to terminate your use of the services and/or delete all accounts belonging to you.",

        section5Title: "Our Services",
        section5Intro: "Al Hal Tech provides automation and digital solutions services, including:",
        section5List: [
            "AI-powered customer service automation",
            "Custom workflow automation using n8n",
            "Web development and design",
            "Mobile application development",
            "Custom software development",
            "AI content creation and social media management"
        ],

        section6Title: "Pricing & Payment",
        section6Content: "Prices displayed on the website are estimates and may vary depending on project size and specific requirements. The final price will be determined after discussing the project details. Payment is made according to the terms agreed upon in the service contract. Payment terms may include an advance payment and installments based on work progress.",

        section7Title: "Intellectual Property",
        section7Content: "All rights, including copyright, in the website content are owned or controlled by Al Hal Tech. Users may use the content only for personal, non-commercial use. Users are not permitted to copy, broadcast, download, store, transfer, display, play partially or fully, adapt, or change the website content in any way for any other purpose without obtaining permission from the company.",

        section8Title: "Disclaimer",
        section8List: [
            "The company makes no warranties regarding the accuracy of information or completeness of content or legality and reliability of information displayed",
            "The company excludes, to the extent permitted by law, any warranties of any kind relating to infringement of property rights including intellectual rights",
            "The company disclaims any liability for any damages of any kind that any user may incur when using the services"
        ],

        section9Title: "Governing Law",
        section9Content: "You agree that all matters relating to your access to or use of the site and use of the services it provides, including all disputes, shall be governed by the laws of the Republic of Iraq.",

        section10Title: "Contact Us",
        section10Content: "For inquiries about these terms and conditions or any other matters related to the services, please contact us at:",
        section10Email: "Email: info@alhaltech.com",
        section10Phone: "Phone: +964 778 378 2248",

        copyright: "© 2025 Al Hal Tech. All rights reserved."
    },
    ar: {
        pageTitle: "الشروط والأحكام",
        lastUpdated: "آخر تحديث: يناير 2025",
        backToHome: "العودة للرئيسية",
        logoPart1: "ALHAL",
        logoPart2: "TECH",

        intro: "هذا الموقع مملوك من قبل شركة الحل التقني، ومقرها في الموصل والسليمانية، العراق. توضح هذه الصفحة جميع الشروط والقوانين التي تخص استخدام موقع وخدمات شركة الحل التقني.",

        section1Title: "قبول الشروط",
        section1Content: "يعتبر استخدامك لهذا الموقع و/أو الخدمات المُقدمة فيه موافقة صريحة منك على الالتزام بجميع الأحكام وشروط الاستخدام وجميع القوانين والأنظمة المعمول بها. وتوافق على أن تكون مسؤولاً عن الامتثال للقوانين المحلية والدولية المعمول بها. كما نحتفظ نحن بحق تحديث أو تغيير أحكام وشروط الاستخدام في أي وقت كان من دون إنذار مسبق بحيث تكون هذه التعديلات نافذة المفعول من تاريخ نشرها.",

        section2Title: "التعريفات",
        section2List: [
            "\"عميل\"، \"زبون\"، \"أنت\"، \"الخاص بك\" تشير إليك أنت كمُستخدم لخدمات شركة الحل التقني",
            "\"نحن\"، \"الخاص بنا\"، \"أنفسنا\" تشير إلى شركة الحل التقني",
            "\"الأطراف\" و/أو \"نحن\" تشير إلى كلا الطرفين (نحن وأنتم)"
        ],

        section3Title: "شرط العمر",
        section3Content: "لا يجوز استعمال هذا الموقع أو الخدمات المقدمة فيه إذا كان عمرك أقل من (18) سنة. حيث إنك تقر بموجب هذا وتوافق على أن عمرك لا يقل عن السن المحدد بهذا البند. في حالة تسجيل حساب شخصي لشخص معنوي (شركة أو مؤسسة أو جمعية أو غيرها) أنت تقر بأنك مفوض من قبل ذلك الشخص المعنوي وتملك كامل الصلاحية لإنشاء الحساب واستخدام الموقع والاستفادة من خدماته باسمه وبالنيابة عنه.",

        section4Title: "الاستخدام المقبول",
        section4Intro: "يجب على المستخدمين استخدام الخدمات للأغراض المشروعة فقط وعلى وجه الخصوص لا يجوز لهم:",
        section4List: [
            "استخدام أي مواد فاحشة أو تهديدية أو هجومية أو مسيئة أو تشهيرية أو تلك المواد التي تنتهك أي قانون أو لائحة",
            "الاستفادة من خدمات هذه الشركة لجعل المُستخدمين الآخرين أو الأطراف الثالثة يتلقون إعلانات غير مرغوب فيها أو غير مصرح بها",
            "جمع أو تخزين البيانات الشخصية الخاصة بالمستخدمين الآخرين أو الأطراف الثالثة",
            "استغلال خدمات الشركة عن قصد أو عن طريق الخطأ لإلحاق الضرر أو التسبب بخلل أو عطل بنظام الشركة"
        ],
        section4Warning: "أي خرق لما سبق ذكره يخول الشركة إنهاء استخدامك للخدمات و/أو حذف جميع الحسابات التابعة لك.",

        section5Title: "خدماتنا",
        section5Intro: "تقدم شركة الحل التقني خدمات الأتمتة والحلول الرقمية، بما في ذلك:",
        section5List: [
            "أتمتة خدمة العملاء باستخدام الذكاء الاصطناعي",
            "أتمتة سير العمل المخصصة باستخدام n8n أو make.com أو Python حسب الطلب",
            "تطوير وتصميم المواقع الإلكترونية",
            "تطوير تطبيقات الجوال",
            "تطوير البرمجيات المخصصة",
            "إنشاء المحتوى بالذكاء الاصطناعي وإدارة وسائل التواصل الاجتماعي"
        ],

        section6Title: "الأسعار والدفع",
        section6Content: "الأسعار المعروضة على الموقع هي أسعار تقديرية وقد تختلف حسب حجم المشروع ومتطلباته الخاصة. سيتم تحديد السعر النهائي بعد مناقشة تفاصيل المشروع. يتم الدفع وفقاً للشروط المتفق عليها في عقد الخدمة. قد تشمل شروط الدفع دفعة مقدمة ودفعات على مراحل حسب تقدم العمل.",

        section7Title: "الملكية الفكرية",
        section7Content: "جميع الحقوق، بما في ذلك حقوق النشر، في محتوى الموقع مملوكة أو مسيطر عليها من قبل شركة الحل التقني. ويجوز للمستخدمين استخدام المحتوى فقط للاستخدام الشخصي غير التجاري. لا يُسمح للمستخدمين بنسخ أو بث أو تنزيل أو تخزين أو نقل أو عرض أو تشغيل جزئياً أو كلياً أو تكييف أو تغيير محتوى الموقع بأي شكل من الأشكال لأي غرض آخر دون الحصول على إذن من الشركة.",

        section8Title: "إخلاء المسؤولية",
        section8List: [
            "لا تقدم الشركة أي ضمانات فيما يتعلق بدقة المعلومات أو اكتمال المُحتوى أو قانونية وموثوقية المعلومات التي يتم عرضها",
            "تستثني الشركة، بقدر ما يسمح به القانون، أي ضمانات من أي نوع يتعلق بالتعدي على حقوق الملكية بما في ذلك الحقوق الفكرية",
            "تتنصل الشركة من أي مسؤولية عن أي أضرار من أي نوع قد يتكبدها أي مستخدم عند استخدام الخدمات"
        ],

        section9Title: "القانون الحاكم",
        section9Content: "أنت توافق على أن جميع الأمور المتعلقة بوصولك إلى الموقع أو استخدامه واستخدام الخدمات التي يقدمها، بما في ذلك جميع النزاعات، ستخضع لقوانين جمهورية العراق.",

        section10Title: "تواصل معنا",
        section10Content: "للاستفسارات حول هذه الشروط والأحكام أو أي أمور أخرى متعلقة بالخدمات، يرجى التواصل معنا على:",
        section10Email: "البريد الإلكتروني: info@alhaltech.com",
        section10Phone: "الهاتف: +964 778 378 2248",

        copyright: "© 2025 الحل التقني. جميع الحقوق محفوظة."
    }
};

type Lang = 'en' | 'ar';

export default function TermsOfServicePage() {
    usePageMeta({ title: 'Terms of Service | ALHAL TECH', description: 'Terms and conditions for using Al Hal Tech website and services.', canonical: 'https://alhaltech.com/terms-of-service' });
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
                                <ul className="space-y-2">
                                    {t.section2List.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-400">
                                            <div className="w-2 h-2 bg-brand-cyan rounded-full mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Section 3 */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-4">{t.section3Title}</h2>
                                <p className="text-gray-400 leading-relaxed">{t.section3Content}</p>
                            </div>

                            {/* Section 4 */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-4">{t.section4Title}</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">{t.section4Intro}</p>
                                <ul className="space-y-2 mb-4">
                                    {t.section4List.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-400">
                                            <div className="w-2 h-2 bg-brand-red rounded-full mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-brand-red font-medium">{t.section4Warning}</p>
                            </div>

                            {/* Section 5 */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-4">{t.section5Title}</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">{t.section5Intro}</p>
                                <ul className="space-y-2">
                                    {t.section5List.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-400">
                                            <div className="w-2 h-2 bg-brand-cyan rounded-full mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Section 6 */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-4">{t.section6Title}</h2>
                                <p className="text-gray-400 leading-relaxed">{t.section6Content}</p>
                            </div>

                            {/* Section 7 */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-4">{t.section7Title}</h2>
                                <p className="text-gray-400 leading-relaxed">{t.section7Content}</p>
                            </div>

                            {/* Section 8 */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-4">{t.section8Title}</h2>
                                <ul className="space-y-2">
                                    {t.section8List.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-400">
                                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Section 9 */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-4">{t.section9Title}</h2>
                                <p className="text-gray-400 leading-relaxed">{t.section9Content}</p>
                            </div>

                            {/* Section 10 */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-4">{t.section10Title}</h2>
                                <p className="text-gray-400 leading-relaxed mb-2">{t.section10Content}</p>
                                <p className="text-white">{t.section10Email}</p>
                                <p className="text-white">
                                    {lang === 'ar' ? 'الهاتف: ' : 'Phone: '}
                                    <span dir="ltr" className="inline-block">+964 778 378 2248</span>
                                </p>
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
