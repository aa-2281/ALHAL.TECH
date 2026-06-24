import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LucideMenu, LucideX, LucidePhone, LucideMail } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface StickyNavbarProps {
  translations: {
    logoPart1: string;
    logoPart2: string;
    navServices: string;
    navWhy: string;
    navPortfolio: string;
    navAbout: string;
    navContact: string;
  };
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
}

const StickyNavbar: React.FC<StickyNavbarProps> = ({ translations: t, lang, setLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-9 left-0 w-full z-50 pointer-events-none px-4 sm:px-6"
        animate={{
          justifyContent: scrolled ? 'flex-end' : 'center',
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 40,
          mass: 1,
        }}
      >
        <motion.nav
          layout
          className={cn(
            "pointer-events-auto flex items-center justify-between overflow-hidden",
            "border border-white/10 shadow-2xl backdrop-blur-xl",
            "will-change-transform will-change-opacity"
          )}
          animate={{
            width: scrolled ? '320px' : 'min(92vw, 900px)',
            marginLeft: scrolled ? 'auto' : 'auto',
            marginRight: scrolled ? '8px' : 'auto',
            borderRadius: scrolled ? '24px' : '20px',
            backgroundColor: scrolled ? 'rgba(26,26,26,0.9)' : 'rgba(26,26,26,1)',
            scale: scrolled ? 0.98 : 1,
            x: scrolled ? 0 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 30,
            mass: 1,
          }}
        >
          {/* Logo */}
          <motion.a
            href="/"
            dir="ltr"
            aria-label="ALHAL TECH - Go to homepage"
            className="flex items-baseline gap-1 shrink-0 px-5 py-3"
            layout
          >
            <motion.span
              className="font-extrabold text-white tracking-tight"
              animate={{
                fontSize: scrolled ? '16px' : '20px',
              }}
            >
              {t.logoPart1}
            </motion.span>
            <motion.span
              className="font-bold text-white/60 tracking-widest"
              animate={{
                fontSize: scrolled ? '9px' : '11px',
              }}
            >
              {t.logoPart2}
            </motion.span>
          </motion.a>

          {/* Navigation Links - Hidden when scrolled */}
          <motion.div
            className="hidden lg:flex items-center overflow-hidden"
            animate={{
              width: scrolled ? 0 : 'auto',
              opacity: scrolled ? 0 : 1,
              marginLeft: scrolled ? 0 : '16px',
              marginRight: scrolled ? 0 : '16px',
            }}
            transition={{
              type: 'spring',
              stiffness: 180,
              damping: 30,
              opacity: { duration: 0.25 },
            }}
          >
            <div className="flex items-center gap-6 px-3">
              <a href="#services" className="text-white/70 hover:text-white transition-colors uppercase tracking-wider text-xs font-semibold whitespace-nowrap">{t.navServices}</a>
              <a href="#why-us" className="text-white/70 hover:text-white transition-colors uppercase tracking-wider text-xs font-semibold whitespace-nowrap">{t.navWhy}</a>
              <a href="#portfolio" className="text-white/70 hover:text-white transition-colors uppercase tracking-wider text-xs font-semibold whitespace-nowrap">{t.navPortfolio}</a>
              <Link to="/about" className="text-white/70 hover:text-white transition-colors uppercase tracking-wider text-xs font-semibold whitespace-nowrap">{t.navAbout}</Link>
            </div>
          </motion.div>

          {/* Right Side - CTA & Controls */}
          <motion.div
            className="flex items-center shrink-0 p-2 pr-2"
            layout
            animate={{
              gap: scrolled ? 8 : 12,
            }}
            transition={{ type: 'spring', stiffness: 140, damping: 30 }}
          >
            {/* CTA Button */}
            <Link
              to="/contact"
              className="bg-white hover:bg-white/90 text-black font-bold transition-colors whitespace-nowrap rounded-lg flex items-center justify-center"
              style={{
                paddingLeft: scrolled ? '14px' : '20px',
                paddingRight: scrolled ? '14px' : '20px',
                paddingTop: '8px',
                paddingBottom: '8px',
                fontSize: scrolled ? '12px' : '14px',
              }}
            >
              {t.navContact}
            </Link>

            {/* Language Toggle - Hidden when scrolled */}
            <motion.div
              className="hidden sm:flex items-center bg-white/10 rounded-lg p-0.5"
              animate={{
                width: scrolled ? 0 : 'auto',
                opacity: scrolled ? 0 : 1,
                marginLeft: scrolled ? 0 : '8px',
                overflow: 'hidden'
              }}
              transition={{
                duration: 0.2
              }}
            >
              <button
                onClick={() => setLang('en')}
                aria-label="Switch to English"
                className={cn(
                  "px-2 py-1 rounded text-xs font-semibold transition-all whitespace-nowrap",
                  lang === 'en' ? "bg-white text-black" : "text-white/60"
                )}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ar')}
                aria-label="Switch to Arabic"
                className={cn(
                  "px-2 py-1 rounded text-xs font-semibold transition-all whitespace-nowrap",
                  lang === 'ar' ? "bg-white text-black" : "text-white/60"
                )}
              >
                ع
              </button>
            </motion.div>

            {/* Mobile Menu Button - Always visible on mobile, also visible when scrolled on desktop */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className={cn(
                "text-white p-1 transition-all",
                scrolled ? "block" : "lg:hidden",
                scrolled ? "ml-1" : "ml-2"
              )}
            >
              <LucideMenu className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.nav>
      </motion.header>

      {/* Mobile/Scrolled Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 w-full h-screen bg-white z-[60] transition-transform duration-300",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-black/5">
            <a href="/" dir="ltr" aria-label="ALHAL TECH - Go to homepage" className="flex items-baseline gap-1">
              <span className="font-extrabold text-xl text-black tracking-tight">{t.logoPart1}</span>
              <span className="font-bold text-xs text-black/60 tracking-widest">{t.logoPart2}</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close mobile menu"
              className="text-black p-2"
            >
              <LucideX className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-6 p-8 text-lg">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-600 hover:text-black"
            >
              {t.navServices}
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-600 hover:text-black"
            >
              {t.navWhy}
            </a>
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-600 hover:text-black"
            >
              {t.navPortfolio}
            </a>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-600 hover:text-black"
            >
              {t.navAbout}
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-black text-white px-6 py-3 rounded-full text-center"
            >
              {t.navContact}
            </Link>
            {/* Language Toggle in Mobile Menu */}
            <div className="flex items-center gap-2 pt-4">
              <button
                onClick={() => setLang('en')}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                  lang === 'en' ? "bg-black text-white" : "bg-gray-100 text-gray-600"
                )}
              >
                English
              </button>
              <button
                onClick={() => setLang('ar')}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                  lang === 'ar' ? "bg-black text-white" : "bg-gray-100 text-gray-600"
                )}
              >
                العربية
              </button>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-6 border-t border-black/10">
              <a href="https://www.facebook.com/profile.php?id=61586347270934" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#1877F2] hover:text-white transition-all">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/alhal.tech/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCAF45] hover:text-white transition-all">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="https://wa.me/9647783782248" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#25D366] hover:text-white transition-all">
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <a href="tel:+9647783782248" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all">
                <LucidePhone className="w-4 h-4" />
              </a>
              <a href="mailto:info@alhaltech.com" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all">
                <LucideMail className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default StickyNavbar;
