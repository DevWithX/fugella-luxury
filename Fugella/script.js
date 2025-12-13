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

    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            const query = prompt('🔍 Search for brands, items, or categories:');
            if (query) {
                console.log('Search query:', query);
                alert(`Searching for "${query}"... Search feature coming soon!`);
            }
        });
    }

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
            
            console.log('Newsletter subscription:', email);
            showNotification('🎉 Thanks for subscribing! Check your inbox for exclusive offers.');
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
    const saved = localStorage.getItem('fugellaWishlist');
    if (saved) {
        wishlist = JSON.parse(saved);
        console.log('Loaded wishlist from storage:', wishlist);
        updateWishlistUI();
    }
}

function saveWishlist() {
    localStorage.setItem('fugellaWishlist', JSON.stringify(wishlist));
    console.log('Wishlist saved to storage');
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
    setTimeout(() => modal.classList.add('active'), 10);
}

function createWishlistModal() {
    const modal = document.createElement('div');
    modal.className = 'wishlist-modal';
    modal.innerHTML = `
        <div class="wishlist-content">
            <div class="wishlist-header">
                <h2>MY WISHLIST</h2>
                <button class="close-modal">×</button>
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
    
    container.innerHTML = wishlist.map(item => `
        <div class="wishlist-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="wishlist-item-image">
            <div class="wishlist-item-info">
                <div class="wishlist-item-brand">${item.brand}</div>
                <div class="wishlist-item-name">${item.name}</div>
                <div class="wishlist-item-price">${item.price}</div>
            </div>
            <button class="remove-wishlist-btn" onclick="removeFromWishlist('${item.id}')">Remove</button>
        </div>
    `).join('');
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