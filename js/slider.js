// Gallery Slider Functionality

document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    
    if (sliderContainer) {
        const sliderTrack = sliderContainer.querySelector('.slider-track');
        const slides = sliderTrack.querySelectorAll('.slide');
        const prevButton = sliderContainer.querySelector('.prev');
        const nextButton = sliderContainer.querySelector('.next');
        const dotsContainer = document.querySelector('.slider-dots');
        
        let currentIndex = 0;
        const slideCount = slides.length;
        
        // Create dots
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('data-index', i);
            dotsContainer.appendChild(dot);
        }
        
        const dots = dotsContainer.querySelectorAll('.dot');
        
        // Function to update slider position
        function updateSlider() {
            sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update active dot
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Previous slide
        prevButton.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateSlider();
        });
        
        // Next slide
        nextButton.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % slideCount;
            updateSlider();
        });
        
        // Dot navigation
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                currentIndex = parseInt(this.getAttribute('data-index'));
                updateSlider();
            });
        });
        
        // Auto slide (optional)
        let autoSlideInterval;
        
        function startAutoSlide() {
            autoSlideInterval = setInterval(function() {
                currentIndex = (currentIndex + 1) % slideCount;
                updateSlider();
            }, 5000); // Change slide every 5 seconds
        }
        
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }
        
        // Start auto slide
        startAutoSlide();
        
        // Pause auto slide on hover
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
        
        // Touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        }, { passive: true });
        
        sliderContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next slide
                currentIndex = (currentIndex + 1) % slideCount;
                updateSlider();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous slide
                currentIndex = (currentIndex - 1 + slideCount) % slideCount;
                updateSlider();
            }
        }
    }
});