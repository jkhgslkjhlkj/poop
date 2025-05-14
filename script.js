// Функция для добавления эффекта "липкого" заголовка
function stickyHeader() {
    const header = document.querySelector('header');
    const scrollTrigger = 60;

    window.addEventListener('scroll', () => {
        if (window.scrollY >= scrollTrigger) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

// Мобильное меню для маленьких экранов
function mobileMenu() {
    if (document.querySelector('.menu-toggle')) return;
    
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.menu-toggle')) {
            nav.appendChild(menuToggle);
            
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('show');
                menuToggle.innerHTML = navLinks.classList.contains('show') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });
        }
    } else {
        const existingToggle = document.querySelector('.menu-toggle');
        if (existingToggle) {
            existingToggle.remove();
        }
        navLinks.classList.remove('show');
    }
}

// Эффект параллакса для секции Hero
function parallaxEffect() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
}

// Эффект анимации для элементов при прокрутке
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .benefit-card');
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    function checkElements() {
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', checkElements);
    checkElements();
}

// Плавный скролл для навигационных ссылок
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Инициализация всех функций после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    stickyHeader();
    mobileMenu();
    parallaxEffect();
    smoothScroll();
    animateOnScroll();
    
    // Добавляем стили для плавающих дронов
    const style = document.createElement('style');
    style.innerHTML = `
        header.sticky {
            background-color: rgba(34, 34, 34, 0.95);
        }
        
        header.sticky .logo,
        header.sticky .nav-links a:not(.btn-deploy) {
            color: white;
        }
        
        .animated {
            animation: fadeInUp 0.5s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (max-width: 768px) {
            .menu-toggle {
                display: block;
                cursor: pointer;
                font-size: 1.5rem;
            }
            
            .nav-links {
                position: fixed;
                top: 70px;
                left: 0;
                width: 100%;
                background-color: var(--light-color);
                flex-direction: column;
                align-items: center;
                padding: 1rem 0;
                display: none;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                z-index: 100;
            }
            
            .nav-links.show {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);
});

// Для обновления мобильного меню при изменении размера окна
window.addEventListener('resize', mobileMenu); 