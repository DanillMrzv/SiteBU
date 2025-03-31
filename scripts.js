document.addEventListener('DOMContentLoaded', function() {
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.contact-card, .contact-section, .reviews-section, .benefits-section, .cta-section, .review-card, .benefit-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });

                if (targetId === '#consult-form') {
                    targetElement.style.display = 'block';
                }
            }
        });
    });

    const logo = document.querySelector('.logo');
    if (logo) {
        const text = logo.textContent;
        logo.textContent = '';

        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                logo.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 100);
    }

    document.querySelector('.cta-button').addEventListener('click', function() {
        document.getElementById('consult-form').style.display = 'block';
    });
});
