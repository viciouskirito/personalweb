// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化滚动效果
    initSmoothScrolling();
    
    // 初始化导航栏效果
    initNavbar();
    
    // 初始化动画效果
    initAnimations();
    
    // 初始化项目卡片交互
    initProjectCards();
    
    // 初始化联系表单验证（如果有的话）
    initContactForm();
});

// 平滑滚动功能
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // 考虑导航栏高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // 更新URL哈希（可选）
                history.pushState(null, null, targetId);
            }
        });
    });
}

// 导航栏效果
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // 滚动时隐藏/显示导航栏
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // 添加滚动时的模糊效果
        if (currentScrollY > 50) {
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.background = 'rgba(255, 255, 255, 0.2)';
        } else {
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// 动画效果初始化
function initAnimations() {
    // 使用Intersection Observer实现滚动动画
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .about-stats .stat, .contact-item, .section-header');

    animateElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// 打字机效果 - 改用CSS实现，不再操作DOM
// typeWriterEffect 函数已移除，使用纯CSS动画

// 项目卡片交互
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
            this.style.zIndex = '1';
        });
        
        card.addEventListener('click', function() {
            // 添加点击效果
            this.style.transform = 'scale(0.95)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
            }, 150);
        });
    });
}



// 联系表单验证（如果有表单的话）
function initContactForm() {
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 简单的表单验证
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const messageInput = this.querySelector('textarea[name="message"]');
            
            let isValid = true;
            
            // 验证姓名
            if (!nameInput.value.trim()) {
                showError(nameInput, '请输入您的姓名');
                isValid = false;
            } else {
                clearError(nameInput);
            }
            
            // 验证邮箱
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                showError(emailInput, '请输入有效的邮箱地址');
                isValid = false;
            } else {
                clearError(emailInput);
            }
            
            // 验证消息
            if (!messageInput.value.trim()) {
                showError(messageInput, '请输入您的消息');
                isValid = false;
            } else {
                clearError(messageInput);
            }
            
            if (isValid) {
                // 表单提交逻辑（这里可以替换为实际的AJAX请求）
                alert('感谢您的留言！我会尽快回复您。');
                this.reset();
            }
        });
    }
}

// 邮箱验证函数
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 显示错误信息
function showError(input, message) {
    clearError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.5rem';
    errorDiv.textContent = message;
    
    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = '#ff6b6b';
}

// 清除错误信息
function clearError(input) {
    const errorDiv = input.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.style.borderColor = '';
}

// 页面加载动画
window.addEventListener('load', function() {
    // 添加加载完成后的类
    document.body.classList.add('loaded');
    
    // 预加载图像（如果有的话）
    preloadImages();
});

// 图像预加载
function preloadImages() {
    const images = [
        // 这里可以添加需要预加载的图像URL
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// 主题切换功能（可选）
function initThemeSwitcher() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.zIndex = '1000';
    themeToggle.style.background = 'rgba(255, 255, 255, 0.2)';
    themeToggle.style.border = 'none';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.width = '50px';
    themeToggle.style.height = '50px';
    themeToggle.style.fontSize = '1.2rem';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.backdropFilter = 'blur(10px)';
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        this.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    });
}

// 初始化主题切换（如果需要）
// initThemeSwitcher();