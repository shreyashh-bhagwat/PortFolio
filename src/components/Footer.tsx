import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-8 px-4 pb-24 bg-black/30 backdrop-blur-sm border-2 border-white/20 rounded-t-3xl shadow-2xl">
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