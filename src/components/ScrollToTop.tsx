import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediately set scroll position
    window.scrollTo(0, 0);

    // Also set it after a slight delay to ensure it takes effect
    // This handles cases where the page is still rendering
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    // Also use requestAnimationFrame for better timing
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
