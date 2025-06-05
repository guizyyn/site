document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navList = document.getElementById('navList');
  
  if (mobileMenuBtn && navList) {
    mobileMenuBtn.addEventListener('click', function() {
      navList.classList.toggle('active');
      
      // Transform hamburger to X
      const spans = mobileMenuBtn.querySelectorAll('span');
      if (spans.length === 3) {
        if (navList.classList.contains('active')) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }
    });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navList && navList.classList.contains('active') && !event.target.closest('.main-nav') && !event.target.closest('.mobile-menu-btn')) {
      navList.classList.remove('active');
      
      // Reset hamburger
      const spans = mobileMenuBtn.querySelectorAll('span');
      if (spans.length === 3) {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    }
  });
  
  // Add active class to nav links based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-list a');
  
  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', function() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }
  
  // Header background change on scroll
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'var(--shadow-md)';
      } else {
        header.style.backgroundColor = 'var(--white)';
        header.style.boxShadow = 'var(--shadow-sm)';
      }
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (navList && navList.classList.contains('active')) {
        navList.classList.remove('active');
        
        // Reset hamburger
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (spans.length === 3) {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }
      
      const href = this.getAttribute('href');
      // Check if href is just "#" and return early to prevent invalid selector
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Placeholder Logo Generator (for demo purposes)
  const logoElement = document.getElementById('logo');
  
  if (logoElement && logoElement.tagName === 'IMG') {
    // Create a canvas for the logo
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = 100;
    
    canvas.width = size;
    canvas.height = size;
    
    // Background
    ctx.fillStyle = '#1a4d96';
    ctx.fillRect(0, 0, size, size);
    
    // Shield shape
    ctx.beginPath();
    ctx.moveTo(size/2, 10);
    ctx.lineTo(size-10, size/3);
    ctx.lineTo(size-10, size*2/3);
    ctx.lineTo(size/2, size-10);
    ctx.lineTo(10, size*2/3);
    ctx.lineTo(10, size/3);
    ctx.closePath();
    ctx.fillStyle = '#ffc107';
    ctx.fill();
    
    // Text "S+"
    ctx.font = 'bold 40px Arial';
    ctx.fillStyle = '#1a4d96';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('S+', size/2, size/2);
    
    // Set as source for logo
    logoElement.src = canvas.toDataURL();
  }
  
  // Generate white logo for footer if needed
  const footerLogoElements = document.querySelectorAll('.footer-logo img');
  
  footerLogoElements.forEach(logoEl => {
    if (logoEl && logoEl.tagName === 'IMG') {
      // Create a canvas for the logo
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const size = 100;
      
      canvas.width = size;
      canvas.height = size;
      
      // Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);
      
      // Shield shape
      ctx.beginPath();
      ctx.moveTo(size/2, 10);
      ctx.lineTo(size-10, size/3);
      ctx.lineTo(size-10, size*2/3);
      ctx.lineTo(size/2, size-10);
      ctx.lineTo(10, size*2/3);
      ctx.lineTo(10, size/3);
      ctx.closePath();
      ctx.fillStyle = '#ffc107';
      ctx.fill();
      
      // Text "S+"
      ctx.font = 'bold 40px Arial';
      ctx.fillStyle = '#1a4d96';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('S+', size/2, size/2);
      
      // Set as source for logo
      logoEl.src = canvas.toDataURL();
    }
  });
  
  // Social Media Icons Generator
  const socialIcons = document.querySelectorAll('.social-icon img');
  
  socialIcons.forEach(icon => {
    if (icon.alt) {
      const network = icon.alt.toLowerCase();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const size = 24;
      
      canvas.width = size;
      canvas.height = size;
      
      // Clear canvas
      ctx.clearRect(0, 0, size, size);
      
      // Icon color
      ctx.fillStyle = '#ffffff';
      
      // Draw simple icons based on network
      switch (network) {
        case 'facebook':
          // Facebook 'f'
          ctx.font = 'bold 20px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('f', size/2, size/2);
          break;
        case 'instagram':
          // Instagram square with circle
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.strokeRect(4, 4, 16, 16);
          ctx.beginPath();
          ctx.arc(size/2, size/2, 5, 0, Math.PI * 2);
          ctx.stroke();
          break;
        case 'linkedin':
          // LinkedIn 'in'
          ctx.font = 'bold 14px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('in', size/2, size/2);
          break;
        case 'whatsapp':
          // WhatsApp phone
          ctx.beginPath();
          ctx.arc(size/2, size/2, 10, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          ctx.fillStyle = '#1a4d96';
          ctx.font = 'bold 14px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('W', size/2, size/2);
          break;
        default:
          // Generic icon
          ctx.font = 'bold 16px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('#', size/2, size/2);
      }
      
      // Set as source for icon
      icon.src = canvas.toDataURL();
    }
  });
});