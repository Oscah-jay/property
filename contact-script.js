// ============================================
// CONTACT FORM HANDLING WITH WEB3FORMS
// ============================================

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
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

    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;

    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    const formData = new FormData();
    formData.append('access_key', window.WEB3FORMS_ACCESS_KEY || 'b8bfc36e-d104-4d18-920c-d97e9a615144');
    formData.append('subject', 'New Contact Form Inquiry');
    formData.append('form_type', 'contact');
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('message', message);
    formData.append('from_name', name);

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            console.log('[v0] Contact form sent to Web3Forms successfully');
            submitButton.textContent = '✓ Message Sent!';
            submitButton.style.background = 'var(--light-gold)';

            // Reset form
            contactForm.reset();

            // Restore button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = 'var(--gold)';
                submitButton.disabled = false;
            }, 3000);
        } else {
            console.error('[v0] Web3Forms error:', data);
            submitButton.textContent = '✗ Error - Try Again';
            submitButton.style.background = '#d9534f';

            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = 'var(--gold)';
                submitButton.disabled = false;
            }, 3000);
        }
    } catch (error) {
        console.error('[v0] Form submission error:', error);
        submitButton.textContent = '✗ Error - Try Again';
        submitButton.style.background = '#d9534f';

        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = 'var(--gold)';
            submitButton.disabled = false;
        }, 3000);
    }
});