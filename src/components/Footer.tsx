import { LucideMail, LucideGlobe } from 'lucide-react'

interface FooterTranslations {
    logoPart1: string;
    logoPart2: string;
    footerDesc: string;
    footerServices: string;
    footerCompany: string;
    footerSocial: string;
    footerWebDev: string;
    footerMobile: string;
    footerAutomation: string;
    footerAI: string;
    footerAbout: string;
    footerServicesLink: string;
    footerCareers: string;
    footerContact: string;
    footerCopyright: string;
    footerPrivacy: string;
    footerTerms: string;
}

interface FooterProps {
    translations: FooterTranslations;
}

export default function Footer({ translations: t }: FooterProps) {
    return (
        <footer className="bg-brand-dark border-t border-white/10 pt-16 pb-8 text-sm">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-4">
                        <a href="/" dir="ltr" aria-label="ALHAL TECH - Go to homepage" className="flex flex-col leading-none">
                            <span className="font-extrabold text-2xl text-white tracking-tight">{t.logoPart1}</span>
                            <span className="font-bold text-sm text-brand-cyan tracking-widest">{t.logoPart2}</span>
                        </a>
                        <p className="text-gray-500">{t.footerDesc}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-6 text-lg">{t.footerServices}</h3>
                        <ul className="space-y-3">
                            <li><a href="/#services" className="text-gray-400 hover:text-brand-cyan transition-colors">{t.footerWebDev}</a></li>
                            <li><a href="/#services" className="text-gray-400 hover:text-brand-cyan transition-colors">{t.footerMobile}</a></li>
                            <li><a href="/portfolio/automation" className="text-gray-400 hover:text-brand-cyan transition-colors">{t.footerAutomation}</a></li>
                            <li><a href="/#services" className="text-gray-400 hover:text-brand-cyan transition-colors">{t.footerAI}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-6 text-lg">{t.footerCompany}</h3>
                        <ul className="space-y-3">
                            <li><a href="/#why-us" className="text-gray-400 hover:text-brand-cyan transition-colors">{t.footerAbout}</a></li>
                            <li><a href="/#services" className="text-gray-400 hover:text-brand-cyan transition-colors">{t.footerServicesLink}</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-brand-cyan transition-colors">{t.footerCareers}</a></li>
                            <li><a href="/contact" className="text-gray-400 hover:text-brand-cyan transition-colors">{t.footerContact}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-6 text-lg">{t.footerSocial}</h3>
                        <div className="flex gap-4">
                            <a href="/" aria-label="Visit our website" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-red hover:text-white transition-all hover:-translate-y-1">
                                <LucideGlobe className="w-5 h-5" />
                            </a>
                            <a href="mailto:yasir@alhaltech.com" aria-label="Send us an email" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-red hover:text-white transition-all hover:-translate-y-1">
                                <LucideMail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500">{t.footerCopyright}</p>
                    <div className="flex gap-6 text-gray-500">
                        <a href="#" className="hover:text-brand-cyan transition-colors">{t.footerPrivacy}</a>
                        <a href="#" className="hover:text-brand-cyan transition-colors">{t.footerTerms}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
