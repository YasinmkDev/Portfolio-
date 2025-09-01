// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    mobileToggle.classList.toggle('active');
});

// Smooth Scroll Navigation
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Update active nav link on scroll
    const updateActiveNavLink = () => {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`[href="#${sectionId}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        if (html.getAttribute('data-theme') === 'dark') {
            nav.style.background = 'rgba(31, 41, 55, 0.95)';
        }
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.9)';
        if (html.getAttribute('data-theme') === 'dark') {
            nav.style.background = 'rgba(31, 41, 55, 0.9)';
        }
    }
});

// Project Spotlight Toggle
const projectData = {
    foodiehub: {
        title: 'FoodieHub - Restaurant Discovery App',
        image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=600',
        challenge: 'Local restaurants needed a modern platform to reach customers and manage orders efficiently.',
        solution: 'Built a cross-platform app with real-time ordering, location services, and seamless payment integration.',
        result: 'Increased restaurant visibility by 300% and reduced order processing time by 60%.',
        tech: ['React Native', 'Expo', 'Firebase', 'Stripe', 'Google Maps'],
        metrics: {
            users: '5K+',
            loadTime: '2.1s',
            rating: '4.8★'
        }
    },
    fittrack: {
        title: 'FitTrack - Personal Fitness Companion',
        image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=600',
        challenge: 'Fitness enthusiasts needed a comprehensive tool to track workouts and monitor progress.',
        solution: 'Developed an intuitive app with workout plans, progress tracking, and social features.',
        result: 'Users report 40% better workout consistency and improved fitness goal achievement.',
        tech: ['React Native', 'Redux', 'Firebase', 'HealthKit', 'Charts.js'],
        metrics: {
            users: '3K+',
            loadTime: '1.8s',
            rating: '4.7★'
        }
    },
    budgetpal: {
        title: 'BudgetPal - Smart Finance Manager',
        image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
        challenge: 'Young professionals struggled with expense tracking and budget management.',
        solution: 'Created an AI-powered budgeting app with smart categorization and financial insights.',
        result: 'Users save an average of $500/month and report better financial awareness.',
        tech: ['React Native', 'TypeScript', 'Supabase', 'Plaid API', 'Chart.js'],
        metrics: {
            users: '2K+',
            loadTime: '1.5s',
            rating: '4.9★'
        }
    }
};

document.querySelectorAll('.thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        const projectKey = thumbnail.getAttribute('data-project');
        const project = projectData[projectKey];
        
        if (project) {
            // Update active thumbnail
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
            
            // Update project content
            updateProjectSpotlight(project);
        }
    });
});

function updateProjectSpotlight(project) {
    const title = document.querySelector('.project-title');
    const image = document.querySelector('.project-image img');
    const challengeText = document.querySelector('.process-step:nth-child(1) p');
    const solutionText = document.querySelector('.process-step:nth-child(2) p');
    const resultText = document.querySelector('.process-step:nth-child(3) p');
    const techStack = document.querySelector('.tech-stack');
    const metrics = document.querySelectorAll('.metric-value');
    
    // Fade out
    const spotlight = document.querySelector('.project-spotlight');
    spotlight.style.opacity = '0.7';
    
    setTimeout(() => {
        title.textContent = project.title;
        image.src = project.image;
        image.alt = project.title;
        challengeText.textContent = project.challenge;
        solutionText.textContent = project.solution;
        resultText.textContent = project.result;
        
        // Update tech stack
        techStack.innerHTML = project.tech.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        // Update metrics
        metrics[0].textContent = project.metrics.users;
        metrics[1].textContent = project.metrics.loadTime;
        metrics[2].textContent = project.metrics.rating;
        
        // Fade in
        spotlight.style.opacity = '1';
    }, 200);
}

// Contact Form
const contactForm = document.getElementById('contactForm');
const modal = document.getElementById('successModal');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const formData = new FormData(contactForm);
    
    // Show loading state
    submitBtn.classList.add('btn-loading');
    submitBtn.disabled = true;
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Reset form and show success
    contactForm.reset();
    submitBtn.classList.remove('btn-loading');
    submitBtn.disabled = false;
    showModal();
});

function showModal() {
    modal.classList.add('show');
}

function closeModal() {
    modal.classList.remove('show');
}

// Close modal on background click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Accessibility Features
const fontToggle = document.getElementById('fontToggle');
const contrastToggle = document.getElementById('contrastToggle');

fontToggle.addEventListener('click', () => {
    document.body.classList.toggle('large-font');
    localStorage.setItem('large-font', document.body.classList.contains('large-font'));
});

contrastToggle.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('high-contrast', document.body.classList.contains('high-contrast'));
});

// Restore accessibility preferences
if (localStorage.getItem('large-font') === 'true') {
    document.body.classList.add('large-font');
}

if (localStorage.getItem('high-contrast') === 'true') {
    document.body.classList.add('high-contrast');
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('section');
    animateElements.forEach(el => {
        el.classList.add('animate-in');
        observer.observe(el);
    });
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Performance: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Enhanced Gallery Interactions
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        
        // Create detailed modal content (simplified for demo)
        console.log(`Opening case study for: ${title}`);
        // In a real implementation, this would open a detailed case study modal
    });
});

// Gallery Filter
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active filter
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        console.log(`Filtering by: ${filter}`);
        // In a real implementation, this would filter the gallery items
    });
});

// Skills Progress Animation
const skillChips = document.querySelectorAll('.skill-chip');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.setProperty('--animate-progress', 'true');
        }
    });
}, { threshold: 0.5 });

skillChips.forEach(chip => {
    skillObserver.observe(chip);
    
    // Add click interaction
    chip.addEventListener('click', () => {
        chip.style.transform = 'scale(0.95)';
        setTimeout(() => {
            chip.style.transform = '';
        }, 150);
    });
});

// Animated Counter for Hero Stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Trigger counter animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-number').forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Enhanced Process Step Interactions
document.querySelectorAll('.process-step').forEach(step => {
    step.addEventListener('mouseenter', () => {
        step.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    step.addEventListener('mouseleave', () => {
        step.style.transform = '';
    });
});

// Cursor Follower
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursorFollower() {
    const dx = mouseX - followerX;
    const dy = mouseY - followerY;
    
    followerX += dx * 0.1;
    followerY += dy * 0.1;
    
    cursorFollower.style.left = followerX - 10 + 'px';
    cursorFollower.style.top = followerY - 10 + 'px';
    
    requestAnimationFrame(updateCursorFollower);
}

// Show cursor follower on interactive elements
document.addEventListener('mouseenter', () => {
    cursorFollower.style.opacity = '0.6';
});

document.addEventListener('mouseleave', () => {
    cursorFollower.style.opacity = '0';
});

updateCursorFollower();

// Enhanced Button Interactions
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        cursorFollower.style.transform = 'scale(1.5)';
        cursorFollower.style.background = 'var(--primary-light)';
    });
    
    btn.addEventListener('mouseleave', () => {
        cursorFollower.style.transform = 'scale(1)';
        cursorFollower.style.background = 'var(--primary)';
    });
});

// Project Image Click Handler
document.querySelector('.project-image').addEventListener('click', () => {
    console.log('Opening project demo video...');
    // In a real implementation, this would open a video modal or demo
});

// Service Item Hover Effects
document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.service-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.service-icon');
        icon.style.transform = '';
    });
});

// Form Input Enhancements
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = '';
    });
});