// DOM Content Loaded Event Listener
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyA6d1uRgLkrO6GJ6AxHddzc5ycvpSqlEpY",
    authDomain: "stream-cast-developingstorys.firebaseapp.com",
    databaseURL: "https://stream-cast-developingstorys-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "stream-cast-developingstorys",
    storageBucket: "stream-cast-developingstorys.firebasestorage.app",
    messagingSenderId: "620749100185",
    appId: "1:620749100185:web:a9521250cb6505a85bd408",
    measurementId: "G-D2CX0S5H8S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app)

const database = getDatabase(app);
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initEmailForm();
    initSmoothScrolling();
    initHeaderScroll();
    initFAQFunctionality();
    console.log('StreamCast app initialized');
});

// Email Form Functionality
function initEmailForm() {
    const emailForm = document.getElementById('emailForm');
    const emailInput = document.getElementById('email');
    const confirmationMessage = document.getElementById('confirmationMessage');
    
    console.log('Initializing email form...', { emailForm, emailInput, confirmationMessage });
    
    if (emailForm && emailInput && confirmationMessage) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            const email = emailInput.value.trim();
            console.log('Email value:', email);
            
            // Email validation
            if (validateEmail(email)) {
                console.log('Email is valid, showing confirmation');
                // Show confirmation message
                pushEmail(email, showConfirmation(), showEmailError);
                
                // Reset form
                emailInput.value = '';
                
                // Clear any previous errors
                clearEmailError();
                
                // Hide confirmation after 5 seconds
                // setTimeout(function() {
                //     hideConfirmation();
                // }, 5000);
                
                // Track email submission (placeholder for analytics)
                console.log('Email submitted successfully:', email);
            } else {
                console.log('Email is invalid, showing error');
                // Show validation error
                showEmailError();
            }
        });
        
        // Real-time email validation
        emailInput.addEventListener('input', function() {
            clearEmailError();
        });
    } else {
        console.error('Email form elements not found');
    }
}

function pushEmail(email, onSuccess, onFailure) {
    database.ref('waitingList').push({
        email: email,
        timestamp: Date.now()
    }).then((snapshot) => {
        // Data saved successfully!
        onSuccess();
        alert('Thank you for joining our waiting list!');
        document.getElementById('emailInput').value = ''; // Clear the input
    }).catch((error) => {
        // The write failed...
        alert('There was an error. Please try again.');
        console.error(error);
        onFailure();
    });
}

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    console.log('Email validation result:', isValid, 'for email:', email);
    return isValid;
}

// Show confirmation message
function showConfirmation() {
    const form = document.getElementById('emailForm');
    const confirmation = document.getElementById('confirmationMessage');
    
    console.log('showConfirmation called', { form, confirmation });
    
    if (form && confirmation) {
        form.style.display = 'none';
        confirmation.style.display = 'block';
        confirmation.classList.add('show');
        console.log('Confirmation message shown');
    } else {
        console.error('Cannot show confirmation - elements not found');
    }
}

// Hide confirmation message
function hideConfirmation() {
    const form = document.getElementById('emailForm');
    const confirmation = document.getElementById('confirmationMessage');
    
    console.log('hideConfirmation called');
    
    if (form && confirmation) {
        confirmation.classList.remove('show');
        confirmation.style.display = 'none';
        form.style.display = 'block';
        console.log('Confirmation message hidden');
    }
}

// Show email validation error
function showEmailError() {
    const emailInput = document.getElementById('email');
    
    if (emailInput) {
        emailInput.style.borderColor = '#DC3545';
        emailInput.style.backgroundColor = '#FFF5F5';
        emailInput.setAttribute('placeholder', 'Please enter a valid email address');
        
        // Add shake animation
        emailInput.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(function() {
            emailInput.style.animation = '';
        }, 500);
    }
}

// Clear email validation error
function clearEmailError() {
    const emailInput = document.getElementById('email');
    
    if (emailInput) {
        emailInput.style.borderColor = '';
        emailInput.style.backgroundColor = '';
        emailInput.setAttribute('placeholder', 'Enter your email address');
    }
}

// Initialize FAQ Functionality
function initFAQFunctionality() {
    const faqButtons = document.querySelectorAll('.faq-question');
    
    console.log('Initializing FAQ functionality, found buttons:', faqButtons.length);
    
    faqButtons.forEach((button, index) => {
        console.log('Adding click listener to FAQ button', index);
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('FAQ button clicked:', index);
            toggleFAQ(this);
        });
        
        // Also add keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(this);
            }
        });
    });
}

// FAQ Toggle Functionality
function toggleFAQ(button) {
    console.log('toggleFAQ called');
    
    const faqItem = button.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const toggle = button.querySelector('.faq-toggle');
    
    console.log('FAQ elements:', { faqItem, answer, toggle });
    
    if (!faqItem || !answer || !toggle) {
        console.error('FAQ elements not found');
        return;
    }
    
    // Close all other FAQ items
    const allFaqItems = document.querySelectorAll('.faq-item');
    allFaqItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.faq-answer');
            const otherToggle = item.querySelector('.faq-toggle');
            
            if (otherAnswer) {
                otherAnswer.classList.remove('show');
                otherAnswer.style.display = 'none';
            }
            if (otherToggle) {
                otherToggle.textContent = '+';
            }
        }
    });
    
    // Toggle current FAQ item
    const isActive = faqItem.classList.contains('active');
    console.log('FAQ is currently active:', isActive);
    
    if (isActive) {
        // Close current item
        faqItem.classList.remove('active');
        answer.classList.remove('show');
        answer.style.display = 'none';
        toggle.textContent = '+';
        console.log('FAQ closed');
    } else {
        // Open current item
        faqItem.classList.add('active');
        answer.classList.add('show');
        answer.style.display = 'block';
        toggle.textContent = '−';
        console.log('FAQ opened');
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    console.log('Initializing smooth scrolling for', navLinks.length, 'links');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            console.log('Smooth scroll to:', targetId, 'Element found:', !!targetElement);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (!header) {
        console.error('Header element not found');
        return;
    }
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Intersection Observer for Animations
function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
        console.log('IntersectionObserver not supported');
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.benefit-card, .faq-item, .pricing-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Form Input Enhancement
function initFormEnhancements() {
    const emailInput = document.getElementById('email');
    
    if (emailInput) {
        // Add focus/blur effects
        emailInput.addEventListener('focus', function() {
            const formContainer = this.closest('.email-form');
            if (formContainer) {
                formContainer.style.borderColor = '#0066FF';
                formContainer.style.boxShadow = '0 0 0 3px rgba(0, 102, 255, 0.1)';
            }
        });
        
        emailInput.addEventListener('blur', function() {
            const formContainer = this.closest('.email-form');
            if (formContainer) {
                formContainer.style.borderColor = '';
                formContainer.style.boxShadow = '';
            }
        });
    }
}

// Button Click Effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.cta-button, .pricing-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Pricing button functionality
function initPricingButtons() {
    const pricingButtons = document.querySelectorAll('.pricing-button');
    
    pricingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll to email form for plan selection
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Focus on email input after scrolling
                setTimeout(() => {
                    const emailInput = document.getElementById('email');
                    if (emailInput) {
                        emailInput.focus();
                    }
                }, 1000);
            }
        });
    });
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure all elements are rendered
    setTimeout(() => {
        initScrollAnimations();
        initFormEnhancements();
        initButtonEffects();
        initPricingButtons();
    }, 100);
});

// Add CSS for ripple effect and animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .cta-button, .pricing-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
        20%, 40%, 60%, 80% { transform: translateX(2px); }
    }
    
    /* Smooth scroll behavior */
    html {
        scroll-behavior: smooth;
    }
    
    /* Enhanced focus states */
    .email-input:focus {
        outline: none;
    }
    
    .faq-question:focus {
        outline: 2px solid #0066FF;
        outline-offset: -2px;
    }
    
    .nav-link:focus {
        outline: 2px solid #0066FF;
        outline-offset: 2px;
    }
    
    /* Ensure confirmation message is properly styled */
    .confirmation-message {
        z-index: 10;
    }
    
    .confirmation-message.show {
        display: block !important;
        opacity: 1;
        visibility: visible;
    }
    
    /* FAQ answers should be hidden by default */
    .faq-answer {
        display: none;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease, padding 0.3s ease;
    }
    
    .faq-answer.show {
        display: block !important;
        max-height: 200px;
        overflow: visible;
    }
`;
document.head.appendChild(additionalStyles);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance optimization - lazy loading for images
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', function() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    });
}

// Keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    // Handle Escape key to close confirmation message
    if (e.key === 'Escape') {
        const confirmation = document.getElementById('confirmationMessage');
        if (confirmation && confirmation.classList.contains('show')) {
            hideConfirmation();
        }
    }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        toggleFAQ,
        showConfirmation,
        hideConfirmation
    };
}