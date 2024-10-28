document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
          navMenu.classList.remove('active');
      }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth'
              });
              navMenu.classList.remove('active');
          }
      });
  });

  // Add active class to current nav item
  const currentLocation = window.location.pathname;
  document.querySelectorAll('.nav-menu a').forEach(link => {
      if (link.getAttribute('href') === currentLocation) {
          link.classList.add('active');
      }
  });

  // Handle all post images
  const postImages = document.querySelectorAll('.post-image img');
    
  postImages.forEach(img => {
      // Add loading attribute for better performance
      img.loading = 'lazy';
      
      // Handle image loading errors
      img.onerror = function() {
          this.src = 'images/default-placeholder.jpg'; // Your default image
          this.alt = 'Image not available';
      };

      // Optional: Add classes based on image orientation
      img.onload = function() {
          const aspect = this.naturalWidth / this.naturalHeight;
          if (aspect > 1.5) {
              this.parentElement.classList.add('landscape');
          } else if (aspect < 0.75) {
              this.parentElement.classList.add('portrait');
          }
      };
  });

  
});