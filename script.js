// Landing Page JavaScript for Neuroscience Workshop

document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for anchor links (excluding buttons and special links)
    const links = document.querySelectorAll("a[href^=\"#\"]:not(.btn):not(#toggle-group-discounts)");
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Function to toggle pricing section visibility
    function showPricing() {
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
    }
    
    // Bind the "View Pricing & Register" button to the showPricing function
    const viewPricingBtn = document.getElementById("view-pricing-btn");
    if (viewPricingBtn) {
        viewPricingBtn.addEventListener("click", function(e) {
            e.preventDefault();
            showPricing();
        });
    }
    
    // Function to toggle group discounts image only (no table)
    function toggleGroupDiscounts() {
        const groupDiscountImageContainer = document.getElementById("group-discount-image-container");
        
        if (groupDiscountImageContainer.style.display === "none" || groupDiscountImageContainer.style.display === "") {
            groupDiscountImageContainer.style.display = "block";
        } else {
            groupDiscountImageContainer.style.display = "none";
        }
    }

    // Bind the "Group Discounts" hyperlink to the toggleGroupDiscounts function
    const toggleGroupDiscountsLink = document.getElementById("toggle-group-discounts");
    if (toggleGroupDiscountsLink) {
        toggleGroupDiscountsLink.addEventListener("click", function(e) {
            e.preventDefault();
            toggleGroupDiscounts();
        });
    }


    // Button click handlers (placeholder for actual links)
    const signupButtons = document.querySelectorAll("[id^=\"signup-btn\"]");
    const scheduleButtons = document.querySelectorAll("[id^=\"schedule-btn\"]");

    signupButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            e.preventDefault();
            // For signup-btn-final (Register Now), ensure pricing section is visible and scroll to it
            if (button.id === 'signup-btn-final') {
                const pricingAndPaymentSection = document.getElementById("pricing-and-payment-section");
                // Always show the pricing section (don't toggle)
                pricingAndPaymentSection.style.display = "block";
                pricingAndPaymentSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            } else {
                // Placeholder for Stripe payment link for other signup buttons
                alert("Stripe payment link will be integrated here.\n\nThis button will redirect to the workshop registration payment page.");
                // In production, replace with:
                // window.open("YOUR_STRIPE_PAYMENT_LINK", "_blank");
            }
        });
    });

    scheduleButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            e.preventDefault();
            // Calendly link
            window.open("https://calendly.com/claudiaruiz-mastery/new-meeting", "_blank");
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

    // Gallery image modal with carousel functionality
    const galleryItems = document.querySelectorAll(".gallery-item");
    galleryItems.forEach((item, galleryIndex) => {
        const galleryImages = item.querySelectorAll(".carousel-slide img");
        
        galleryImages.forEach((img, imageIndex) => {
            img.addEventListener("click", function(e) {
                e.stopPropagation();
                openGalleryModal(galleryIndex, imageIndex);
            });
        });
    });

    function openGalleryModal(galleryIndex, startImageIndex) {
        const galleryItem = document.querySelectorAll(".gallery-item")[galleryIndex];
        const images = galleryItem.querySelectorAll(".carousel-slide img");
        let currentImageIndex = startImageIndex;

        // Create modal
        const modal = document.createElement("div");
        modal.classList.add("gallery-modal");
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            padding: 20px;
            box-sizing: border-box;
        `;

        // Create modal content container
        const modalContent = document.createElement("div");
        modalContent.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        // Create image container
        const imageContainer = document.createElement("div");
        imageContainer.style.cssText = `
            position: relative;
            max-width: 100%;
            max-height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        // Create main image
        const modalImage = document.createElement("img");
        modalImage.style.cssText = `
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        `;

        // Create navigation arrows
        const prevArrow = document.createElement("button");
        prevArrow.innerHTML = "‹";
        prevArrow.style.cssText = `
            position: fixed;
            left: 30px;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(255, 255, 255, 0.9);
            color: #333;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            font-size: 30px;
            font-weight: bold;
            cursor: pointer;
            z-index: 2001;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const nextArrow = document.createElement("button");
        nextArrow.innerHTML = "›";
        nextArrow.style.cssText = `
            position: fixed;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(255, 255, 255, 0.9);
            color: #333;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            font-size: 30px;
            font-weight: bold;
            cursor: pointer;
            z-index: 2001;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        // Create image subtitle
        const imageSubtitle = document.createElement("div");
        imageSubtitle.style.cssText = `
            position: fixed;
            bottom: 60px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 400;
            z-index: 2001;
            backdrop-filter: blur(10px);
            max-width: 80%;
            text-align: center;
            line-height: 1.4;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        `;

        // Create image counter
        const imageCounter = document.createElement("div");
        imageCounter.style.cssText = `
            position: fixed;
            top: 30px;
            right: 80px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 500;
            z-index: 2001;
            backdrop-filter: blur(10px);
        `;

        // Create close button
        const closeButton = document.createElement("button");
        closeButton.innerHTML = "×";
        closeButton.style.cssText = `
            position: fixed;
            top: 30px;
            right: 30px;
            background-color: rgba(255, 255, 255, 0.9);
            color: #333;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 30px;
            font-weight: bold;
            cursor: pointer;
            z-index: 2001;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        // Function to update modal image
        function updateModalImage() {
            modalImage.src = images[currentImageIndex].src;
            modalImage.alt = images[currentImageIndex].alt;
            imageCounter.textContent = `Image ${currentImageIndex + 1} of ${images.length}`;
            imageSubtitle.textContent = images[currentImageIndex].alt || 'Image';
            
            // Add visual indication of more images with subtle shadow effects
            if (images.length > 1) {
                if (currentImageIndex > 0) {
                    modalImage.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.5), -20px 0 40px rgba(255, 255, 255, 0.1)";
                } else if (currentImageIndex < images.length - 1) {
                    modalImage.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.5), 20px 0 40px rgba(255, 255, 255, 0.1)";
                } else {
                    modalImage.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.5)";
                }
            }
        }

        // Navigation functions
        function goToPrevious() {
            currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
            updateModalImage();
        }

        function goToNext() {
            currentImageIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
            updateModalImage();
        }

        // Event listeners
        prevArrow.addEventListener("click", goToPrevious);
        nextArrow.addEventListener("click", goToNext);
        
        closeButton.addEventListener("click", function() {
            document.body.removeChild(modal);
        });

        // Close modal when clicking outside image
        modal.addEventListener("click", function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        // Hover effects for arrows and close button
        [prevArrow, nextArrow, closeButton].forEach(button => {
            button.addEventListener("mouseenter", function() {
                this.style.backgroundColor = "rgba(255, 255, 255, 1)";
                this.style.transform = this === closeButton ? "scale(1.1)" : "translateY(-50%) scale(1.1)";
            });
            
            button.addEventListener("mouseleave", function() {
                this.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
                this.style.transform = this === closeButton ? "scale(1)" : "translateY(-50%) scale(1)";
            });
        });

        // Assemble modal
        imageContainer.appendChild(modalImage);
        modalContent.appendChild(imageContainer);
        modal.appendChild(modalContent);
        modal.appendChild(prevArrow);
        modal.appendChild(nextArrow);
        modal.appendChild(imageSubtitle);
        modal.appendChild(imageCounter);
        modal.appendChild(closeButton);
        
        document.body.appendChild(modal);
        
        // Initialize with current image
        updateModalImage();

        // Add keyboard navigation
        function handleKeyPress(e) {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    goToPrevious();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    goToNext();
                    break;
                case 'Escape':
                    e.preventDefault();
                    document.body.removeChild(modal);
                    break;
            }
        }

        document.addEventListener("keydown", handleKeyPress);
        
        // Remove keyboard listener when modal is closed
        const originalRemoveChild = modal.remove || function() { this.parentNode.removeChild(this); };
        modal.remove = function() {
            document.removeEventListener("keydown", handleKeyPress);
            originalRemoveChild.call(this);
        };

        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        modal.addEventListener("touchstart", function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });

        modal.addEventListener("touchend", function(e) {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            const minSwipeDistance = 50;
            
            // Only process horizontal swipes (ignore vertical scrolling)
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    // Swipe right - go to previous image
                    goToPrevious();
                } else {
                    // Swipe left - go to next image
                    goToNext();
                }
            }
        });
    }

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

// Gallery Carousel Functionality
function changeSlide(button, direction) {
    const carousel = button.closest('.gallery-carousel');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    
    // Find current active slide
    let currentIndex = 0;
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    // Calculate new index
    let newIndex = currentIndex + direction;
    if (newIndex >= slides.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = slides.length - 1;
    }
    
    // Update slides
    slides[currentIndex].classList.remove('active');
    slides[newIndex].classList.add('active');
    
    // Update dots
    dots[currentIndex].classList.remove('active');
    dots[newIndex].classList.add('active');
}

function currentSlide(dot, slideNumber) {
    const carousel = dot.closest('.gallery-carousel');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    // Add active class to selected slide and dot
    slides[slideNumber - 1].classList.add('active');
    dots[slideNumber - 1].classList.add('active');
}

// Auto-advance carousel (optional)
function initCarouselAutoplay() {
    const carousels = document.querySelectorAll('.gallery-carousel');
    
    carousels.forEach(carousel => {
        let autoplayInterval;
        
        // Start autoplay
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                const nextBtn = carousel.querySelector('.next-btn');
                changeSlide(nextBtn, 1);
            }, 4000); // Change slide every 4 seconds
        }
        
        // Stop autoplay
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        // Start autoplay on load
        startAutoplay();
        
        // Pause autoplay on hover
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
        
        // Pause autoplay when user interacts with controls
        const buttons = carousel.querySelectorAll('.carousel-btn, .dot');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                stopAutoplay();
                setTimeout(startAutoplay, 8000); // Restart after 8 seconds
            });
        });
    });
}

// Initialize carousel autoplay when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure all elements are rendered
    setTimeout(initCarouselAutoplay, 1000);
});

// Touch/swipe support for mobile devices
function initCarouselTouchSupport() {
    const carousels = document.querySelectorAll('.gallery-carousel');
    
    carousels.forEach(carousel => {
        let startX = 0;
        let startY = 0;
        let isScrolling = false;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isScrolling = false;
        });
        
        carousel.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            const diffX = startX - e.touches[0].clientX;
            const diffY = startY - e.touches[0].clientY;
            
            if (Math.abs(diffY) > Math.abs(diffX)) {
                isScrolling = true;
            }
        });
        
        carousel.addEventListener('touchend', (e) => {
            if (!startX || !startY || isScrolling) return;
            
            const diffX = startX - e.touches[0].clientX;
            const threshold = 50; // Minimum swipe distance
            
            if (Math.abs(diffX) > threshold) {
                const nextBtn = carousel.querySelector('.next-btn');
                const prevBtn = carousel.querySelector('.prev-btn');
                
                if (diffX > 0) {
                    // Swiped left - go to next slide
                    changeSlide(nextBtn, 1);
                } else {
                    // Swiped right - go to previous slide
                    changeSlide(prevBtn, -1);
                }
            }
            
            startX = 0;
            startY = 0;
        });
    });
}

// Initialize touch support
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initCarouselTouchSupport, 1000);
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Only activate if a carousel is in focus or visible
    const activeCarousel = document.querySelector('.gallery-carousel:hover');
    if (!activeCarousel) return;
    
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevBtn = activeCarousel.querySelector('.prev-btn');
        changeSlide(prevBtn, -1);
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextBtn = activeCarousel.querySelector('.next-btn');
        changeSlide(nextBtn, 1);
    }
});