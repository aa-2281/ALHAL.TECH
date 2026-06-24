import { LucideMail, LucidePhone } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'

interface FooterTranslations {
    logoPart1: string;
    logoPart2: string;
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
                    <div>
                        <a href="/" dir="ltr" aria-label="ALHAL TECH - Go to homepage" className="flex flex-col leading-none mb-6">
                            <span className="font-extrabold text-3xl tracking-tight" style={{ color: '#ffffff' }}>{t.logoPart1}</span>
                            <span className="font-bold text-base tracking-widest" style={{ color: '#7e7e7eff' }}>{t.logoPart2}</span>
                        </a>
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
                            <li><a href="/about" className="text-gray-400 hover:text-brand-cyan transition-colors">{t.footerAbout}</a></li>
                            <li><a href="/#services" className="text-gray-400 hover:text-brand-cyan transition-colors">{t.footerServicesLink}</a></li>
                            <li><a href="/contact" className="text-gray-400 hover:text-brand-cyan transition-colors">{t.footerCareers}</a></li>
                            <li><a href="/contact" className="text-gray-400 hover:text-brand-cyan transition-colors">{t.footerContact}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-6 text-lg">{t.footerSocial}</h3>
                        <div className="flex gap-3 flex-wrap">
                            <a href="https://www.facebook.com/profile.php?id=61586347270934" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#1877F2] transition-all hover:-translate-y-1">
                                <FaFacebookF className="w-4 h-4" />
                            </a>
                            <a href="https://www.instagram.com/alhal.tech/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCAF45] transition-all hover:-translate-y-1">
                                <FaInstagram className="w-4 h-4" />
                            </a>
                            <a href="https://wa.me/9647783782248" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#25D366] transition-all hover:-translate-y-1">
                                <FaWhatsapp className="w-5 h-5" />
                            </a>
                            <a href="tel:+9647783782248" aria-label="Phone" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-cyan transition-all hover:-translate-y-1">
                                <LucidePhone className="w-4 h-4" />
                            </a>
                            <a href="mailto:info@alhaltech.com" aria-label="Email" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-red transition-all hover:-translate-y-1">
                                <LucideMail className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500">{t.footerCopyright}</p>
                    <div className="flex gap-6 text-gray-500">
                        <a href="/privacy-policy" className="hover:text-brand-cyan transition-colors">{t.footerPrivacy}</a>
                        <a href="/terms-of-service" className="hover:text-brand-cyan transition-colors">{t.footerTerms}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
