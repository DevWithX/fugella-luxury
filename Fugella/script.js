// FUGELLA - Interactive JavaScript with Wishlist Persistence
console.log('🛍️ FUGELLA Marketplace Loaded');

// Wishlist state
let wishlist = [];

document.addEventListener('DOMContentLoaded', function() {

    // Load wishlist from localStorage on page load
    loadWishlist();

    // ===== SMOOTH SCROLLING =====
    const shopBtn = document.getElementById('shopBtn');
    const ctaBannerBtn = document.getElementById('ctaBannerBtn');

    if (shopBtn) {
        shopBtn.addEventListener('click', function() {
            document.getElementById('products').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    if (ctaBannerBtn) {
        ctaBannerBtn.addEventListener('click', function() {
            alert('🎉 Account creation coming soon! For now, enjoy browsing our collection.');
        });
    }

    // ===== SELL BUTTON =====
    const sellBtn = document.getElementById('sellBtn');
    if (sellBtn) {
        sellBtn.addEventListener('click', function() {
            alert('📦 Seller dashboard coming soon! You\'ll be able to list your luxury items in minutes.');
        });
    }

    // ===== NAV ICONS =====
    const searchIcon = document.getElementById('searchIcon');
    const accountIcon = document.getElementById('accountIcon');
    const cartIcon = document.getElementById('cartIcon');
    const wishlistIcon = document.getElementById('wishlistIcon');

    const searchInput = document.getElementById('productSearch');
    const filterProducts = () => {
        const query = searchInput.value.trim().toLowerCase();
        let count = 0;
        document.querySelectorAll('.product-card').forEach(card => {
            const matches = `${card.querySelector('.product-brand').textContent} ${card.querySelector('.product-name').textContent}`.toLowerCase().includes(query);
            card.hidden = !matches;
            if (matches) count++;
        });
        document.getElementById('searchStatus').textContent = count ? `${count} ${count === 1 ? "piece" : "pieces"} found` : 'No matching pieces. Try another brand or product name.';
    };
    searchInput.addEventListener('input', filterProducts);
    if (searchIcon) searchIcon.addEventListener('click', () => {
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        searchInput.focus({ preventScroll: true });
    });
    filterProducts();

    if (accountIcon) {
        accountIcon.addEventListener('click', function() {
            alert('👤 Account login coming soon! Stay tuned for personalized features.');
        });
    }

    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            alert('🛍️ Shopping cart coming soon! For now, browse and add items to your wishlist.');
        });
    }

    // ===== WISHLIST ICON - OPEN MODAL =====
    if (wishlistIcon) {
        wishlistIcon.addEventListener('click', function() {
            openWishlistModal();
        });
    }

    // ===== CATEGORY CARDS =====
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            console.log('Category clicked:', category);
            alert(`Viewing ${category.charAt(0).toUpperCase() + category.slice(1)} collection...`);
        });
    });

    // ===== PRODUCT CARDS =====
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking wishlist button
            if (e.target.classList.contains('wishlist-btn')) {
                return;
            }

            const productId = this.getAttribute('data-id');
            const brand = this.querySelector('.product-brand').textContent;
            const name = this.querySelector('.product-name').textContent;
            const price = this.querySelector('.product-price').textContent;

            console.log('Product clicked:', { productId, brand, name, price });
            alert(`${brand} - ${name}\nPrice: ${price}\n\n✨ Product detail page coming soon!`);
        });

        // Add hover effect enhancement
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // ===== WISHLIST FUNCTIONALITY =====
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');

    wishlistButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent product card click

            const productCard = this.closest('.product-card');
            const productId = productCard.getAttribute('data-id');
            const brand = productCard.querySelector('.product-brand').textContent;
            const name = productCard.querySelector('.product-name').textContent;
            const price = productCard.querySelector('.product-price').textContent;
            const imageSrc = productCard.querySelector('.product-image img').src;

            toggleWishlist(productId, brand, name, price, imageSrc, this);
        });
    });

    // ===== NEWSLETTER SUBSCRIPTION =====
    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('.newsletter-input');

    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', function() {
            const email = newsletterInput.value.trim();

            if (!email) {
                alert('⚠️ Please enter your email address');
                return;
            }

            if (!isValidEmail(email)) {
                alert('⚠️ Please enter a valid email address');
                return;
            }

            // Demo only: do not collect or transmit the entered address.
            showNotification('Demo only — no subscription was created and no email was sent.');
            newsletterInput.value = '';
        });

        // Allow Enter key to submit
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                newsletterBtn.click();
            }
        });
    }

    // ===== NAV LINKS SMOOTH SCROLL =====
    const navLinks = document.querySelectorAll('.nav-center a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#sell') {
                alert('📦 Seller dashboard coming soon!');
                return;
            }

            // Smooth scroll to section if it exists
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                alert(`${this.textContent} collection page coming soon!`);
            }
        });
    });

    // ===== LOGO CLICK =====
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== FOOTER LINKS =====
    const footerLinks = document.querySelectorAll('.footer-section a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent;
            console.log('Footer link clicked:', linkText);
            alert(`${linkText} page coming soon! We're building something amazing.`);
        });
    });

    // ===== SCROLL ANIMATION =====
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

    // Observe sections for fade-in effect
    const sections = document.querySelectorAll('.categories, .featured, .how-it-works, .cta-banner');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    console.log('✅ All interactive features loaded successfully!');
});

// ===== WISHLIST FUNCTIONS =====

function loadWishlist() {
    try {
        const saved = JSON.parse(localStorage.getItem('fugellaWishlist') || '[]');
        const ids = new Set(Array.isArray(saved) ? saved.map(item => item?.id) : []);
        // Restore only known catalog items, never HTML or URLs from storage.
        wishlist = Array.from(document.querySelectorAll('.product-card')).filter(card => ids.has(card.dataset.id)).map(card => ({
            id: card.dataset.id,
            brand: card.querySelector('.product-brand').textContent,
            name: card.querySelector('.product-name').textContent,
            price: card.querySelector('.product-price').textContent,
            image: card.querySelector('.product-image img').src,
        }));
    } catch { wishlist = []; }
    updateWishlistUI();
}

function saveWishlist() {
    try { localStorage.setItem('fugellaWishlist', JSON.stringify(wishlist)); }
    catch { showNotification('Wishlist is available for this visit; browser storage is unavailable.'); }
}

function toggleWishlist(id, brand, name, price, image, btnElement) {
    const existingIndex = wishlist.findIndex(item => item.id === id);

    if (existingIndex !== -1) {
        // Remove from wishlist
        wishlist.splice(existingIndex, 1);
        btnElement.classList.remove('active');
        btnElement.textContent = '♡';
        showNotification(`Removed from wishlist`);
    } else {
        // Add to wishlist
        wishlist.push({ id, brand, name, price, image });
        btnElement.classList.add('active');
        btnElement.textContent = '♥';
        showNotification(`${brand} ${name} added to wishlist!`);
    }

    saveWishlist();
    updateWishlistUI();
}

function updateWishlistUI() {
    const badge = document.getElementById('wishlistBadge');
    const count = wishlist.length;

    if (badge) {
        badge.textContent = count;
        if (count > 0) {
            badge.classList.add('active');
        } else {
            badge.classList.remove('active');
        }
    }

    // Update all wishlist button states
    const allButtons = document.querySelectorAll('.wishlist-btn');
    allButtons.forEach(btn => {
        const productCard = btn.closest('.product-card');
        const productId = productCard.getAttribute('data-id');
        const isInWishlist = wishlist.some(item => item.id === productId);
        btn.setAttribute('aria-pressed', String(isInWishlist));
        btn.setAttribute('aria-label', `${isInWishlist ? 'Remove from' : 'Add to'} wishlist: ${productCard.querySelector('.product-name').textContent}`);

        if (isInWishlist) {
            btn.classList.add('active');
            btn.textContent = '♥';
        } else {
            btn.classList.remove('active');
            btn.textContent = '♡';
        }
    });
}

function openWishlistModal() {
    // Create modal if it doesn't exist
    let modal = document.querySelector('.wishlist-modal');
    if (!modal) {
        modal = createWishlistModal();
        document.body.appendChild(modal);
    }

    // Populate with current wishlist
    renderWishlistItems();

    // Show modal
    modal.showModal();
    modal.classList.add('active');
}

function createWishlistModal() {
    const modal = document.createElement('dialog');
    modal.className = 'wishlist-modal';
    modal.setAttribute('aria-labelledby', 'wishlistTitle');
    modal.innerHTML = `
        <div class="wishlist-content">
            <div class="wishlist-header">
                <h2 id="wishlistTitle">MY WISHLIST</h2>
                <button class="close-modal" aria-label="Close wishlist">×</button>
            </div>
            <div class="wishlist-items" id="wishlistItemsContainer"></div>
        </div>
    `;

    // Close modal on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeWishlistModal();
        }
    });

    // Close button
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', closeWishlistModal);

    return modal;
}

function closeWishlistModal() {
    const modal = document.querySelector('.wishlist-modal');
    if (modal) {
        modal.classList.remove('active');
        modal.close();
    }
}

function renderWishlistItems() {
    const container = document.getElementById('wishlistItemsContainer');

    if (wishlist.length === 0) {
        container.innerHTML = `
            <div class="empty-wishlist">
                <div class="empty-wishlist-icon">❤️</div>
                <p>Your wishlist is empty</p>
                <button class="btn-primary" onclick="closeWishlistModal()">Continue Shopping</button>
            </div>
        `;
        return;
    }

    container.replaceChildren();
    for (const item of wishlist) {
        const row = document.createElement('div'); row.className = 'wishlist-item';
        const image = document.createElement('img'); image.src = item.image; image.alt = item.name; image.className = 'wishlist-item-image';
        const info = document.createElement('div'); info.className = 'wishlist-item-info';
        for (const field of ['brand', 'name', 'price']) {
            const text = document.createElement('div'); text.className = `wishlist-item-${field}`; text.textContent = item[field]; info.appendChild(text);
        }
        const remove = document.createElement('button'); remove.className = 'remove-wishlist-btn'; remove.textContent = 'Remove';
        remove.setAttribute('aria-label', `Remove ${item.name} from wishlist`);
        remove.addEventListener('click', () => { removeFromWishlist(item.id); document.querySelector('.close-modal').focus(); });
        row.append(image, info, remove); container.appendChild(row);
    }
}

function removeFromWishlist(id) {
    wishlist = wishlist.filter(item => item.id !== id);
    saveWishlist();
    updateWishlistUI();
    renderWishlistItems();
    showNotification('Item removed from wishlist');
}

// ===== UTILITY FUNCTIONS =====

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: #0a0a0a;
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        font-size: 0.9rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
