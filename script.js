// ============================================
// NAVIGATION & HAMBURGER MENU
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// IMAGE CAROUSEL FUNCTIONALITY
// ============================================

const carouselTracks = document.querySelectorAll('.carousel-track');

carouselTracks.forEach((track, index) => {
    const images = track.querySelectorAll('.carousel-image');
    const dotsContainer = document.getElementById(`dots${index + 1}`);
    let currentIndex = 0;

    // Create dots
    images.forEach((_, dotIndex) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (dotIndex === 0) dot.classList.add('active');
        dot.addEventListener('click', () => moveToSlide(dotIndex));
        dotsContainer.appendChild(dot);
    });

    function updateCarousel() {
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
        updateDots();
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function moveToSlide(index) {
        currentIndex = (index + images.length) % images.length;
        updateCarousel();
    }

    window[`moveCarousel_${index}`] = function(direction) {
        currentIndex = (currentIndex + direction + images.length) % images.length;
        updateCarousel();
    };
});

// Global moveCarousel function
function moveCarousel(button, direction) {
    const carousel = button.closest('.image-carousel');
    const track = carousel.querySelector('.carousel-track');
    const images = track.querySelectorAll('.carousel-image');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const dots = dotsContainer.querySelectorAll('.dot');
    
    let currentIndex = 0;
    dots.forEach((dot, i) => {
        if (dot.classList.contains('active')) currentIndex = i;
    });

    currentIndex = (currentIndex + direction + images.length) % images.length;
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

// ============================================
// BUYER/SELLER FORMS
// ============================================

function openBuyerForm() {
    document.getElementById('buyerModal').style.display = 'block';
}

function closeBuyerForm() {
    document.getElementById('buyerModal').style.display = 'none';
}

function openSellerForm() {
    document.getElementById('sellerModal').style.display = 'block';
}

function closeSellerForm() {
    document.getElementById('sellerModal').style.display = 'none';
}

// Close form when clicking outside
window.addEventListener('click', (e) => {
    const buyerModal = document.getElementById('buyerModal');
    const sellerModal = document.getElementById('sellerModal');
    
    if (e.target === buyerModal) {
        buyerModal.style.display = 'none';
    }
    if (e.target === sellerModal) {
        sellerModal.style.display = 'none';
    }
});

// Close forms with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('buyerModal').style.display = 'none';
        document.getElementById('sellerModal').style.display = 'none';
    }
});

async function submitBuyerForm(event) {
    event.preventDefault();
    
    const buyerForm = document.getElementById('buyerForm');
    const submitBtn = buyerForm.querySelector('.form-submit-btn');
    const originalText = submitBtn.textContent;
    
    // Disable button and show loading state
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    const formData = new FormData();
    formData.append('access_key', window.WEB3FORMS_ACCESS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY');
    formData.append('subject', 'New Buyer Inquiry');
    formData.append('form_type', 'buyer');
    formData.append('name', document.getElementById('buyerName').value);
    formData.append('email', document.getElementById('buyerEmail').value);
    formData.append('phone', document.getElementById('buyerPhone').value);
    formData.append('budget', document.getElementById('buyerBudget').value);
    formData.append('property_preference', document.getElementById('buyerPreference').value);
    formData.append('message', document.getElementById('buyerMessage').value);
    formData.append('from_name', document.getElementById('buyerName').value);

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            console.log('[v0] Buyer form sent to Web3Forms successfully');
            submitBtn.textContent = '✓ Application Submitted!';
            
            // Reset form and close after 2 seconds
            setTimeout(() => {
                buyerForm.reset();
                document.getElementById('buyerModal').style.display = 'none';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } else {
            console.error('[v0] Web3Forms error:', data);
            submitBtn.textContent = 'Error - Try Again';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }
    } catch (error) {
        console.error('[v0] Form submission error:', error);
        submitBtn.textContent = 'Error - Try Again';
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 3000);
    }
}

async function submitSellerForm(event) {
    event.preventDefault();
    
    const sellerForm = document.getElementById('sellerForm');
    const submitBtn = sellerForm.querySelector('.form-submit-btn');
    const originalText = submitBtn.textContent;
    
    // Disable button and show loading state
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    const formData = new FormData();
    formData.append('access_key', window.WEB3FORMS_ACCESS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY');
    formData.append('subject', 'New Property Listing');
    formData.append('form_type', 'seller');
    formData.append('name', document.getElementById('sellerName').value);
    formData.append('email', document.getElementById('sellerEmail').value);
    formData.append('phone', document.getElementById('sellerPhone').value);
    formData.append('property_address', document.getElementById('propertyAddress').value);
    formData.append('property_type', document.getElementById('propertyType').value);
    formData.append('property_size', document.getElementById('propertySize').value);
    formData.append('asking_price', document.getElementById('propertyPrice').value);
    formData.append('property_description', document.getElementById('propertyDescription').value);
    formData.append('from_name', document.getElementById('sellerName').value);

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            console.log('[v0] Seller form sent to Web3Forms successfully');
            submitBtn.textContent = '✓ Listing Submitted!';
            
            // Reset form and close after 2 seconds
            setTimeout(() => {
                sellerForm.reset();
                document.getElementById('sellerModal').style.display = 'none';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } else {
            console.error('[v0] Web3Forms error:', data);
            submitBtn.textContent = 'Error - Try Again';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }
    } catch (error) {
        console.error('[v0] Form submission error:', error);
        submitBtn.textContent = 'Error - Try Again';
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 3000);
    }
}

// ============================================
// LIGHTBOX GALLERY
// ============================================

function openLightbox(button) {
    const lightboxId = button.closest('.lightbox-gallery').querySelector('.lightbox').id;
    const lightbox = document.getElementById(lightboxId);
    lightbox.style.display = 'flex';
}

function closeLightbox(event) {
    const lightbox = event.target.closest('.lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}

// Close lightbox when clicking outside content
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('lightbox')) {
        e.target.style.display = 'none';
    }
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const lightboxes = document.querySelectorAll('.lightbox');
        lightboxes.forEach(lb => {
            if (lb.style.display === 'flex') {
                lb.style.display = 'none';
            }
        });
    }
});

// ============================================
// TESTIMONIALS CAROUSEL
// ============================================

let testimonialIndex = 0;

function showTestimonial(index) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');

    testimonialIndex = index;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[testimonialIndex].classList.add('active');
    dots[testimonialIndex].classList.add('active');
}

// Auto-rotate testimonials every 6 seconds
setInterval(() => {
    const slides = document.querySelectorAll('.testimonial-slide');
    testimonialIndex = (testimonialIndex + 1) % slides.length;
    showTestimonial(testimonialIndex);
}, 6000);

// ============================================
// CONTACT FORM VALIDATION
// ============================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Show success message
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;

    submitButton.textContent = '✓ Message Sent!';
    submitButton.style.background = 'var(--light-gold)';

    // Reset form
    contactForm.reset();

    // Restore button after 3 seconds
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.style.background = 'var(--gold)';
    }, 3000);

    console.log('[v0] Form submitted:', { name, email, message });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

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

// Observe property cards for scroll animations
document.querySelectorAll('.property-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    observer.observe(card);
});

// Observe testimonials section
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
testimonialSlides.forEach(slide => {
    observer.observe(slide);
});

// ============================================
// SMOOTH SCROLL OFFSET FOR FIXED NAVBAR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            const offsetTop = element.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// PARALLAX SCROLL EFFECT
// ============================================

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollValue = window.scrollY;
    
    if (hero) {
        hero.style.backgroundPosition = `0 ${scrollValue * 0.5}px`;
    }
});

// ============================================
// DYNAMIC PROPERTY CARD INTERACTION
// ============================================

document.querySelectorAll('.property-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// KEYBOARD NAVIGATION FOR CAROUSELS
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        const nextBtn = document.querySelector('.carousel-btn.prev');
        if (nextBtn && nextBtn.offsetParent !== null) {
            nextBtn.click();
        }
    } else if (e.key === 'ArrowRight') {
        const nextBtn = document.querySelector('.carousel-btn.next');
        if (nextBtn && nextBtn.offsetParent !== null) {
            nextBtn.click();
        }
    }
});

// ============================================
// TOUCH SUPPORT FOR CAROUSELS
// ============================================

let touchStartX = 0;
let touchEndX = 0;

function handleSwipe(carousel) {
    if (touchStartX - touchEndX > 50) {
        // Swiped left
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        if (nextBtn) nextBtn.click();
    } else if (touchEndX - touchStartX > 50) {
        // Swiped right
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        if (prevBtn) prevBtn.click();
    }
}

document.querySelectorAll('.image-carousel').forEach(carousel => {
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe(carousel);
    }, false);
});

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================

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

// ============================================
// VIRTUAL TOUR PLACEHOLDER INTERACTION
// ============================================

document.querySelectorAll('.tour-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', function() {
        alert('Virtual 360° tour will open here. Integrate with tools like Matterport or Zillow 3D Tour.');
    });
});

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('[v0] Property showcase website loaded successfully');

    // Add scroll animations to property cards
    const cards = document.querySelectorAll('.property-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `slideInUp 0.8s ease-out ${index * 0.2}s forwards`;
    });

    // Initialize first testimonial
    showTestimonial(0);
});
