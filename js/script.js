// Dark Mode Toggle
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

if (themeSwitch) {
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    themeSwitch.checked = currentTheme === 'dark';

    themeSwitch.addEventListener('change', () => {
        const theme = themeSwitch.checked ? 'dark' : 'light';
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
}

// Menu burger
const burger = document.querySelector('.burger');
const navList = document.querySelector('.nav-list');

if (burger && navList) {
    burger.addEventListener('click', () => {
        navList.classList.toggle('active');
        burger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            burger.classList.remove('active');
        });
    });
}

// Scroll Progress Bar
const scrollProgress = document.querySelector('.scroll-progress-bar');

if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });
}

// Header scroll effect
const header = document.querySelector('.header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Animation scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in-up');
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => observer.observe(section));

// Back to top
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Lightbox galerie
const galerieItems = document.querySelectorAll('.galerie-item');

if (galerieItems.length > 0) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="" alt="">
            <button class="lightbox-close">&times;</button>
        </div>
    `;
    document.body.appendChild(lightbox);

    galerieItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightbox.querySelector('img').src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Validation formulaire
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const nom = document.getElementById('nom').value.trim();
        const telephone = document.getElementById('telephone').value.trim();

        if (!nom || !telephone) {
            e.preventDefault();
            alert('Please fill in all required fields.');
            return;
        }

        const phoneRegex = /^(\+39)?3\d{9}$/;
        const cleanPhone = telephone.replace(/\s|-|\./g, '');

        if (!phoneRegex.test(cleanPhone)) {
            e.preventDefault();
            alert('Please enter a valid Italian phone number.');
            return;
        }

        // Form will submit via mailto
    });
}

// WhatsApp
const whatsappBtn = document.getElementById('whatsapp-btn');
const whatsappFormBtn = document.getElementById('whatsapp-form-btn');

function generateWhatsAppMessage(name = '', hairstyle = '', message = '') {
    let text = "Hello, I would like to book a hairstyle appointment with Braids & Beauty.";
    if (name) text += `\n\nName: ${name}`;
    if (hairstyle) text += `\nHairstyle: ${hairstyle}`;
    if (message) text += `\n\nMessage: ${message}`;
    return encodeURIComponent(text);
}

// Floating button FIX
if (whatsappBtn) {
    const message = generateWhatsAppMessage();
    whatsappBtn.href = `https://wa.me/393500381955?text=${message}`;
}

// Form button FIX
if (whatsappFormBtn) {
    whatsappFormBtn.addEventListener('click', () => {
        const name = document.getElementById('nom').value.trim();
        const hairstyle = document.getElementById('coiffure').value;
        const message = document.getElementById('message').value.trim();

        const whatsappMessage = generateWhatsAppMessage(name, hairstyle, message);
        window.open(`https://wa.me/393500381955?text=${whatsappMessage}`, '_blank');
    });
}
