 // js/script.js - все скрипты сайта

// ========== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ==========
const themeToggleBtn = document.getElementById('theme-toggle');
const rootElement = document.documentElement;

function updateButtonLabel(theme) {
    if (themeToggleBtn) {
        themeToggleBtn.textContent = theme === 'dark' ? '?? Светлая тема' : '?? Тёмная тема';
    }
}

function applyTheme(theme) {
    rootElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateButtonLabel(theme);
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    applyTheme(savedTheme);
} else {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(systemPrefersDark ? 'dark' : 'light');
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = rootElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });
}

// ========== АНИМАЦИЯ КАРТОЧЕК ==========
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ========== КНОПКА НАВЕРХ ==========
const goTopBtn = document.querySelector('.go-top');
if (goTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            goTopBtn.style.display = 'flex';
        } else {
            goTopBtn.style.display = 'none';
        }
    });
    goTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========== ПОДСВЕТКА АКТИВНОЙ СТРАНИЦЫ ==========
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.style.background = '#ffd166';
        link.style.color = '#1a472a';
    }
});

// ========== ПЛАВНОЕ ПОЯВЛЕНИЕ ==========
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

console.log('Сайт загружен');