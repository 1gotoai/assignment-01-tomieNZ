/**
 * Yaohui Zhang Personal Portfolio - 交互脚本
 * 实现滚动动画、导航交互和模块切换效果
 */

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initSmoothScroll();
    initParallaxEffects();
});

/**
 * 初始化导航栏功能
 * - 移动端菜单切换
 * - 滚动时导航栏样式变化
 */
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    
    // 移动端菜单切换
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // 点击导航链接后关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // 滚动时导航栏样式变化
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // 添加/移除滚动样式
        if (currentScrollY > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        // 更新活动导航链接
        updateActiveNavLink();
        
        lastScrollY = currentScrollY;
    });
}

/**
 * 更新当前活动的导航链接
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/**
 * 初始化滚动动画
 * 使用 Intersection Observer API 实现元素进入视口时的动画效果
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // 创建观察器配置
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    // 创建观察器
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 添加可见类，触发CSS动画
                entry.target.classList.add('visible');
                
                // 添加额外的动画效果
                addEntranceAnimation(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有动画元素
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // 为section标题添加特殊动画
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
}

/**
 * 添加入场动画效果
 * @param {HTMLElement} element - 需要添加动画的元素
 */
function addEntranceAnimation(element) {
    // 根据元素类型添加不同的动画
    if (element.classList.contains('about-card')) {
        element.style.animation = 'cardEntrance 0.6s ease forwards';
    } else if (element.classList.contains('timeline-item')) {
        element.style.animation = 'slideInFromLeft 0.6s ease forwards';
    } else if (element.classList.contains('project-card')) {
        element.style.animation = 'scaleIn 0.5s ease forwards';
    } else if (element.classList.contains('volunteer-card')) {
        element.style.animation = 'fadeInUp 0.6s ease forwards';
    } else if (element.classList.contains('hobby-card')) {
        element.style.animation = 'bounceIn 0.6s ease forwards';
    } else if (element.classList.contains('skills-category')) {
        element.style.animation = 'slideInFromRight 0.6s ease forwards';
    }
}

/**
 * 初始化平滑滚动
 */
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 获取目标位置
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                // 平滑滚动到目标
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 初始化视差效果
 */
function initParallaxEffects() {
    const shapes = document.querySelectorAll('.shape');
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = hero.offsetHeight;
        
        // 只在hero区域内应用视差效果
        if (scrollY < heroHeight) {
            shapes.forEach((shape, index) => {
                const speed = 0.2 + (index * 0.1);
                const yPos = scrollY * speed;
                shape.style.transform = `translate(0, ${yPos}px)`;
            });
        }
    });
    
    // 鼠标移动视差效果
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPercent = (clientX / innerWidth - 0.5) * 2;
        const yPercent = (clientY / innerHeight - 0.5) * 2;
        
        shapes.forEach((shape, index) => {
            const intensity = 10 + (index * 5);
            const xOffset = xPercent * intensity;
            const yOffset = yPercent * intensity;
            
            shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
}

/**
 * 添加CSS动画关键帧（动态注入）
 */
function injectAnimationStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes cardEntrance {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes slideInFromLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInFromRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3);
            }
            50% {
                transform: scale(1.05);
            }
            70% {
                transform: scale(0.95);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        /* 导航链接激活状态 */
        .nav-link.active {
            color: var(--accent);
        }
        
        .nav-link.active::before {
            width: 80%;
        }
        
        /* 移动端菜单切换动画 */
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
        
        /* 项目卡片悬停时的闪烁效果 */
        .project-card::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.2),
                transparent
            );
            transition: 0.5s;
            pointer-events: none;
        }
        
        .project-card:hover::after {
            left: 100%;
        }
        
        /* 技能徽章悬停动画 */
        .skills-badges img {
            animation: none;
        }
        
        .skills-badges img:hover {
            animation: skillBadgeHover 0.3s ease;
        }
        
        @keyframes skillBadgeHover {
            0% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-8px) scale(1.1); }
            100% { transform: translateY(-4px) scale(1.05); }
        }
        
        /* 联系卡片波纹效果 */
        .contact-item::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(165, 214, 167, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.6s ease, height 0.6s ease;
            pointer-events: none;
        }
        
        .contact-item:hover::after {
            width: 300px;
            height: 300px;
        }
        
        /* 页面加载动画 */
        @keyframes pageLoad {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        body {
            animation: pageLoad 0.5s ease;
        }
    `;
    document.head.appendChild(styleSheet);
}

// 注入动画样式
injectAnimationStyles();

/**
 * 添加打字机效果（可选）
 * @param {HTMLElement} element - 目标元素
 * @param {string} text - 要显示的文本
 * @param {number} speed - 打字速度（毫秒）
 */
function typeWriter(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/**
 * 数字计数动画（可用于统计数据展示）
 * @param {HTMLElement} element - 目标元素
 * @param {number} target - 目标数字
 * @param {number} duration - 动画时长（毫秒）
 */
function countUp(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    function update() {
        current += increment;
        
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    update();
}

/**
 * 检测设备类型
 * @returns {boolean} 是否为移动设备
 */
function isMobile() {
    return window.innerWidth <= 768;
}

/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间
 * @returns {Function} 防抖后的函数
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 节流函数
 * @param {Function} func - 要节流的函数
 * @param {number} limit - 时间限制
 * @returns {Function} 节流后的函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 窗口大小变化时的处理
window.addEventListener('resize', debounce(() => {
    // 关闭移动端菜单
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
}, 250));

// 控制台欢迎信息
console.log(`
%c🌿 Welcome to Yaohui Zhang's Portfolio

%cThanks for exploring! Feel free to reach out:
📧 tomieweb@gmail.com
🐙 github.com/neilzhangpro

`, 
'color: #4CAF50; font-size: 20px; font-weight: bold;',
'color: #666; font-size: 12px;'
);
