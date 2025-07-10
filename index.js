// Typing Animation
const textElement = document.querySelector('.text-animation');
const words = ['Alex Johnson', 'a Web Developer', 'a UI/UX Designer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

const type = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    textElement.textContent = currentChar;
    
    if (!isDeleting && charIndex < currentWord.length) {
        // Typing
        charIndex++;
        setTimeout(type, 100);
    } else if (isDeleting && charIndex > 0) {
        // Deleting
        charIndex--;
        setTimeout(type, 50);
    } else {
        // Change word
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
    }
};

// Initialize typing effect
type();

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active section highlight
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    document.querySelector('.nav-links').classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Download CV button
document.getElementById('download-cv').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Downloading CV... (This is a demo)');
    
    // For a real implementation, you would link to an actual file
    // window.open('path-to-your-cv.pdf', '_blank');
});

// Animate skills on scroll
const animateSkills = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.parentElement.getAttribute('data-percent');
        bar.style.width = width;
    });
};

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            if (entry.target.id === 'skills') {
                animateSkills();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form submission (in contact section would go here)
// Replace the existing CV button code with:
document.getElementById('download-cv').addEventListener('click', function(e) {
  e.preventDefault();
  
  // Create temporary download link
  const link = document.createElement('a');
  link.href = 'CV IHSAN ALI (1).pdf';
  link.download = 'CV IHSAN ALI (1).pdf'; // Custom filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Optional tracking
  console.log('CV downloaded successfully');
});
