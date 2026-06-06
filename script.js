/* ========================================= 
   WHITE ANGEL EVENT MANAGEMENT
   Premium Luxury JavaScript
   ========================================= */

// ========================================= 
// DOM ELEMENTS 
// ========================================= 
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const progressBar = document.getElementById('myBar');
const backToTopBtn = document.createElement('button');
const whatsappBtn = document.createElement('a');
const counters = document.querySelectorAll('.counter');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.createElement('div');
const body = document.body;

// ========================================= 
// AOS INITIALIZATION 
// ========================================= 
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
    disable: 'mobile'
});

// ========================================= 
// STICKY NAVBAR ON SCROLL 
// ========================================= 
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
    
    // Progress Bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
    
    // Back to Top Button Visibility
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// ========================================= 
// MOBILE MENU TOGGLE 
// ========================================= 
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.querySelector('i').classList.toggle('fa-bars');
    hamburger.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.add('fa-bars');
        hamburger.querySelector('i').classList.remove('fa-times');
    });
});

// ========================================= 
// COUNTER ANIMATION 
// ========================================= 
const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const speed = 200; // Lower = faster
        
        const updateCount = () => {
            const count = +counter.innerText;
            const inc = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    });
};

// Start counter animation when scrolled to hero section
const heroSection = document.querySelector('.hero');
const observerOptions = {
    threshold: 0.5
};

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

heroObserver.observe(heroSection);

// ========================================= 
// PARTICLE CANVAS ANIMATION 
// ========================================= 
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 100;

const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = 'rgba(212, 175, 55, ' + (Math.random() * 0.5 + 0.2) + ')';
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const initParticles = () => {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
};

const animateParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Connect nearby particles
    particles.forEach((particle, index) => {
        particles.slice(index + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.strokeStyle = 'rgba(212, 175, 55, ' + (1 - distance / 100) * 0.1 + ')';
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.stroke();
            }
        });
    });
    
    requestAnimationFrame(animateParticles);
};

resizeCanvas();
initParticles();
animateParticles();

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

// ========================================= 
// PORTFOLIO FILTER 
// ========================================= 
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ========================================= 
// GALLERY LIGHTBOX 
// ========================================= 
lightbox.classList.add('lightbox');
lightbox.innerHTML = `
    <div class="lightbox-content">
        <img src="" alt="Gallery Image">
        <button class="lightbox-close">&times;</button>
        <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
        <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
    </div>
`;
body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const lightboxPrev = lightbox.querySelector('.lightbox-prev');
const lightboxNext = lightbox.querySelector('.lightbox-next');
let currentImageIndex = 0;
const galleryImages = [];

galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    galleryImages.push({
        src: img.src,
        alt: img.alt
    });
    
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox(currentImageIndex);
    });
});

const openLightbox = (index) => {
    currentImageIndex = index;
    lightboxImg.src = galleryImages[index].src;
    lightboxImg.alt = galleryImages[index].alt;
    lightbox.classList.add('active');
    body.style.overflow = 'hidden';
};

const closeLightbox = () => {
    lightbox.classList.remove('active');
    body.style.overflow = 'auto';
};

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

lightboxPrev.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxImg.alt = galleryImages[currentImageIndex].alt;
});

lightboxNext.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxImg.alt = galleryImages[currentImageIndex].alt;
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex].src;
        lightboxImg.alt = galleryImages[currentImageIndex].alt;
    }
    if (e.key === 'ArrowRight') {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex].src;
        lightboxImg.alt = galleryImages[currentImageIndex].alt;
    }
});

// ========================================= 
// BACK TO TOP BUTTON 
// ========================================= 
backToTopBtn.classList.add('back-to-top');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================= 
// FLOATING WHATSAPP BUTTON 
// ========================================= 
whatsappBtn.classList.add('whatsapp-float');
whatsappBtn.href = 'https://wa.me/919923873950';
whatsappBtn.target = '_blank';
whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
whatsappBtn.title = 'Chat on WhatsApp';
body.appendChild(whatsappBtn);

// ========================================= 
// FLOATING PHONE BUTTON 
// ========================================= 
const phoneBtn = document.createElement('a');
phoneBtn.classList.add('phone-float');
phoneBtn.href = 'tel:+919923873950';
phoneBtn.innerHTML = '<i class="fas fa-phone"></i>';
phoneBtn.title = 'Call Now';
body.appendChild(phoneBtn);

// ========================================= 
// SMOOTH SCROLLING FOR ANCHOR LINKS 
// ========================================= 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================= 
// CONTACT FORM SUBMISSION 
// ========================================= 
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const eventType = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Validation
        if (!name || !phone || !message) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Simulate form submission (in production, connect to backend)
        const formData = {
            name: name,
            phone: phone,
            email: email,
            eventType: eventType,
            message: message
        };
        
        console.log('Form Submitted:', formData);
        
        // Show success message
        alert('Thank you! Your inquiry has been submitted. We will contact you shortly.');
        
        // Reset form
        contactForm.reset();
    });
}

// ========================================= 
// PARALLAX EFFECT ON SCROLL 
// ========================================= 
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroOffset = hero.offsetTop;
    const heroHeight = hero.offsetHeight;
    
    if (scrolled > heroOffset && scrolled < heroOffset + heroHeight) {
        const parallaxSpeed = 0.5;
        hero.style.backgroundPositionY = (scrolled - heroOffset) * parallaxSpeed + 'px';
    }
});

// ========================================= 
// LAZY LOAD IMAGES 
// ========================================= 
const lazyImages = document.querySelectorAll('img[data-src]');

const lazyLoad = (image) => {
    const src = image.getAttribute('data-src');
    if (!src) return;
    
    image.src = src;
    image.removeAttribute('data-src');
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            lazyLoad(entry.target);
            observer.unobserve(entry.target);
        }
    });
});

lazyImages.forEach(image => imageObserver.observe(image));

// ========================================= 
// SCROLL REVEAL ANIMATIONS 
// ========================================= 
const revealElements = document.querySelectorAll('.section');

const revealOnScroll = () => {
    revealElements.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 150) {
            section.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ========================================= 
// MOUSE CURSOR FOLLOWER (Optional Effect) 
// ========================================= 
const cursorFollower = document.createElement('div');
cursorFollower.classList.add('cursor-follower');
body.appendChild(cursorFollower);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

const updateCursor = () => {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursorFollower.style.left = cursorX + 'px';
    cursorFollower.style.top = cursorY + 'px';
    
    requestAnimationFrame(updateCursor);
};

updateCursor();

// Hide cursor follower on touch devices
if ('ontouchstart' in window) {
    cursorFollower.style.display = 'none';
}

// ========================================= 
// ADDITIONAL CSS STYLES FOR JS ELEMENTS 
// ========================================= 
const style = document.createElement('style');
style.textContent = `
    /* Lightbox Styles */
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        display: none;
        justify-content: center;
        align-items: center;
    }
    
    .lightbox.active {
        display: flex;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        font-size: 30px;
        color: #fff;
        background: none;
        border: none;
        cursor: pointer;
    }
    
    .lightbox-prev,
    .lightbox-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 24px;
        color: #fff;
        background: rgba(212, 175, 55, 0.3);
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .lightbox-prev {
        left: -60px;
    }
    
    .lightbox-next {
        right: -60px;
    }
    
    .lightbox-prev:hover,
    .lightbox-next:hover {
        background: var(--primary-gold);
        color: #000;
    }
    
    /* Back to Top Button */
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-gold);
        color: #000;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
