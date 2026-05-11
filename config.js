
const WEB3FORMS_CONFIG = {
    ACCESS_KEY: 'b8bfc36e-d104-4d18-920c-d97e9a615144'
};

document.addEventListener('DOMContentLoaded', function() {
    // Replace placeholder with actual access key
    const scripts = document.querySelectorAll('script');
    const currentScript = Array.from(scripts).find(s => s.src.includes('script.js'));
    
    if (currentScript) {
        // Update the forms when page loads
        updateWeb3FormsAccessKey();
    }
});

function updateWeb3FormsAccessKey() {
}