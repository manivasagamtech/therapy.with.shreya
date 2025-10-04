// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Form submission
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Validate required fields
    const requiredFields = ['name', 'phone', 'email', 'session_timing'];
    let isValid = true;

    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            input.style.borderColor = '#ff6b6b';
            isValid = false;
        } else {
            input.style.borderColor = '#e0e0e0';
        }
    });

    // Check sliding scale radio
    const slidingScale = document.querySelector('input[name="sliding_scale"]:checked');
    if (!slidingScale) {
        const radioLabels = document.querySelectorAll('.form-check-label');
        radioLabels[0].style.color = '#ff6b6b';
        radioLabels[1].style.color = '#ff6b6b';
        isValid = false;

        setTimeout(() => {
            radioLabels[0].style.color = '';
            radioLabels[1].style.color = '';
        }, 3000);
    }

    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Here you would typically send the data to your server
    console.log('Form submitted:', formObject);

    // Show success message
    showNotification('Thank you for your booking request! I will get back to you soon to confirm your session details.', 'success');

    // Reset form
    this.reset();
});

// Add loading animation to CTA button
document.querySelector('.cta-button').addEventListener('click', function(e) {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);
});

// Video testimonial placeholder click events
document.querySelectorAll('.video-placeholder').forEach(video => {
    video.addEventListener('click', function() {
        // Here you would integrate with actual video player
        showNotification('Video testimonial would play here. Integration with video platform needed.', 'info');
    });
});

// Show notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 9999;
        font-family: 'Poppins', sans-serif;
        animation: slideInRight 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(45deg, #64B5A6, #A8D5E2); color: white;' : ''}
        ${type === 'error' ? 'background: linear-gradient(45deg, #ff6b6b, #ffa8a8); color: white;' : ''}
        ${type === 'info' ? 'background: linear-gradient(45deg, #4ecdc4, #44a08d); color: white;' : ''}
    `;

    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        float: right;
        margin-left: 15px;
    `;

    // Add animation keyframes if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Testimonial card hover effects
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
});

// Email validation
document.getElementById('email').addEventListener('blur', function() {
    const email = this.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
        this.style.borderColor = '#ff6b6b';
        showNotification('Please enter a valid email address', 'error');
    } else {
        this.style.borderColor = '#e0e0e0';
    }
});

// Phone validation
document.getElementById('phone').addEventListener('blur', function() {
    const phone = this.value;
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;

    if (phone && !phoneRegex.test(phone)) {
        this.style.borderColor = '#ff6b6b';
        showNotification('Please enter a valid phone number', 'error');
    } else {
        this.style.borderColor = '#e0e0e0';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');

    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Initialize tooltips (if using Bootstrap tooltips)
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation to the page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Initialize any additional components here
    console.log('Therapy with Shreya website loaded successfully!');
});

// Add typing effect to hero subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Apply typing effect when hero section is visible
const heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const subtitle = entry.target.querySelector('.hero-subtitle');
            if (subtitle) {
                const originalText = subtitle.textContent;
                setTimeout(() => {
                    typeWriter(subtitle, originalText, 30);
                }, 1000);
            }
            heroObserver.unobserve(entry.target);
        }
    });
});

const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Contact form character count for textareas
document.querySelectorAll('textarea').forEach(textarea => {
    const maxLength = textarea.getAttribute('maxlength');
    if (maxLength) {
        const counter = document.createElement('div');
        counter.style.cssText = 'text-align: right; font-size: 0.8rem; color: #7F8C8D; margin-top: 5px;';
        textarea.parentNode.appendChild(counter);

        function updateCounter() {
            const remaining = maxLength - textarea.value.length;
            counter.textContent = `${remaining} characters remaining`;
            counter.style.color = remaining < 50 ? '#ff6b6b' : '#7F8C8D';
        }

        textarea.addEventListener('input', updateCounter);
        updateCounter();
    }
});
