document.addEventListener('DOMContentLoaded', function() {
  // Insurance Type Selection
  const insuranceButtons = document.querySelectorAll('.insurance-btn');
  const insuranceCards = document.querySelectorAll('.insurance-card');
  
  if (insuranceButtons.length && insuranceCards.length) {
    insuranceButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        insuranceButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get target card from data attribute
        const target = this.getAttribute('data-target');
        
        // Hide all cards first
        insuranceCards.forEach(card => {
          card.classList.remove('active');
        });
        
        // Show target card with animation
        const targetCard = document.getElementById(target);
        if (targetCard) {
          setTimeout(() => {
            targetCard.classList.add('active');
          }, 300);
        }
      });
    });
  }
  
  // Generate Insurance Icons
  generateInsuranceIcons();
});

function generateInsuranceIcons() {
  // Auto Icon
  const autoIcon = document.querySelector('#auto .card-icon img');
  if (autoIcon) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = 40;
    
    canvas.width = size;
    canvas.height = size;
    
    // Car shape
    ctx.fillStyle = '#1a4d96';
    
    // Car body
    ctx.beginPath();
    ctx.roundRect(5, 15, 30, 12, 3);
    ctx.fill();
    
    // Car top
    ctx.beginPath();
    ctx.roundRect(10, 5, 20, 12, 3);
    ctx.fill();
    
    // Wheels
    ctx.beginPath();
    ctx.arc(10, 27, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#333';
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(30, 27, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Wheel centers
    ctx.beginPath();
    ctx.arc(10, 27, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(30, 27, 2, 0, Math.PI * 2);
    ctx.fill();
    
    autoIcon.src = canvas.toDataURL();
  }
  
  // Home Icon
  const homeIcon = document.querySelector('#home .card-icon img');
  if (homeIcon) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = 40;
    
    canvas.width = size;
    canvas.height = size;
    
    // House
    ctx.fillStyle = '#1a4d96';
    
    // Roof
    ctx.beginPath();
    ctx.moveTo(2, 20);
    ctx.lineTo(20, 5);
    ctx.lineTo(38, 20);
    ctx.closePath();
    ctx.fill();
    
    // House body
    ctx.fillRect(7, 20, 26, 15);
    
    // Door
    ctx.fillStyle = '#ffc107';
    ctx.fillRect(17, 25, 6, 10);
    
    // Window
    ctx.fillRect(26, 25, 4, 4);
    
    homeIcon.src = canvas.toDataURL();
  }
  
  // Business Icon
  const businessIcon = document.querySelector('#business .card-icon img');
  if (businessIcon) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = 40;
    
    canvas.width = size;
    canvas.height = size;
    
    // Building
    ctx.fillStyle = '#1a4d96';
    
    // Main building
    ctx.fillRect(5, 5, 30, 30);
    
    // Windows
    ctx.fillStyle = '#ffc107';
    
    // Row 1
    ctx.fillRect(10, 10, 5, 5);
    ctx.fillRect(20, 10, 5, 5);
    ctx.fillRect(30, 10, 5, 5);
    
    // Row 2
    ctx.fillRect(10, 20, 5, 5);
    ctx.fillRect(20, 20, 5, 5);
    ctx.fillRect(30, 20, 5, 5);
    
    // Door
    ctx.fillRect(20, 30, 5, 5);
    
    businessIcon.src = canvas.toDataURL();
  }
}