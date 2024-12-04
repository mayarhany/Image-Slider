// * Elements
const sliderWrapper = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.slide');
const nextButton = document.querySelector('.next-button');
const prevButton = document.querySelector('.prev-button');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let slideInterval;

// * Function to update slider position and active dot
function updateSlider(index) {
    sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// * Function to move to next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider(currentIndex);
}

// * Function to move to previous slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider(currentIndex);
}

// * Pause slider when mouse hover
function pauseSlider() {
    clearInterval(slideInterval);
}

// * Resume slider
function startSlider() {
    slideInterval = setInterval(nextSlide, 3000);
}

// * Event Listeners
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);
dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
    currentIndex = parseInt(e.target.dataset.index);
    updateSlider(currentIndex);
    });
});

document.querySelector('.slider-container').addEventListener('mouseenter', pauseSlider);
document.querySelector('.slider-container').addEventListener('mouseleave', startSlider);

// * Swipe Functionality
let touchStartX = 0;

sliderWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

sliderWrapper.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) nextSlide(); // Swipe left
    if (touchEndX - touchStartX > 50) prevSlide(); // Swipe right
});


// * Start the slider
startSlider();