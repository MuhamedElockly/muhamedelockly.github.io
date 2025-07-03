// Initialize AOS with optimized settings
AOS.init({
    duration: 600,
    easing: 'ease-out',
    once: true,
    mirror: false,
    disable: 'mobile'
});

// Optimized smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 800;
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                
                window.scrollTo(0, startPosition + distance * ease(progress));
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }
            
            requestAnimationFrame(animation);
        }
    });
});

// Optimized navbar scroll effect
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Optimized parallax effect
let mouseX = 0;
let mouseY = 0;
let rafId = null;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    
    if (!rafId) {
        rafId = requestAnimationFrame(updateParallax);
    }
});

function updateParallax() {
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }
    rafId = null;
}

// Optimized typing effect
const typeWriter = (element, text, speed = 50) => {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
};

// Initialize typing effect with debounce
let typingTimeout;
window.addEventListener('load', () => {
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        const heroTitle = document.querySelector('.hero-content h1');
        const heroSubtitle = document.querySelector('.hero-content h2');
        const heroText = document.querySelector('.hero-content p');

        if (heroTitle && heroSubtitle && heroText) {
            typeWriter(heroTitle, heroTitle.textContent);
            setTimeout(() => {
                typeWriter(heroSubtitle, heroSubtitle.textContent);
                setTimeout(() => {
                    typeWriter(heroText, heroText.textContent);
                }, 500);
            }, 500);
        }
    }, 100);
});

// Optimized scroll progress indicator
let progressRafId = null;
window.addEventListener('scroll', () => {
    if (!progressRafId) {
        progressRafId = requestAnimationFrame(updateProgress);
    }
});

function updateProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${progress}%`;
    }
    progressRafId = null;
}

// Optimized intersection observers
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            requestAnimationFrame(() => {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }
    });
}, observerOptions);

// Initialize observers
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'transform 0.3s var(--animation-timing), opacity 0.3s var(--animation-timing)';
    projectObserver.observe(card);
});

document.querySelectorAll('.skill-tags .badge').forEach(badge => {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(20px)';
    badge.style.transition = 'transform 0.3s var(--animation-timing), opacity 0.3s var(--animation-timing)';
    skillObserver.observe(badge);
});

// Optimized hover effects
const addHoverEffect = (elements, transform, shadow) => {
    elements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            requestAnimationFrame(() => {
                element.style.transform = transform;
                if (shadow) element.style.boxShadow = shadow;
            });
        });
        
        element.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                element.style.transform = 'translateY(0)';
                if (shadow) element.style.boxShadow = 'none';
            });
        });
    });
};

// Apply hover effects
addHoverEffect(document.querySelectorAll('.contact-item'), 'translateY(-5px)', 'var(--shadow-glow)');
addHoverEffect(document.querySelectorAll('.project-card .btn-primary'), 'translateY(-2px)', 'var(--shadow-glow)');
addHoverEffect(document.querySelectorAll('.project-icon'), 'scale(1.1) rotate(5deg)');
addHoverEffect(document.querySelectorAll('.tech-badge'), 'translateY(-2px)', 'var(--shadow-glow)');

// Initialize Bootstrap tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
        trigger: 'hover'
    });
});

// Add floating animation to social links
const socialLinks = document.querySelectorAll('.social-links .btn');
socialLinks.forEach((link, index) => {
    link.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
});

// Add scroll indicator animation
const scrollIndicator = document.querySelector('.hero-scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// Project Video Playback
document.querySelectorAll('.play-btn').forEach(button => {
    button.addEventListener('click', function() {
        const videoId = this.dataset.videoId;
        const iframe = this.closest('.project-video-container').querySelector('iframe');
        const overlay = this.closest('.video-overlay');
        
        // Update iframe src to start video with proper parameters
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0`;
        
        // Hide overlay
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        
        // Show overlay again when video ends
        iframe.addEventListener('load', function() {
            const player = new YT.Player(iframe, {
                events: {
                    'onStateChange': function(event) {
                        if (event.data === YT.PlayerState.ENDED) {
                            overlay.style.opacity = '1';
                            overlay.style.pointerEvents = 'auto';
                        }
                    }
                }
            });
        });
    });
});

// Project Details Modal with GitHub Integration
const projectDetails = {
    jsproject: {
        title: 'JSProject',
        description: 'A modern web application showcasing advanced JavaScript features and modern web development practices.',
        githubUrl: 'https://github.com/MuhamedElockly/JSProject.git',
        demoUrl: 'https://youtu.be/YVkUvmDQ3HY?si=xqty1I8cOQHrm5Il',
        features: [
            'Responsive and modern UI design',
            'Interactive user interface',
            'Dynamic content loading',
            'Real-time data updates',
            'Cross-browser compatibility'
        ],
        technologies: [
            'JavaScript (ES6+)',
            'HTML5',
            'CSS3',
            'Bootstrap',
            'Font Awesome'
        ],
        challenges: 'Implementing complex UI interactions and ensuring cross-browser compatibility.',
        solutions: 'Utilized modern JavaScript features and implemented progressive enhancement.',
        date: '2024',
        type: 'Web Application',
        duration: '2 months',
        role: 'Frontend Developer',
        contributions: [
            'Designed and implemented the user interface',
            'Developed interactive features',
            'Ensured responsive design',
            'Optimized performance'
        ],
        achievements: [
            'Achieved 100% cross-browser compatibility',
            'Implemented smooth animations and transitions',
            'Optimized loading times'
        ]
    },
    ecommerce: {
        title: 'E-Commerce MVC',
        description: 'A full-featured e-commerce platform with modern design and robust functionality.',
        githubUrl: 'https://github.com/MuhamedElockly/E-Commerce_MVC_Web_Application.git',
        demoUrl: null,
        features: [
            'Product catalog with categories',
            'Shopping cart and checkout',
            'User authentication and profiles',
            'Order management system',
            'Admin dashboard'
        ],
        technologies: [
            'ASP.NET MVC',
            'Entity Framework',
            'SQL Server',
            'Bootstrap',
            'jQuery'
        ],
        challenges: 'Implementing secure payment processing and managing inventory.',
        solutions: 'Integrated secure payment gateways and developed real-time inventory tracking.',
        date: '2024',
        type: 'Web Application',
        duration: '4 months',
        role: 'Full Stack Developer',
        contributions: [
            'Developed the product catalog and search functionality',
            'Implemented secure payment processing',
            'Created the order management system',
            'Built the admin dashboard'
        ],
        achievements: [
            'Processed over 5000 orders successfully',
            'Achieved 99.9% uptime',
            'Implemented real-time inventory tracking'
        ]
    },
    devspot: {
        title: 'DevSpot',
        description: 'A developer community platform for sharing knowledge and collaborating on projects.',
        githubUrl: 'https://github.com/MuhamedElockly/DevSpot_MVC_Web_Application.git',
        demoUrl: null,
        features: [
            'Real-time chat and notifications',
            'Code sharing and collaboration',
            'Project management tools',
            'User profiles and reputation system',
            'Search and filtering capabilities'
        ],
        technologies: [
            'ASP.NET MVC',
            'SignalR',
            'Bootstrap',
            'JavaScript',
            'SQL Server'
        ],
        challenges: 'Implementing real-time features and managing concurrent users.',
        solutions: 'Utilized SignalR for real-time communication and implemented efficient caching.',
        date: '2024',
        type: 'Web Application',
        duration: '5 months',
        role: 'Full Stack Developer',
        contributions: [
            'Implemented real-time chat using SignalR',
            'Developed the code sharing system',
            'Created the reputation system',
            'Built the search functionality'
        ],
        achievements: [
            'Supported 1000+ concurrent users',
            'Achieved 50ms message delivery time',
            'Implemented efficient code search'
        ]
    },
    snake: {
        title: 'Snake Game',
        description: 'A classic Snake game implemented using JavaScript, HTML5, and CSS3.',
        githubUrl: 'https://github.com/MuhamedElockly/snake-project.git',
        demoUrl: null, // Add demo URL if available
        features: [
            'Classic Snake gameplay',
            'Score tracking',
            'Adjustable game speed',
            'Responsive design',
            'Simple and clean UI'
        ],
        technologies: [
            'JavaScript',
            'HTML5',
            'CSS3'
        ],
        challenges: 'Handling game loop and collision detection efficiently.',
        solutions: 'Implemented a time-based game loop and optimized collision checks.',
        date: '2023',
        type: 'Web Game',
        duration: '2 weeks',
        role: 'Frontend Developer',
        contributions: [
            'Developed the core game logic',
            'Designed and implemented the user interface',
            'Added score tracking and game speed options'
        ],
        achievements: [
            'Successfully implemented classic Snake gameplay',
            'Created a responsive and playable game'
        ]
    }
};

// Fetch GitHub repository information
async function fetchGitHubInfo(repoUrl) {
    try {
        const repoName = repoUrl.split('/').slice(-2).join('/').replace('.git', '');
        const response = await fetch(`https://api.github.com/repos/${repoName}`);
        const data = await response.json();
        return {
            stars: data.stargazers_count,
            forks: data.forks_count,
            watchers: data.watchers_count,
            description: data.description,
            language: data.language,
            topics: data.topics || []
        };
    } catch (error) {
        console.error('Error fetching GitHub info:', error);
        return null;
    }
}

// Update project details modal
document.querySelectorAll('.project-details-btn').forEach(button => {
    button.addEventListener('click', async function() {
        const projectId = this.dataset.project;
        const project = projectDetails[projectId];
        const modal = document.getElementById('projectDetailsModal');
        const modalBody = modal.querySelector('.modal-body');
        
        // Update modal content with enhanced layout
        modalBody.innerHTML = `
            <div class="project-details">
                <div class="project-header mb-4">
                    <div class="project-title-section">
                        <h3 class="mb-2">${project.title}</h3>
                        <div class="project-links">
                            <a href="${project.githubUrl}" class="btn btn-sm btn-outline-primary me-2 github-link" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-github me-1"></i>View on GitHub
                            </a>
                            ${project.demoUrl ? `
                                <a href="${project.demoUrl}" class="btn btn-sm btn-outline-primary live-demo-link" target="_blank" rel="noopener noreferrer">
                                    <i class="fas fa-external-link-alt me-1"></i>Live Demo
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>

                <div class="project-content">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="project-description mb-4">
                                <h4 class="h5 mb-3 text-primary">Overview</h4>
                                <p class="lead">${project.description}</p>
                            </div>
                            
                            <div class="project-features mb-4">
                                <h4 class="h5 mb-3 text-primary">Key Features</h4>
                                <div class="features-grid">
                                    ${project.features.map(feature => `
                                        <div class="feature-item">
                                            <i class="fas fa-check-circle text-primary me-2"></i>
                                            <span>${feature}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="project-technologies mb-4">
                                <h4 class="h5 mb-3 text-primary">Technologies Used</h4>
                                <div class="tech-stack">
                                    ${project.technologies.map(tech => `
                                        <span class="tech-badge">
                                            <i class="fas fa-code me-1"></i>${tech}
                                        </span>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="project-challenges mb-4">
                                <h4 class="h5 mb-3 text-primary">Challenges & Solutions</h4>
                                <div class="row g-4">
                                    <div class="col-md-6">
                                        <div class="challenge-section">
                                            <h5 class="h6 mb-2">
                                                <i class="fas fa-exclamation-circle me-2"></i>Challenges
                                            </h5>
                                            <p class="challenges-text">${project.challenges}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="solution-section">
                                            <h5 class="h6 mb-2">
                                                <i class="fas fa-lightbulb me-2"></i>Solutions
                                            </h5>
                                            <p class="solutions-text">${project.solutions}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="project-sidebar">
                                <div class="project-meta-card mb-4">
                                    <h4 class="h5 mb-3 text-primary">Project Information</h4>
                                    <div class="meta-list">
                                        <div class="meta-item">
                                            <i class="fas fa-calendar"></i>
                                            <span>${project.date}</span>
                                        </div>
                                        <div class="meta-item">
                                            <i class="fas fa-code-branch"></i>
                                            <span>${project.type}</span>
                                        </div>
                                        <div class="meta-item">
                                            <i class="fas fa-clock"></i>
                                            <span>${project.duration}</span>
                                        </div>
                                        <div class="meta-item">
                                            <i class="fas fa-user"></i>
                                            <span>${project.role}</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="project-contributions mb-4">
                                    <h4 class="h5 mb-3 text-primary">My Contributions</h4>
                                    <ul class="list-unstyled contributions-list">
                                        ${project.contributions.map(contribution => `
                                            <li class="mb-2">
                                                <i class="fas fa-code text-primary me-2"></i>
                                                ${contribution}
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Show modal
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    });
});

// Add event listener for GitHub links
document.addEventListener('click', function(e) {
    if (e.target.closest('.github-link')) {
        e.preventDefault();
        const githubUrl = e.target.closest('.github-link').href;
        window.open(githubUrl, '_blank', 'noopener,noreferrer');
    }
});

// Modal cleanup
document.addEventListener('DOMContentLoaded', function() {
    const projectDetailsModal = document.getElementById('projectDetailsModal');
    if (!projectDetailsModal) return;
    function cleanupModal() {
        // Remove all modal backdrops
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(backdrop => {
            backdrop.remove();
        });
        // Reset body styles
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        // Force reflow
        document.body.offsetHeight;
    }
    projectDetailsModal.addEventListener('hide.bs.modal', cleanupModal);
    projectDetailsModal.addEventListener('hidden.bs.modal', cleanupModal);
    document.querySelectorAll('[data-bs-dismiss="modal"]').forEach(button => {
        button.addEventListener('click', () => {
            setTimeout(cleanupModal, 150); // Small delay to ensure modal is closed
        });
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            setTimeout(cleanupModal, 150);
        }
    });
});

// Function to display projects from the projectDetails object
function displayProjects() {
    const projectsListContainer = document.querySelector('.projects-list');
    if (!projectsListContainer) {
        console.error('Projects list container not found!');
        return;
    }

    projectsListContainer.innerHTML = ''; // Clear existing content

    // Convert projectDetails object to an array for easier iteration
    const projectsArray = Object.values(projectDetails);

    projectsArray.forEach(project => {
        const projectCardHTML = `
            <div class="project-card card h-100">
                 <div class="project-video-container">
                     <a href="${project.demoUrl ? project.demoUrl : project.githubUrl}" target="_blank" rel="noopener noreferrer" class="video-link">
                         <img src="https://img.youtube.com/vi/0AqnCSdkjQ0/maxresdefault.jpg" alt="${project.title} Demo" class="video-thumbnail">
                         <div class="video-overlay">
                             <button class="play-btn">
                                 <i class="fas fa-play"></i>
                             </button>
                         </div>
                     </a>
                 </div>
                 <div class="card-body">
                     <div class="project-header">
                         <div class="project-icon mb-3">
                             <i class="fas fa-code"></i>
                         </div>
                         <div class="project-status">
                             <span class="status-badge status-completed">Completed</span>
                         </div>
                     </div>
                     <div class="d-flex align-items-center justify-content-between mb-2 position-relative" style="z-index:2;">
                         <h3 class="card-title h4 mb-0">${project.title}</h3>
                         <a href="${project.githubUrl}" class="btn btn-sm btn-outline-primary github-link ms-2" target="_blank" rel="noopener noreferrer" title="View on GitHub" style="z-index:3; position:relative;">
                             <i class="fab fa-github"></i>
                         </a>
                     </div>
                     <p class="card-text">${project.description}</p>
                     <div class="project-meta">
                         <div class="meta-item">
                             <i class="fas fa-calendar"></i>
                             <span>${project.date}</span>
                         </div>
                         <div class="meta-item">
                             <i class="fas fa-code-branch"></i>
                             <span>${project.type}</span>
                         </div>
                         <div class="meta-item">
                             <i class="fas fa-star"></i>
                             <span>Featured</span>
                         </div>
                     </div>
                     <div class="project-tech-stack mb-3">
                         ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                     </div>
                     <div class="project-actions">
                         <a href="#" class="btn btn-primary project-details-btn" data-project="${project.title.toLowerCase().replace(/\s/g, '')}" data-bs-toggle="modal" data-bs-target="#projectDetailsModal">
                             <i class="fas fa-info-circle me-2"></i>Details
                         </a>
                     </div>
                 </div>
             </div>
        `;
        projectsListContainer.innerHTML += projectCardHTML;
    });

    // Re-initialize AOS after projects are loaded
    AOS.refreshHard();
}

// Call the function to display projects on page load
// window.addEventListener('load', displayProjects);
document.addEventListener('DOMContentLoaded', displayProjects);

// Horizontal scroll arrow logic for projects section
window.addEventListener('DOMContentLoaded', function() {
    const scrollContainer = document.querySelector('.projects-horizontal-scroll');
    const leftArrow = document.querySelector('.arrow-left');
    const rightArrow = document.querySelector('.arrow-right');
    if (!scrollContainer || !leftArrow || !rightArrow) return;

    // Scroll by one card at a time
    function getCardWidth() {
        const card = scrollContainer.querySelector('.project-card');
        if (card) {
            const style = window.getComputedStyle(card);
            const margin = parseFloat(style.marginRight) + parseFloat(style.marginLeft);
            return card.offsetWidth + margin;
        }
        return 320; // fallback
    }

    leftArrow.addEventListener('click', function() {
        scrollContainer.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
    });
    rightArrow.addEventListener('click', function() {
        scrollContainer.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
    });

    // Optional: Hide arrows if not scrollable
    function updateArrows() {
        if (scrollContainer.scrollWidth <= scrollContainer.clientWidth + 10) {
            leftArrow.style.display = 'none';
            rightArrow.style.display = 'none';
        } else {
            leftArrow.style.display = '';
            rightArrow.style.display = '';
        }
    }
    updateArrows();
    window.addEventListener('resize', updateArrows);
});

// Duplicate projects for testing
const originalProjects = Object.values(projectDetails);
let i = 1;
while (Object.keys(projectDetails).length < 9) {
    for (const proj of originalProjects) {
        if (Object.keys(projectDetails).length >= 9) break;
        const newKey = proj.title.toLowerCase().replace(/\s/g, '') + '_copy' + i;
        projectDetails[newKey] = { ...proj, title: proj.title + ' Copy ' + i };
        i++;
    }
}

// Projects Carousel Arrow Functionality
const carousel = document.querySelector('.projects-carousel');
const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');

if (carousel && leftArrow && rightArrow) {
  leftArrow.onclick = () => {
    carousel.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
  };
  rightArrow.onclick = () => {
    carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
  };
}

// --- Project Details Modal Functionality ---
const projectData = {
  1: {
    title: 'JSProject',
    image: 'enhanced-shot.png',
    status: 'COMPLETED',
    year: '2024',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    meta: [
      { icon: 'fas fa-calendar', text: '2024' },
      { icon: 'fab fa-js', text: 'JavaScript' },
      { icon: 'fas fa-star', text: 'Featured' }
    ],
    description: 'A modern web application built with JavaScript and modern web technologies.',
    client: 'Open Source',
    role: 'Lead Developer',
    features: 'Real-time updates, Responsive design, REST API integration',
    challenges: 'Cross-browser compatibility, Performance optimization',
    solutions: 'Used modern JS frameworks, Lazy loading, Code splitting',
    github: '#',
    live: '#'
  },
  2: {
    title: 'Snake Game',
    image: 'enhanced-shot.png',
    status: 'IN PROGRESS',
    year: '2023',
    tech: ['JavaScript', 'HTML5', 'Canvas'],
    meta: [
      { icon: 'fas fa-calendar', text: '2023' },
      { icon: 'fab fa-js', text: 'JavaScript' },
      { icon: 'fas fa-trophy', text: 'Game' }
    ],
    description: 'A classic Snake game built with HTML5 Canvas and JavaScript, featuring smooth controls and a retro look.',
    client: 'Personal',
    role: 'Game Developer',
    features: 'Smooth controls, Retro graphics, High score tracking',
    challenges: 'Game loop timing, Input handling',
    solutions: 'RequestAnimationFrame, Event listeners',
    github: '#',
    live: '#'
  },
  3: {
    title: 'DB Manager',
    image: 'enhanced-shot.png',
    status: 'COMPLETED',
    year: '2022',
    tech: ['C#', '.NET', 'SQL Server'],
    meta: [
      { icon: 'fas fa-calendar', text: '2022' },
      { icon: 'fas fa-database', text: 'SQL' },
      { icon: 'fas fa-cogs', text: 'Tool' }
    ],
    description: 'A database management tool for organizing, querying, and visualizing SQL databases with a user-friendly interface.',
    client: 'Enterprise',
    role: 'Backend Engineer',
    features: 'Visual query builder, Data export, User management',
    challenges: 'Security, Large data sets',
    solutions: 'Parameterized queries, Pagination',
    github: '#',
    live: '#'
  }
};

const detailsButtons = document.querySelectorAll('.btn-details');
const modal = document.getElementById('projectDetailsModal');
const modalBody = document.getElementById('projectDetailsModalBody');

if (detailsButtons && modal && modalBody) {
  detailsButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const id = this.getAttribute('data-project-id');
      const data = projectData[id];
      if (!data) return;
      modalBody.innerHTML = `
        <div class="project-modal-details">
          <div class="project-modal-media">
            <img src="${data.image}" alt="${data.title} Screenshot" />
          </div>
          <div class="project-modal-info">
            <div class="project-modal-meta">
              ${data.meta.map(m => `<span><i class='${m.icon}'></i> ${m.text}</span>`).join('')}
            </div>
            <h3 class="project-title accent" style="margin:0 0 0.5rem 0;">${data.title}</h3>
            <div class="project-modal-tech">
              ${data.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
            </div>
            <div class="project-modal-section">
              <div class="project-modal-section-title">Description</div>
              <div class="project-modal-section-content">${data.description}</div>
            </div>
            <div class="project-modal-section">
              <div class="project-modal-section-title">Client</div>
              <div class="project-modal-section-content">${data.client}</div>
            </div>
            <div class="project-modal-section">
              <div class="project-modal-section-title">Role</div>
              <div class="project-modal-section-content">${data.role}</div>
            </div>
            <div class="project-modal-section">
              <div class="project-modal-section-title">Features</div>
              <div class="project-modal-section-content">${data.features}</div>
            </div>
            <div class="project-modal-section">
              <div class="project-modal-section-title">Challenges</div>
              <div class="project-modal-section-content">${data.challenges}</div>
            </div>
            <div class="project-modal-section">
              <div class="project-modal-section-title">Solutions</div>
              <div class="project-modal-section-content">${data.solutions}</div>
            </div>
            <div class="project-modal-actions">
              <a href="${data.github}" class="btn btn-github" target="_blank"><i class="fab fa-github"></i> GitHub</a>
              <a href="${data.live}" class="btn btn-live" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
            </div>
          </div>
        </div>
      `;
      // Show modal (Bootstrap 5)
      if (window.bootstrap && bootstrap.Modal) {
        bootstrap.Modal.getOrCreateInstance(modal).show();
      } else {
        modal.classList.add('show');
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
      }
    });
  });
  // Close modal fallback (if not using Bootstrap)
  modal.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal') || e.target.classList.contains('btn-close')) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  });
}