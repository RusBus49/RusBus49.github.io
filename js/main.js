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
      img.loading = 'lazy';
      
      // Image loading errors
      img.onerror = function() {
          this.src = 'images/default-placeholder.jpg'; // Your default image
          this.alt = 'Image not available';
      };

      // Classes based on image orientation
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

// Social sharing
function shareOnLinkedIn(event) {
    event.preventDefault();
    
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    
    window.open(linkedInUrl, 'ShareOnLinkedIn', 
        'width=600,height=600,location=0,menubar=0,toolbar=0,status=0,scrollbars=1');
}

// Tracking
function trackShare(platform) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'share', {
            'event_category': 'Social',
            'event_label': platform
        });
    }
}