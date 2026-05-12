/* ============================================
   PROPERTIES LISTING PAGE - FILTER FUNCTIONALITY
   ============================================ */

function filterProperties() {
    const typeFilter = document.getElementById('typeFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    const cards = document.querySelectorAll('.property-list-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const type = card.getAttribute('data-type');
        const price = parseInt(card.getAttribute('data-price'));
        
        let typeMatch = !typeFilter || type.includes(typeFilter);
        let priceMatch = true;

        if (priceFilter) {
            if (priceFilter === 'under-1m') priceMatch = price < 1000000;
            else if (priceFilter === '1m-2m') priceMatch = price >= 1000000 && price < 2000000;
            else if (priceFilter === '2m-3m') priceMatch = price >= 2000000 && price < 3000000;
            else if (priceFilter === 'above-3m') priceMatch = price >= 3000000;
        }

        if (typeMatch && priceMatch) {
            card.style.display = 'block';
            visibleCount++;
            card.style.animation = 'slideInUp 0.6s ease-out';
        } else {
            card.style.display = 'none';
        }
    });

    // Show or hide no results message
    let noResultsMsg = document.getElementById('noResultsMsg');
    if (visibleCount === 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.id = 'noResultsMsg';
            noResultsMsg.className = 'no-results';
            noResultsMsg.innerHTML = '<h3>No properties found</h3><p>Try adjusting your filters to see more options.</p>';
            document.querySelector('.properties-grid').appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
    } else {
        if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }
    }

    console.log('[v0] Filtered properties - Type:', typeFilter, 'Price:', priceFilter, 'Visible:', visibleCount);
}

function resetFilters() {
    document.getElementById('typeFilter').value = '';
    document.getElementById('priceFilter').value = '';
    
    const cards = document.querySelectorAll('.property-list-card');
    cards.forEach(card => {
        card.style.display = 'block';
    });

    let noResultsMsg = document.getElementById('noResultsMsg');
    if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }

    console.log('[v0] Filters reset - showing all properties');
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.property-list-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.1) + 's';
    });
});