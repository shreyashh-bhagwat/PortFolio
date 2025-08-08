document.addEventListener('DOMContentLoaded', () => {
  // Navbar Toggle for Mobile
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
  });

  // Smooth Scroll for Navbar Links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for navbar height
          behavior: 'smooth'
        });
      }
      // Close mobile menu after clicking
      navLinks.classList.remove('active');
      hamburger.classList.remove('open');
    });
  });

  // Tab Functionality with Animation
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');

      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const targetContent = document.getElementById(tabId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // EmailJS Form Submission
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
      name: this.name.value,
      email: this.email.value,
      subject: this.subject.value,
      message: this.message.value,
      date: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
    };

    emailjs.send('service_mhrrdwl', 'template_jixtgfh', formData)
      .then(() => {
        alert('Message sent successfully!');
        this.reset();
      }, (error) => {
        alert('Failed to send message: ' + JSON.stringify(error));
      });
  });
});