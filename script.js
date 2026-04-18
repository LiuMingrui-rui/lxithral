// script.js

// 主题切换功能
function initThemeToggle() {
  const themeToggle1 = document.getElementById('theme-toggle');
  const themeToggle2 = document.getElementById('theme-toggle-2');
  const html = document.documentElement;

  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    html.classList.add(savedTheme);
  } else if (systemPrefersDark) {
    html.classList.add('dark-mode');
  }

  function toggleTheme() {
    if (html.classList.contains('dark-mode')) {
      html.classList.remove('dark-mode');
      html.classList.add('light-mode');
      localStorage.setItem('theme', 'light-mode');
    } else {
      html.classList.remove('light-mode');
      html.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark-mode');
    }
  }

  if (themeToggle1) {
    themeToggle1.addEventListener('click', toggleTheme);
  }
  if (themeToggle2) {
    themeToggle2.addEventListener('click', toggleTheme);
  }
}

// 滚动显示效果
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

// 头部滚动效果
function initHeaderScroll() {
  const headerFloating = document.querySelector('.header-floating');
  const headerScrolled = document.querySelector('.header-scrolled');
  
  // 默认显示 scrolled 状态
  if (headerFloating) {
    headerFloating.style.opacity = '0';
    headerFloating.style.pointerEvents = 'none';
  }
  if (headerScrolled) {
    headerScrolled.style.opacity = '1';
    headerScrolled.style.pointerEvents = 'auto';
  }
}



// 字重控制
function initFontWeightControl() {
  const slider1 = document.getElementById('font-weight-slider');
  const slider2 = document.getElementById('font-weight-slider-2');
  
  if (!slider1 && !slider2) return;

  const savedWeight = localStorage.getItem('fontWeight');
  if (savedWeight) {
    if (slider1) slider1.value = savedWeight;
    if (slider2) slider2.value = savedWeight;
    document.documentElement.style.setProperty('--font-weight', savedWeight);
  }

  function updateWeight(weight) {
    document.documentElement.style.setProperty('--font-weight', weight);
    localStorage.setItem('fontWeight', weight);
    if (slider1 && slider1.value !== weight) slider1.value = weight;
    if (slider2 && slider2.value !== weight) slider2.value = weight;
  }

  if (slider1) {
    slider1.addEventListener('input', (e) => updateWeight(e.target.value));
  }
  if (slider2) {
    slider2.addEventListener('input', (e) => updateWeight(e.target.value));
  }
}

// 头像3D旋转效果
function initImage3DTilt() {
  const heroImage = document.querySelector('.hero-image');
  if (!heroImage) return;

  const container = heroImage.parentElement;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    heroImage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  container.addEventListener('mouseleave', () => {
    heroImage.style.transform = 'rotateX(0) rotateY(0)';
  });
}

// 页面加载动画
function initPageLoadAnimation() {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      document.querySelectorAll('.anim-fade-in, .anim-slide-in-left, .anim-slide-in-right, .anim-scale-in').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
      });
    }, 100);
  });
}

// 鼠标跟随效果（可选）
function initMouseFollow() {
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
    });
  });
}

// 初始化所有功能
function init() {
  initThemeToggle();
  initScrollReveal();
  initHeaderScroll(); // 恢复此行
  initFontWeightControl();
  initImage3DTilt();
  initPageLoadAnimation();
}



window.addEventListener('DOMContentLoaded', () => {
  const savedWeight = localStorage.getItem('fontWeight');
  if (savedWeight) {
    document.documentElement.style.setProperty('--font-weight', savedWeight);
  }

  init();
});
