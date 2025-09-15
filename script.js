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