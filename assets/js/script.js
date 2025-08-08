'use strict';

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
  body.classList.add('light-mode');
}

// Theme toggle event listener
themeToggle.addEventListener('click', function() {
  body.classList.toggle('light-mode');
  
  // Save theme preference
  const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
  
  // Add animation effect
  this.style.transform = 'scale(0.95)';
  setTimeout(() => {
    this.style.transform = 'scale(1)';
  }, 200);
});

// Element toggle function
const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active"); 
}

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { 
  elementToggleFunc(sidebar); 
});

// Custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { 
  elementToggleFunc(this); 
});

// Add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// Filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// Add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // Check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// Add smooth animations on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  // Animate skill bars when they come into view
  const skillsSection = document.querySelector('.skills-list');
  if (skillsSection) {
    const skillObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillBars = entry.target.querySelectorAll('.skill-progress-fill');
          skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
              bar.style.width = width;
            }, 200);
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    skillObserver.observe(skillsSection);
  }
});

// Add parallax effect to header
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.article-title');
  
  parallaxElements.forEach(element => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add hover sound effect (optional - requires audio file)
const addHoverEffect = () => {
  const hoverElements = document.querySelectorAll('button, .social-link, .contact-link');
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });
  });
};

addHoverEffect();

// Enhanced form submission (prevent default and show success message)
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add loading state to button
    formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
    formBtn.disabled = true;
    
    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
      formBtn.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon><span>Message Sent!</span>';
      formBtn.style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
      
      // Reset form after 2 seconds
      setTimeout(() => {
        form.reset();
        formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
        formBtn.style.background = '';
        formBtn.disabled = true;
      }, 2000);
    }, 1500);
  });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
  // Toggle theme with keyboard shortcut (Ctrl/Cmd + Shift + L)
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
    themeToggle.click();
  }
  
  // Navigate between tabs with arrow keys
  const activeNavIndex = Array.from(navigationLinks).findIndex(link => 
    link.classList.contains('active')
  );
  
  if (e.key === 'ArrowRight' && activeNavIndex < navigationLinks.length - 1) {
    navigationLinks[activeNavIndex + 1].click();
  } else if (e.key === 'ArrowLeft' && activeNavIndex > 0) {
    navigationLinks[activeNavIndex - 1].click();
  }
});

// Performance optimization: Lazy load images
const images = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src || img.src;
      img.classList.add('loaded');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

console.log('Portfolio initialized successfully! Theme:', currentTheme);
