import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { LucideSend, LucideArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CustomCursor } from "@/components/ui/custom-cursor"

const translations = {
    en: {
        pageTitle: "Service Request Form",
        pageSubtitle: "Fill out the form below and we'll get back to you within 24 hours.",
        backToHome: "Back to Home",
        formName: "Full Name",
        formBusiness: "Business Name",
        formPhone: "Phone (WhatsApp)",
        formLink: "Website or Social Link",
        formService: "Select Service",
        formProblem: "Problem to Solve",
        formExpected: "Expected Outcome",
        formBudget: "Estimated Budget",
        formBudgetPlaceholder: "e.g. $1000 - $2000",
        formNotes: "Additional Notes",
        formPlaceholderName: "Enter your full name",
        formPlaceholderBusiness: "Enter your business name",
        formPlaceholderPhone: "Enter your phone number",
        formPlaceholderLink: "https://...",
        formPlaceholderProblem: "Describe the problem you want to automate in detail...",
        formPlaceholderExpected: "Describe the desired result after automation...",
        formPlaceholderNotes: "Any extra details you want to share...",
        formAutomationService: "Automation AI solution",
        formAppDev: "App Development",
        formWebDev: "Website Development",
        formCustomSoftware: "Custom software for your business",
        formSubmit: "Send Request",
        successMessage: "Sent Successfully!",
        logoPart1: "ALHAL",
        logoPart2: "TECH",
    },
    ar: {
        pageTitle: "نموذج طلب الخدمة",
        pageSubtitle: "املأ النموذج أدناه وسنتواصل معك خلال 24 ساعة.",
        backToHome: "العودة للرئيسية",
        formName: "الاسم الكامل",
        formBusiness: "اسم المشروع / البزنس",
        formPhone: "رقم الهاتف (مع واتساب)",
        formLink: "رابط الموقع أو حساب الإنستغرام",
        formService: "اختر الخدمة",
        formProblem: "وصف المشكلة التي تريد أتمتتها",
        formExpected: "النتيجة المتوقعة",
        formBudget: "الميزانية التقديرية",
        formBudgetPlaceholder: "مثال: 1000-2000 دولار (اختياري)",
        formNotes: "ملاحظات إضافية",
        formPlaceholderName: "أدخل اسمك الكامل",
        formPlaceholderBusiness: "أدخل اسم عملك",
        formPlaceholderPhone: "أدخل رقم هاتفك",
        formPlaceholderLink: "https://...",
        formPlaceholderProblem: "اشرح المشكلة التي تريد أتمتتها بالتفصيل...",
        formPlaceholderExpected: "اشرح النتيجة المرجوة بعد الأتمتة...",
        formPlaceholderNotes: "أي تفاصيل إضافية تريد مشاركتها (اختياري)...",
        formAutomationService: "حلول الأتمتة بالذكاء الاصطناعي",
        formAppDev: "تطوير تطبيقات الجوال",
        formWebDev: "تطوير المواقع الإلكترونية",
        formCustomSoftware: "برمجيات مخصصة لعملك",
        formSubmit: "إرسال الطلب",
        successMessage: "تم الإرسال بنجاح!",
        logoPart1: "ALHAL",
        logoPart2: "TECH",
    }
};

type Lang = 'en' | 'ar';

export default function ContactPage() {
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

    const [formData, setFormData] = useState({
        full_name: '',
        business_name: '',
        phone: '',
        link: '',
        service_name: '',
        problem_description: '',
        expected_result: '',
        budget: '',
        notes: ''
    });
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.service_name || !formData.full_name || !formData.phone) {
            alert(lang === 'ar' ? "يرجى ملء الحقول الأساسية (الاسم، الهاتف، والخدمة)" : "Please fill in the basic fields (Name, Phone, and Service)");
            return;
        }

        setIsSending(true);
        try {
            const emailData = {
                ...formData,
                name: formData.full_name,
                time: new Date().toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                })
            };
            await emailjs.send(
                'service_3uoe609',
                'template_ne9ctc4',
                emailData as any,
                'mVQbB9UW39MlhBVPg'
            );
            setIsSent(true);
            setTimeout(() => setIsSent(false), 5000);
            setFormData({
                full_name: '',
                business_name: '',
                phone: '',
                link: '',
                service_name: '',
                problem_description: '',
                expected_result: '',
                budget: '',
                notes: ''
            });
        } catch (error) {
            console.error('EmailJS Error:', error);
            alert(lang === 'ar' ? "فشل إرسال الطلب. يرجى المحاولة لاحقاً." : "Failed to send request. Please try again later.");
        } finally {
            setIsSending(false);
        }
    };

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
                    <div className="container max-w-2xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="font-['Anton',sans-serif] text-4xl md:text-5xl lg:text-6xl font-normal uppercase text-[#e8e4df] mb-4">
                                {t.pageTitle}
                            </h1>
                            <p className="text-gray-400 text-lg">{t.pageSubtitle}</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSend} className="bg-[#2d2d2d] rounded-3xl p-8 sm:p-10 border border-white/5 shadow-2xl">
                            <div className="space-y-6">
                                {/* Basic Info */}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 block">{t.formName}</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder={t.formPlaceholderName}
                                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-cyan outline-none transition-all"
                                            value={formData.full_name}
                                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 block">{t.formBusiness}</label>
                                        <input
                                            type="text"
                                            placeholder={t.formPlaceholderBusiness}
                                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-cyan outline-none transition-all"
                                            value={formData.business_name}
                                            onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 block">{t.formPhone}</label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder={t.formPlaceholderPhone}
                                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-cyan outline-none transition-all"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 block">{t.formLink}</label>
                                        <input
                                            type="url"
                                            placeholder={t.formPlaceholderLink}
                                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-cyan outline-none transition-all"
                                            value={formData.link}
                                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Service Selection */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 block">{t.formService}</label>
                                    <div className="relative">
                                        <select
                                            required
                                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-cyan outline-none transition-all appearance-none"
                                            value={formData.service_name}
                                            onChange={(e) => setFormData({ ...formData, service_name: e.target.value })}
                                        >
                                            <option value="">{t.formService}</option>
                                            <option value="Automation AI solution">{t.formAutomationService}</option>
                                            <option value="App Development">{t.formAppDev}</option>
                                            <option value="Website Development">{t.formWebDev}</option>
                                            <option value="Custom software">{t.formCustomSoftware}</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Conditional Fields for AI Automation */}
                                {formData.service_name === "Automation AI solution" ? (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300 block">{t.formProblem}</label>
                                            <textarea
                                                rows={3}
                                                placeholder={t.formPlaceholderProblem}
                                                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-cyan outline-none resize-none transition-all"
                                                value={formData.problem_description}
                                                onChange={(e) => setFormData({ ...formData, problem_description: e.target.value })}
                                            ></textarea>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300 block">{t.formExpected}</label>
                                            <textarea
                                                rows={3}
                                                placeholder={t.formPlaceholderExpected}
                                                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-cyan outline-none resize-none transition-all"
                                                value={formData.expected_result}
                                                onChange={(e) => setFormData({ ...formData, expected_result: e.target.value })}
                                            ></textarea>
                                        </div>
                                    </div>
                                ) : formData.service_name !== "" && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-500">
                                        <label className="text-sm font-medium text-gray-300 block">{t.formNotes}</label>
                                        <textarea
                                            rows={4}
                                            placeholder={t.formPlaceholderNotes}
                                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-cyan outline-none resize-none transition-all"
                                            value={formData.notes}
                                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        ></textarea>
                                    </div>
                                )}

                                {/* Common Fields */}
                                {formData.service_name !== "" && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-500">
                                        <label className="text-sm font-medium text-gray-300 block">{t.formBudget}</label>
                                        <input
                                            type="text"
                                            placeholder={t.formBudgetPlaceholder}
                                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-cyan outline-none transition-all"
                                            value={formData.budget}
                                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        />
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${isSent ? 'bg-green-600 text-white' : 'bg-brand-red hover:bg-red-700 text-white'
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {isSending ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : isSent ? (
                                        <>{t.successMessage}</>
                                    ) : (
                                        <>{t.formSubmit} <LucideSend className="w-5 h-5 rtl:rotate-180" /></>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}

