document.addEventListener('DOMContentLoaded', function() {
    const consultForm = document.getElementById('consult-form');
    const consultationForm = document.getElementById('consultation-form');

    // Открытие модального окна
    document.querySelectorAll('.cta-button, .contact-button').forEach(button => {
        button.addEventListener('click', function() {
            consultForm.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Закрытие модального окна
    document.querySelector('.close-button').addEventListener('click', function() {
        consultForm.style.display = 'none';
    });

    // Отправка формы
    consultationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(consultationForm);
        const data = {
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            middle_name: formData.get('middle_name'),
            debt_amount: formData.get('debt_amount'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Отправка данных в Telegram
        sendToTelegram(data);
    });

    function sendToTelegram(data) {
        const telegramBotToken = '5200789165:AAGc06OVXThJ5aMYbnFjsvq7gpu4TVMndGo';
        const chatId = '5200789165';
        const message = `Новая заявка на консультацию:\n` +
            `Имя: ${data.first_name}\n` +
            `Фамилия: ${data.last_name}\n` +
            `Отчество: ${data.middle_name}\n` +
            `Сумма долга: ${data.debt_amount}\n` +
            `Телефон: ${data.phone}\n` +
            (data.email ? `Email: ${data.email}\n` : '') +
            (data.message ? `Сообщение: ${data.message}` : '');

        fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Ваша заявка успешно отправлена!');
            consultForm.style.display = 'none';
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Произошла ошибка при отправке заявки.');
        });
    }

    // Анимация при скролле
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

    // Плавный скролл к якорям
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

    // Анимация текста логотипа
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
});
