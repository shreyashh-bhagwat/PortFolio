import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppRedirect = () => {
    const phoneNumber = '9850829389';
    const message = 'Hi Shreyash! I just sent you a message through your portfolio website. This is urgent - please check your email.';
    const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowSuccessModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS service details
      await emailjs.send(
        'service_mhrrdwl',
        'template_jixtgfh',
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'shreyashbhagwat0709@gmail.com',
          date: new Date().toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
          }),
        },
        'wbkFGG8iIt0RK5phZ'
      );

      setFormData({ name: '', email: '', subject: '', message: '' });

      // Fireworks
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Sound
      const audio = new Audio('/success.mp3'); // Add success sound file
      audio.play().catch(() => {}); // Ignore if sound fails

      // Vibration
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }

      // Toast
      setShowSuccessModal(true);

    } catch {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <section id="contact" className="section-spacing px-4 pb-32 mb-24">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-10">Contact Me</h2>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="card-elevated p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-white mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white/20 border border-white/20 rounded text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 text-base"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-white mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white/20 border border-white/20 rounded text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 text-base"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-white mb-2">Project Type</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-white/20 border border-white/20 rounded text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 text-base"
            >
              <option value="">Select Project Type</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Frontend Development">Frontend Development</option>
              <option value="Full-Stack Development">Full-Stack Development</option>
              <option value="Consultation">Consultation</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-white mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-3 py-2 bg-white/20 border border-white/20 rounded text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 resize-none text-base"
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white hover:bg-gray-200 disabled:bg-gray-300 text-black py-3 rounded transition-colors"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center z-[120] p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-black/90 backdrop-blur-xl border border-white/25 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl"
            style={{
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            <div className="text-center">
              {/* Animated Done Illustration */}
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", damping: 20, stiffness: 200 }}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
                >
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                    className="w-6 h-6 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                    />
                  </motion.svg>
                </motion.div>
              </div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xl font-bold text-white mb-3"
              >
                Message Sent Successfully!
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-gray-300 text-sm mb-8 leading-relaxed px-2"
              >
                Thanks for reaching out! I'll get back to you soon. If it's urgent, you can contact me directly on WhatsApp.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex gap-3 justify-center"
              >
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="flex-1 max-w-[120px] px-6 py-3 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white rounded-xl transition-all duration-200 font-semibold text-sm shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
                >
                  Close
                </button>
                <button
                  onClick={handleWhatsAppRedirect}
                  className="flex-1 max-w-[120px] px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:from-green-700 active:to-green-800 text-white rounded-xl transition-all duration-200 font-semibold text-sm shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
                >
                  Open WhatsApp
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default ContactSection;