import { useState } from 'react';
import { motion } from 'framer-motion';
import resumePdf from '../assets/Shreyash_Fullstack.pdf';

const HireMeSection = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);

  const handleDownloadResume = async () => {
    // Use fetch streaming so we can show progress, fallback to simple anchor if anything fails
    setIsDownloading(true);
    setDownloadProgress(0);
    try {
      const resp = await fetch(resumePdf);
      if (!resp.ok) throw new Error('Network response not ok');

      const contentLengthHeader = resp.headers.get('content-length');
      const total = contentLengthHeader ? parseInt(contentLengthHeader, 10) : NaN;

      if (!resp.body || !resp.body.getReader) {
        // No streaming support: fallback to simple download
        const link = document.createElement('a');
        link.href = resumePdf;
        link.download = 'Shreyash_Bhagwat_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setDownloadProgress(null);
        setIsDownloading(false);
        return;
      }

      const reader = resp.body.getReader();
      const chunks: Uint8Array[] = [];
      let receivedLength = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          chunks.push(value);
          receivedLength += value.length;
          if (!isNaN(total) && total > 0) {
            setDownloadProgress(Math.round((receivedLength / total) * 100));
          } else {
            setDownloadProgress(null);
          }
        }
      }

      // Merge chunks into a single Uint8Array
      const merged = new Uint8Array(receivedLength);
      let position = 0;
      for (const chunk of chunks) {
        merged.set(chunk, position);
        position += chunk.length;
      }
      const blob = new Blob([merged.buffer], { type: resp.headers.get('content-type') || 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Shreyash_Bhagwat_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // revoke after a short delay to ensure the download started
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);

      setDownloadProgress(100);
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadProgress(null);
      }, 800);
    } catch (err) {
      // fallback to anchor download on error
      console.error('Download failed, falling back to direct link', err);
      const link = document.createElement('a');
      link.href = resumePdf;
      link.download = 'Shreyash_Bhagwat_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
      setDownloadProgress(null);
    }
  };

  return (
    <motion.section
      className="py-6 px-4 lg:px-0 lg:py-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto text-center lg:text-left lg:max-w-none">
        <motion.h2
          className="text-4xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Hire Me
        </motion.h2>

        <motion.p
          className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto lg:mx-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Ready to bring your ideas to life? Let's work together to create something amazing.
        </motion.p>

        <motion.button
          onClick={handleDownloadResume}
          className={`bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${isDownloading ? 'opacity-70 pointer-events-none' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isDownloading ? (
            downloadProgress !== null ? `Downloading ${downloadProgress}%` : 'Downloading...'
          ) : (
            <>📄 Download Resume</>
          )}
        </motion.button>
      </div>
    </motion.section>
  );
};

export default HireMeSection;