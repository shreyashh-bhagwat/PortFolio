import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Footer = () => {
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const applyFooterOffset = () => {
      const navbar = document.querySelector('.bottom-nav-container') as HTMLElement | null;
      const footerEl = footerRef.current;
      if (!footerEl) return;

      if (navbar) {
        const navRect = navbar.getBoundingClientRect();
        // Add a small extra gap so footer sits comfortably above the nav
        const offset = Math.min(navRect.height + 12, 120);
  // Reduce the upward offset more so the footer sits noticeably lower (less lifted)
  const reducedOffset = Math.max(offset - 40, 0);
        footerEl.style.transform = `translateY(-${reducedOffset}px)`;
        footerEl.style.transition = 'transform 220ms ease-out';
      } else {
        footerEl.style.transform = '';
        footerEl.style.transition = '';
      }
    };

    // Apply on load and when resizing
    applyFooterOffset();
    window.addEventListener('resize', applyFooterOffset);

    // Also apply after a short delay to catch dynamic layout changes
    const t = window.setTimeout(applyFooterOffset, 300);

    return () => {
      window.removeEventListener('resize', applyFooterOffset);
      clearTimeout(t);
    };
  }, []);
  return (
  <footer ref={footerRef} className="py-8 px-4 pb-24 bg-black/30 backdrop-blur-sm border-2 border-white/20 rounded-t-3xl shadow-2xl">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            <p className="text-white text-lg font-semibold mb-2">
              © {new Date().getFullYear()} Shreyash Bhagwat. All rights reserved.
            </p>
            <p className="text-white/80 text-base">
              shreyashbhagwat.in
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;