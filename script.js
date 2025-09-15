// Landing Page JavaScript for Neuroscience Workshop

document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll("a[href^=\"#\"]");
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Button click handlers (placeholder for actual links)
    const signupButtons = document.querySelectorAll("[id^=\"signup-btn\"]");
    const scheduleButtons = document.querySelectorAll("[id^=\"schedule-btn\"]");

    signupButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            e.preventDefault();
            // Placeholder for Stripe payment link
            alert("Stripe payment link will be integrated here.\n\nThis button will redirect to the workshop registration payment page.");
            // In production, replace with:
            // window.open("YOUR_STRIPE_PAYMENT_LINK", "_blank");
        });
    });

    scheduleButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            e.preventDefault();
            // Placeholder for Calendly link
            alert("Calendly scheduling link will be integrated here.\n\nThis button will open the consultation scheduling calendar.");
            // In production, replace with:
            // window.open("YOUR_CALENDLY_LINK", "_blank");
        });
    });

    // Dynamic Stripe Link Configuration for Credit Card Payment Button
    function setupDynamicStripeLink() {
        try {
            // Define Stripe links
            const earlyBirdLink = "https://buy.stripe.com/5kQ28sbL41NW8sR5cjdQQ08";
            const regularLink = "https://buy.stripe.com/5kQ5kE9CWdwEbF3cELdQQ07";

            // Find the "Pay with Credit Card" button
            const creditCardButton = document.querySelector('.payment-card.alternative .btn');
            if (!creditCardButton) {
                console.error("Credit card payment button not found. Expected element with selector '.payment-card.alternative .btn'");
                return;
            }

            // Find the early bird deadline element
            const deadlineElement = document.querySelector('.early-bird-notice');
            if (!deadlineElement) {
                console.error("Early bird deadline element not found. Expected element with class '.early-bird-notice'");
                return;
            }

            // Extract deadline text and parse date
            const deadlineText = deadlineElement.textContent || deadlineElement.innerText;
            console.log("Deadline text found:", deadlineText);

            // Extract the date from text like "Early bird pricing ends September 19th!"
            const dateMatch = deadlineText.match(/([A-Za-z]+)\s+(\d{1,2})(st|nd|rd|th)/);
            if (!dateMatch) {
                console.error("Could not parse deadline date from text:", deadlineText);
                return;
            }

            const monthName = dateMatch[1];
            const day = parseInt(dateMatch[2]);
            const currentYear = 2025; // As specified in requirements

            // Create deadline date object (end of day)
            const deadlineDate = new Date(currentYear, getMonthNumber(monthName), day, 23, 59, 59, 999);
            
            if (isNaN(deadlineDate.getTime())) {
                console.error("Invalid deadline date created from:", monthName, day, currentYear);
                return;
            }

            // Get current date
            const today = new Date();
            
            // Determine which link to use
            const isEarlyBird = today <= deadlineDate;
            const linkToUse = isEarlyBird ? earlyBirdLink : regularLink;
            
            console.log("Today:", today.toDateString());
            console.log("Deadline:", deadlineDate.toDateString());
            console.log("Is early bird period:", isEarlyBird);
            console.log("Using link:", linkToUse);

            // Set the href attribute
            creditCardButton.href = linkToUse;

            // Update the click handler to open the link
            creditCardButton.addEventListener("click", function(e) {
                e.preventDefault();
                window.open(linkToUse, "_blank");
            });

        } catch (error) {
            console.error("Error setting up dynamic Stripe link:", error);
        }
    }

    // Helper function to convert month name to number
    function getMonthNumber(monthName) {
        const months = {
            'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5,
            'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11
        };
        return months[monthName.toLowerCase()];
    }

    // Initialize dynamic Stripe link setup
    setupDynamicStripeLink();

    // Toggle pricing section visibility
    window.showPricing = function() {
        const pricingAndPaymentSection = document.getElementById("pricing-and-payment-section");
        
        if (pricingAndPaymentSection.style.display === "none" || pricingAndPaymentSection.style.display === "") {
            pricingAndPaymentSection.style.display = "block";
            pricingAndPaymentSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        } else {
            pricingAndPaymentSection.style.display = "none";
        }
    };

    // Toggle group pricing table visibility
    window.toggleGroupPricing = function() {
        const groupPricingTable = document.getElementById("group-pricing-table");
        if (groupPricingTable.style.display === "none" || groupPricingTable.style.display === "") {
            groupPricingTable.style.display = "block";
        } else {
            groupPricingTable.style.display = "none";
        }
    };

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(".overview-card, .testimonial-card, .gallery-item, .date-card");
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });

    // Testimonials rotation (optional enhancement)
    const testimonialCards = document.querySelectorAll(".testimonial-card:not(.featured)");
    let currentTestimonial = 0;

    function rotateTestimonials() {
        testimonialCards.forEach((card, index) => {
            card.style.opacity = index === currentTestimonial ? "1" : "0.7";
            card.style.transform = index === currentTestimonial ? "scale(1.02)" : "scale(1)";
        });
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }

    // Start testimonial rotation after 3 seconds, then every 5 seconds
    setTimeout(() => {
        setInterval(rotateTestimonials, 5000);
    }, 3000);

    // Form validation (if forms are added later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Scroll to top functionality
    let scrollToTopButton = document.createElement("button");
    scrollToTopButton.innerHTML = "↑";
    scrollToTopButton.className = "scroll-to-top";
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #2563EB; /* Primary Blue */
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    `;

    document.body.appendChild(scrollToTopButton);

    scrollToTopButton.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Show/hide scroll to top button
    window.addEventListener("scroll", function() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.style.opacity = "1";
        } else {
            scrollToTopButton.style.opacity = "0";
        }
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        button.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-3px)";
        });
        
        button.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0)";
        });
    });

    // Pricing table highlight on hover
    const pricingRows = document.querySelectorAll(".group-pricing-table tbody tr");
    pricingRows.forEach(row => {
        row.addEventListener("mouseenter", function() {
            this.style.backgroundColor = "#e3f2fd";
        });
        
        row.addEventListener("mouseleave", function() {
            this.style.backgroundColor = "";
        });
    });

    // Gallery image modal (enhanced for multiple images)
    const galleryItems = document.querySelectorAll(".gallery-item");
    galleryItems.forEach(item => {
        item.addEventListener("click", function() {
            const modal = document.createElement("div");
            modal.classList.add("gallery-modal");
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                cursor: pointer;
                flex-direction: column;
                padding: 20px;
                box-sizing: border-box;
            `;
            
            const modalContent = document.createElement("div");
            modalContent.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 15px;
                max-width: 90%;
                max-height: 90%;
                overflow-y: auto;
                background-color: white;
                padding: 20px;
                border-radius: 10px;
            `;

            // For demonstration, let's assume each gallery item has a set of related images.
            // In a real scenario, you would fetch these images based on the clicked item.
            const imagesToShow = [
                this.querySelector("img").src, // The clicked image
                // Add more related images here if available
                // "path/to/related-image-1.jpg",
                // "path/to/related-image-2.jpg"
            ];

            imagesToShow.forEach(src => {
                const img = document.createElement("img");
                img.src = src;
                img.style.cssText = `
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                `;
                modalContent.appendChild(img);
            });
            
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            modal.addEventListener("click", function(e) {
                if (e.target === modal) { // Only close if clicking outside the content
                    document.body.removeChild(modal);
                }
            });
        });
    });

    // Console log for debugging
    console.log("Neuroscience Workshop Landing Page loaded successfully!");
    console.log("Ready for Stripe and Calendly integration.");
});

// Utility functions
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    }
    return phoneNumber;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        console.log("Copied to clipboard: " + text);
    });
}

// Analytics placeholder (replace with actual analytics code)
function trackEvent(eventName, eventData) {
    console.log("Event tracked:", eventName, eventData);
    // Replace with actual analytics tracking:
    // gtag("event", eventName, eventData);
    // or
    // analytics.track(eventName, eventData);
}




// Lightbox Gallery Functionality

class LightboxGallery {
    constructor() {
        this.albums = {
            'gallery-placeholder-1.jpg': {
                title: 'Live Workshop Sessions',
                description: 'Engaging participants in transformative neuroscience practices',
                images: [
                    {
                        src: 'gallery-placeholder-1.jpg',
                        caption: 'Live Workshop Sessions',
                        description: 'Engaging participants in transformative neuroscience practices'
                    },
                    {
                        src: 'gallery-placeholder-11.jpg',
                        caption: 'Interactive Learning Session',
                        description: 'Participants actively engaging with neuroscience concepts'
                    },
                    {
                        src: 'gallery-placeholder-12.jpg',
                        caption: 'Group Discussion',
                        description: 'Collaborative learning and knowledge sharing'
                    }
                ]
            },
            'gallery-placeholder-2.jpg': {
                title: 'Brain Mapping Research',
                description: '8+ years of brain-mapping team leadership with Dr. Joe Dispenza',
                images: [
                    {
                        src: 'gallery-placeholder-2.jpg',
                        caption: 'Brain Mapping Research',
                        description: '8+ years of brain-mapping team leadership with Dr. Joe Dispenza'
                    },
                    {
                        src: 'gallery-placeholder-21.jpg',
                        caption: 'EEG Data Analysis',
                        description: 'Advanced brain wave pattern analysis and interpretation'
                    },
                    {
                        src: 'gallery-placeholder-22.jpg',
                        caption: 'Research Laboratory',
                        description: 'State-of-the-art neuroscience research facilities'
                    }
                ]
            },
            'gallery-placeholder-3.jpg': {
                title: 'International Presentations',
                description: 'Presenting alongside Dr. Joe at advanced workshops worldwide',
                images: [
                    {
                        src: 'gallery-placeholder-3.jpg',
                        caption: 'International Presentations',
                        description: 'Presenting alongside Dr. Joe at advanced workshops worldwide'
                    },
                    {
                        src: 'gallery-placeholder-31.jpg',
                        caption: 'Conference Speaking',
                        description: 'Sharing research findings at international conferences'
                    },
                    {
                        src: 'gallery-placeholder-32.jpg',
                        caption: 'Workshop Leadership',
                        description: 'Leading advanced neuroscience workshops globally'
                    }
                ]
            },
            'gallery-placeholder-4.jpg': {
                title: 'Client Transformations',
                description: 'Documented success stories and life-changing results',
                images: [
                    {
                        src: 'gallery-placeholder-4.jpg',
                        caption: 'Client Transformations',
                        description: 'Documented success stories and life-changing results'
                    },
                    {
                        src: 'gallery-placeholder-41.jpg',
                        caption: 'Success Stories',
                        description: 'Real-life transformation testimonials and outcomes'
                    },
                    {
                        src: 'gallery-placeholder-42.jpg',
                        caption: 'Before & After',
                        description: 'Measurable changes in client well-being and performance'
                    }
                ]
            },
            'gallery-placeholder-5.jpg': {
                title: 'Advanced Meditation Training',
                description: 'Guided meditation sessions with real-time brain monitoring',
                images: [
                    {
                        src: 'gallery-placeholder-5.jpg',
                        caption: 'Advanced Meditation Training',
                        description: 'Guided meditation sessions with real-time brain monitoring'
                    },
                    {
                        src: 'gallery-placeholder-51.jpg',
                        caption: 'Test Indian Wells',
                        description: 'Test Indian wells description'
                    },
                    {
                        src: 'gallery-placeholder-52.jpg',
                        caption: 'Mindfulness Training',
                        description: 'Advanced mindfulness techniques and practices'
                    }
                ]
            },
            'gallery-placeholder-6.jpg': {
                title: 'Corporate Training Programs',
                description: 'Neuroscience-based leadership and performance enhancement',
                images: [
                    {
                        src: 'gallery-placeholder-6.jpg',
                        caption: 'Corporate Training Programs',
                        description: 'Neuroscience-based leadership and performance enhancement'
                    },
                    {
                        src: 'gallery-placeholder-61.png',
                        caption: 'Executive Coaching',
                        description: 'Leadership development through neuroscience principles'
                    },
                    {
                        src: 'gallery-placeholder-62.jpg',
                        caption: 'Team Building',
                        description: 'Corporate team enhancement and performance optimization'
                    }
                ]
            }
        };
        
        this.currentAlbum = null;
        this.currentImageIndex = 0;
        this.lightboxElement = null;
        
        this.init();
    }
    
    init() {
        this.createLightboxHTML();
        this.addGalleryOverlays();
        this.bindEvents();
    }
    
    createLightboxHTML() {
        const lightboxHTML = `
            <div id="lightbox-overlay" class="lightbox-overlay">
                <div class="lightbox-container">
                    <button class="lightbox-close" id="lightbox-close">&times;</button>
                    <button class="lightbox-nav lightbox-prev" id="lightbox-prev">&#8249;</button>
                    <button class="lightbox-nav lightbox-next" id="lightbox-next">&#8250;</button>
                    <img class="lightbox-image" id="lightbox-image" src="" alt="">
                    <div class="lightbox-caption">
                        <h4 id="lightbox-title"></h4>
                        <p id="lightbox-description"></p>
                    </div>
                    <div class="lightbox-counter" id="lightbox-counter"></div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        this.lightboxElement = document.getElementById('lightbox-overlay');
    }
    
    addGalleryOverlays() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            const img = item.querySelector('.gallery-image');
            const imageSrc = img.src.split('/').pop(); // Get filename only
            
            if (this.albums[imageSrc]) {
                const overlay = document.createElement('div');
                overlay.className = 'view-album-overlay';
                overlay.innerHTML = '<button class="view-album-btn">View Album</button>';
                
                item.appendChild(overlay);
                
                overlay.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.openAlbum(imageSrc);
                });
            }
        });
    }
    
    bindEvents() {
        // Close lightbox
        document.getElementById('lightbox-close').addEventListener('click', () => {
            this.closeLightbox();
        });
        
        // Navigation
        document.getElementById('lightbox-prev').addEventListener('click', () => {
            this.previousImage();
        });
        
        document.getElementById('lightbox-next').addEventListener('click', () => {
            this.nextImage();
        });
        
        // Close on overlay click
        this.lightboxElement.addEventListener('click', (e) => {
            if (e.target === this.lightboxElement) {
                this.closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.lightboxElement.classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
    }
    
    openAlbum(imageSrc) {
        this.currentAlbum = this.albums[imageSrc];
        this.currentImageIndex = 0;
        
        if (this.currentAlbum) {
            this.updateLightboxContent();
            this.lightboxElement.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }
    
    closeLightbox() {
        this.lightboxElement.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        this.currentAlbum = null;
        this.currentImageIndex = 0;
    }
    
    nextImage() {
        if (this.currentAlbum && this.currentImageIndex < this.currentAlbum.images.length - 1) {
            this.currentImageIndex++;
            this.updateLightboxContent();
        }
    }
    
    previousImage() {
        if (this.currentAlbum && this.currentImageIndex > 0) {
            this.currentImageIndex--;
            this.updateLightboxContent();
        }
    }
    
    updateLightboxContent() {
        if (!this.currentAlbum) return;
        
        const currentImage = this.currentAlbum.images[this.currentImageIndex];
        
        document.getElementById('lightbox-image').src = currentImage.src;
        document.getElementById('lightbox-image').alt = currentImage.caption;
        document.getElementById('lightbox-title').textContent = currentImage.caption;
        document.getElementById('lightbox-description').textContent = currentImage.description;
        document.getElementById('lightbox-counter').textContent = 
            `${this.currentImageIndex + 1} / ${this.currentAlbum.images.length}`;
        
        // Update navigation button visibility
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        
        prevBtn.style.opacity = this.currentImageIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = this.currentImageIndex === this.currentAlbum.images.length - 1 ? '0.5' : '1';
        
        prevBtn.style.pointerEvents = this.currentImageIndex === 0 ? 'none' : 'auto';
        nextBtn.style.pointerEvents = this.currentImageIndex === this.currentAlbum.images.length - 1 ? 'none' : 'auto';
    }
}

// Initialize the lightbox gallery when DOM is loaded - but wait for existing scripts to load first
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure all other scripts have loaded
    setTimeout(() => {
        new LightboxGallery();
    }, 500);
});