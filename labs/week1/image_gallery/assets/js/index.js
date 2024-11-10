import { 
    closeButton, galleryGrid, imageContainer,  prevButton,
    imageData, lightbox, lightboxCaption, nextButton 
} from "./global.js";

let currentImageIndex = 0;
let isAnimating = false;

 // Create gallery thumbnails
 function createGallery() {
    const fragment  = document.createDocumentFragment()
    imageData.forEach((image, index) => {
        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.className = 'thumbnail-container';
        
        const img = document.createElement('img');
        img.src = image.thumbnail;
        img.alt = image.caption;
        
        thumbnailContainer.appendChild(img);
        thumbnailContainer.addEventListener('click', () => openLightbox(index));
        
        fragment.appendChild(thumbnailContainer);
    });
    galleryGrid.append(fragment)
}

function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxContent(true);
    lightbox.classList.add('active');
    updateNavigationButtons();
}

function closeLightbox() {
    lightbox.classList.remove('active');
    // Clear images when closing
    imageContainer.innerHTML = '';
}

// Update lightbox content with sliding animations
function updateLightboxContent(isInitial = false, direction = 'next') {
    if (isAnimating && !isInitial) return;
    isAnimating = true;

    const currentImage = imageData[currentImageIndex];
    
    // Create the new image element
    const newImage = document.createElement('img');
    newImage.src = currentImage.fullSize;
    newImage.alt = currentImage.caption;
    newImage.classList.add('lightbox-image');
    // .className = 'lightbox-image';
    
    newImage.classList.add(direction === 'next'?'slide-right':'slide-left')

    const currentImg = imageContainer.querySelector('.lightbox-image.current');
    // console.log(currentImg);
    
    if (currentImg && !isInitial) {
        // console.log('Hello...\n');
        
        currentImg.classList.add(direction !== 'next'?'slide-right':'slide-left','fade-in');
        currentImg.classList.remove('current')
    }

    // Add new image to container
    imageContainer.appendChild(newImage);
    const offset = newImage.offsetHeight;
    newImage.classList.add('current');

    // Update caption
    lightboxCaption.textContent = `${currentImage.caption} (${formatDate(currentImage.date)})`;

    if( currentImg ){
        // Clean up after animation
        setTimeout(() => {
            currentImg.remove();
            // newImage.classList.add('current');
            newImage.classList.remove('slide-right','slide-left', 'fade-out');
            isAnimating = false;
        }, 200);
    }else{
        // newImage.classList.add('current');
        newImage.classList.remove('slide-right','slide-left', 'fade-out');
        isAnimating = false;
    }
    
    
}

// Navigates to previous image
function showPreviousImage() {
    if (currentImageIndex > 0 && !isAnimating) {
        currentImageIndex--;
        updateLightboxContent(false, 'prev');
        updateNavigationButtons();
    }
}

// Navigates to next image
function showNextImage() {
    if (currentImageIndex < imageData.length - 1 && !isAnimating) {
        currentImageIndex++;
        updateLightboxContent(false, 'next');
        updateNavigationButtons();
    }
}

function updateNavigationButtons() {
    prevButton.disabled = currentImageIndex === 0;
    nextButton.disabled = currentImageIndex === imageData.length - 1;
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Attach listeners
prevButton.addEventListener('click', showPreviousImage);
nextButton.addEventListener('click', showNextImage);
closeButton.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    // Closes lightbox when clicking outside the image
    if (e.target === lightbox) { 
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    switch(e.key) {
        case 'ArrowLeft':
            showPreviousImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
        case 'Escape':
            closeLightbox();
            break;
    }
});

// Display gallery
createGallery();