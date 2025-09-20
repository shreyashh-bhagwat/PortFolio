document.addEventListener('DOMContentLoaded', () => {
    // Initialize Tabs
    const initializeTabs = () => {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        if (tabButtons.length > 0 && tabContents.length > 0) {
            tabButtons[0].classList.add('active');
            tabContents[0].classList.add('active');
        }

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                if (!tabId) return;

                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                button.classList.add('active');
                const targetContent = document.getElementById(tabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    };

    // Scroll to Top Functionality
    const setupScrollToTop = () => {
        const scrollToTopBtn = document.getElementById('scroll-to-top');
        if (scrollToTopBtn) {
            window.addEventListener('scroll', () => {
                scrollToTopBtn.classList.toggle('visible', window.scrollY > 300);
            });

            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };

    // EmailJS Form Submission
    const setupContactForm = () => {
        const contactForm = document.getElementById('contact-form');
        const sendBtn = document.querySelector('.send-btn');
        if (contactForm && sendBtn) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();

                sendBtn.disabled = true;
                sendBtn.classList.add('sending');

                const formData = {
                    name: this.name.value,
                    email: this.email.value,
                    subject: this.subject.value,
                    message: this.message.value,
                    date: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
                };

                emailjs.send('service_mhrrdwl', 'template_jixtgfh', formData)
                    .then(() => {
                        sendBtn.classList.remove('sending');
                        sendBtn.classList.add('success');
                        setTimeout(() => {
                            sendBtn.classList.remove('success');
                            sendBtn.disabled = false;
                            contactForm.reset();
                        }, 2000);
                    }, (error) => {
                        sendBtn.classList.remove('sending');
                        alert('Failed to send message: ' + JSON.stringify(error));
                        sendBtn.disabled = false;
                    });
            });
        }
    };

    // Section Scroll Animations
    const setupSectionAnimations = () => {
        const sections = document.querySelectorAll('.section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });

        sections.forEach(section => {
            section.classList.add('section-hidden');
            observer.observe(section);
        });
    };

    // Initialize all functionalities
    initializeTabs();
    setupScrollToTop();
    setupContactForm();
    setupSectionAnimations();
});