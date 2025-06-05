document.addEventListener('DOMContentLoaded', function() {
  // Testimonial Carousel
  const testimonialContainer = document.getElementById('testimonialContainer');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (testimonialContainer && dots.length && prevBtn && nextBtn) {
    let currentIndex = 0;
    const testimonials = testimonialContainer.querySelectorAll('.testimonial');
    const totalTestimonials = testimonials.length;
    
    // Function to update carousel
    const updateCarousel = (index) => {
      // Calculate translation percentage based on index
      const translateX = -100 * index;
      
      // Apply translation
      testimonialContainer.style.transform = `translateX(${translateX}%)`;
      
      // Update active dot
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      
      // Update current index
      currentIndex = index;
    };
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
      let newIndex = currentIndex - 1;
      if (newIndex < 0) {
        newIndex = totalTestimonials - 1;
      }
      updateCarousel(newIndex);
    });
    
    // Next button click
    nextBtn.addEventListener('click', () => {
      let newIndex = currentIndex + 1;
      if (newIndex >= totalTestimonials) {
        newIndex = 0;
      }
      updateCarousel(newIndex);
    });
    
    // Dot clicks
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        updateCarousel(index);
      });
    });
    
    // Auto-advance the carousel every 5 seconds
    let autoAdvance = setInterval(() => {
      let newIndex = currentIndex + 1;
      if (newIndex >= totalTestimonials) {
        newIndex = 0;
      }
      updateCarousel(newIndex);
    }, 5000);
    
    // Pause auto-advance on hover
    testimonialContainer.addEventListener('mouseenter', () => {
      clearInterval(autoAdvance);
    });
    
    // Resume auto-advance when mouse leaves
    testimonialContainer.addEventListener('mouseleave', () => {
      autoAdvance = setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= totalTestimonials) {
          newIndex = 0;
        }
        updateCarousel(newIndex);
      }, 5000);
    });
    
    // Generate client images for testimonials
    generateClientImages();
  }
});

function generateClientImages() {
  const clientImages = document.querySelectorAll('.testimonial-author img');
  
  clientImages.forEach((img, index) => {
    // Replace with placeholder images
    const colors = ['#3A6DBB', '#1A4D96', '#113366'];
    const color = colors[index % colors.length];
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = 60;
    
    canvas.width = size;
    canvas.height = size;
    
    // Background
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, size, size);
    
    // Avatar shape
    ctx.fillStyle = '#ffffff';
    
    // Head
    ctx.beginPath();
    ctx.arc(size/2, size/2 - 5, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Body
    ctx.beginPath();
    ctx.ellipse(size/2, size/2 + 20, 20, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Set as source for image
    img.src = canvas.toDataURL();
  });
}