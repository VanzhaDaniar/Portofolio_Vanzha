// Fungsi untuk toggle tema
const toggleTheme = document.getElementById('theme-toggle');
const body = document.body;
const themeLabels = document.querySelectorAll('.theme-label');

// Cek preferensi tema yang disimpan
const savedTheme = localStorage.getItem('theme');

// Terapkan tema yang disimpan
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    toggleTheme.checked = true;
    updateThemeLabels('light');
} else {
    updateThemeLabels('dark');
}

// Event listener untuk toggle
toggleTheme.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        updateThemeLabels('light');
    } else {
        body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
        updateThemeLabels('dark');
    }
});

// Fungsi untuk memperbarui label tema
function updateThemeLabels(theme) {
    themeLabels.forEach((label, index) => {
        if (theme === 'light') {
            label.textContent = index === 0 ? 'Gelap' : 'Terang';
        } else {
            label.textContent = index === 0 ? 'Terang' : 'Gelap';
        }
    });
}

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile navigation when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Animated Counter
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const startCounter = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        
        const inc = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(() => startCounter(), 1);
        } else {
            counter.innerText = target;
        }
    });
};

// Memulai counter ketika elemen terlihat di viewport
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Form Submission
const contactForm = document.querySelector('.contact-form');
const newsletterForm = document.querySelector('.newsletter-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah berhasil dikirim.');
    contactForm.reset();
});

newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Terima kasih telah berlangganan newsletter kami!');
    newsletterForm.reset();
});

// Animasi pada scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-item, .portfolio-item, .testimonial-item, .contact-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animated elements
document.querySelectorAll('.skill-item, .portfolio-item, .contact-item').forEach(item => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

window.addEventListener('scroll', animateOnScroll);
// Trigger once on load
window.addEventListener('load', animateOnScroll);