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
        youtubeId: 'YVkUvmDQ3HY',
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
        demoUrl: 'https://www.youtube.com/watch?v=YVkUvmDQ3HY',
        youtubeId: 'YVkUvmDQ3HY',
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
        demoUrl: 'https://www.youtube.com/watch?v=YVkUvmDQ3HY',
        youtubeId: 'YVkUvmDQ3HY',
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
        demoUrl: 'https://www.youtube.com/watch?v=YVkUvmDQ3HY',
        youtubeId: 'YVkUvmDQ3HY',
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
    },
    eminemLoseYourself: {
        title: 'Eminem - Lose Yourself',
        description: 'Music video for Eminem\'s iconic song "Lose Yourself".',
        githubUrl: '',
        demoUrl: 'https://www.youtube.com/watch?v=YVkUvmDQ3HY',
        youtubeId: 'YVkUvmDQ3HY',
        features: [
            'Official music video',
            'High quality',
            'Over 1 billion views'
        ],
        technologies: [
            'YouTube',
            'Music',
            'Video'
        ],
        challenges: 'N/A',
        solutions: 'N/A',
        date: '2002',
        type: 'Music Video',
        duration: '5 min',
        role: 'Artist',
        contributions: [
            'Performance',
            'Lyrics',
            'Production'
        ],
        achievements: [
            'Academy Award for Best Original Song',
            'Over 1 billion views on YouTube'
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
        
        // Modern, animated, full-details modal
        modalBody.innerHTML = `
            <div class="project-modal-details animate__animated animate__fadeInUp">
                <button type="button" class="btn-close modal-x-close" data-bs-dismiss="modal" aria-label="Close" style="position:absolute;top:1.2rem;right:1.2rem;z-index:10;font-size:1.5rem;"></button>
                <div class="project-modal-media">
                    <a href="https://www.youtube.com/watch?v=${project.youtubeId}" target="_blank" class="youtube-thumbnail-link" style="margin-bottom:1rem;">
                        <img src="https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg" alt="${project.title} Thumbnail" style="width:100%;border-radius:1.25rem;">
                        <span class="youtube-play-btn"></span>
                    </a>
                </div>
                <div class="project-modal-info">
                    <h2 class="project-title accent mb-2">${project.title}</h2>
                    <div class="project-modal-meta mb-2">
                        <span><i class="fas fa-calendar"></i> ${project.date}</span>
                        <span><i class="fas fa-code-branch"></i> ${project.type}</span>
                        <span><i class="fas fa-clock"></i> ${project.duration}</span>
                        <span><i class="fas fa-user"></i> ${project.role}</span>
                    </div>
                    <div class="project-modal-tech mb-2">
                        ${(project.technologies || []).map(t => `<span class='tech-pill'>${t}</span>`).join(' ')}
                    </div>
                    <div class="project-modal-section mb-2">
                        <div class="project-modal-section-title">Description</div>
                        <div class="project-modal-section-content">${project.description}</div>
                    </div>
                    <div class="project-modal-section mb-2">
                        <div class="project-modal-section-title">Key Features</div>
                        <div class="project-modal-section-content">
                            <ul style="padding-left:1.2em;">
                                ${(project.features || []).map(f => `<li>${f}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    <div class="project-modal-section mb-2">
                        <div class="project-modal-section-title">Challenges</div>
                        <div class="project-modal-section-content">${project.challenges}</div>
                    </div>
                    <div class="project-modal-section mb-2">
                        <div class="project-modal-section-title">Solutions</div>
                        <div class="project-modal-section-content">${project.solutions}</div>
                    </div>
                    <div class="project-modal-section mb-2">
                        <div class="project-modal-section-title">My Contributions</div>
                        <div class="project-modal-section-content">
                            <ul style="padding-left:1.2em;">
                                ${(project.contributions || []).map(c => `<li>${c}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    <div class="project-modal-section mb-2">
                        <div class="project-modal-section-title">Achievements</div>
                        <div class="project-modal-section-content">
                            <ul style="padding-left:1.2em;">
                                ${(project.achievements || []).map(a => `<li>${a}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    <div class="project-modal-actions mt-3">
                        ${project.githubUrl ? `<a href="${project.githubUrl}" class="btn btn-github" target="_blank"><i class="fab fa-github"></i> GitHub</a>` : ''}
                        ${project.demoUrl ? `<a href="${project.demoUrl}" class="btn btn-live" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                    </div>
                </div>
            </div>
        `;
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
    const projectsListContainer = document.querySelector('.projects-list, #projects-list');
    if (!projectsListContainer) {
        console.error('Projects list container not found!');
        return;
    }

    projectsListContainer.innerHTML = '';
    const projectsArray = Object.values(projectDetails);

    projectsArray.forEach(project => {
        // Use YouTube thumbnail if youtubeId exists, else fallback to static image
        let videoSection = '';
        if (project.youtubeId) {
            videoSection = `
                <a href="https://www.youtube.com/watch?v=${project.youtubeId}" target="_blank" rel="noopener noreferrer" class="youtube-thumbnail-link">
                    <img src="https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg" alt="${project.title} Thumbnail" class="video-thumbnail">
                    <span class="youtube-play-btn"><i class="fas fa-play"></i></span>
                </a>
            `;
        } else if (project.demoUrl && project.demoUrl.includes('youtube.com/watch')) {
            // Extract YouTube ID from demoUrl if possible
            const match = project.demoUrl.match(/[?&]v=([^&]+)/);
            const id = match ? match[1] : '';
            if (id) {
                videoSection = `
                    <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="youtube-thumbnail-link">
                        <img src="https://img.youtube.com/vi/${id}/maxresdefault.jpg" alt="${project.title} Thumbnail" class="video-thumbnail">
                        <span class="youtube-play-btn"><i class="fas fa-play"></i></span>
                    </a>
                `;
            }
        }
        // Fallback if no video
        if (!videoSection) {
            videoSection = '';
        }

        projectsListContainer.innerHTML += `
            <div class="project-card card h-100">
                <div class="project-video-container">
                    ${videoSection}
                </div>
                <div class="card-body">
                    <div class="project-header">
                        <div class="project-status">
                            <span class="status-badge status-completed">Completed</span>
                        </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mb-2 position-relative" style="z-index:2;">
                        <h3 class="card-title h4 mb-0">${project.title}</h3>
                    </div>
                    <p class="card-text">${project.description}</p>
                    <div class="project-meta">
                        <div class="meta-item"><i class="fas fa-calendar"></i><span>${project.date}</span></div>
                        <div class="meta-item"><i class="fas fa-code-branch"></i><span>${project.type}</span></div>
                        <div class="meta-item"><i class="fas fa-star"></i><span>Featured</span></div>
                    </div>
                    <div class="project-tech-stack mb-3">
                        ${(project.technologies || []).map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                    </div>
                    <div class="project-actions">
                        <a href="${project.youtubeId ? `https://www.youtube.com/watch?v=${project.youtubeId}` : (project.demoUrl || '#')}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-play me-2"></i>Watch Video
                        </a>
                        <button class="btn btn-details ms-2 project-details-btn" data-project="${Object.keys(projectDetails).find(key => projectDetails[key] === project)}" data-bs-toggle="modal" data-bs-target="#projectDetailsModal">
                            <i class="fas fa-info-circle me-1"></i>Details
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    // Attach event listeners to Details buttons after rendering
    document.querySelectorAll('.project-details-btn').forEach(button => {
        button.addEventListener('click', async function() {
            const projectId = this.dataset.project;
            const project = projectDetails[projectId];
            const modal = document.getElementById('projectDetailsModal');
            const modalBody = modal.querySelector('.modal-body');
            
            // Modern, animated, full-details modal
            modalBody.innerHTML = `
                <div class="project-modal-details animate__animated animate__fadeInUp">
                    <button type="button" class="btn-close modal-x-close" data-bs-dismiss="modal" aria-label="Close" style="position:absolute;top:1.2rem;right:1.2rem;z-index:10;font-size:1.5rem;"></button>
                    <div class="project-modal-media">
                        <a href="https://www.youtube.com/watch?v=${project.youtubeId}" target="_blank" class="youtube-thumbnail-link" style="margin-bottom:1rem;">
                            <img src="https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg" alt="${project.title} Thumbnail" style="width:100%;border-radius:1.25rem;">
                            <span class="youtube-play-btn"></span>
                        </a>
                    </div>
                    <div class="project-modal-info">
                        <h2 class="project-title accent mb-2">${project.title}</h2>
                        <div class="project-modal-meta mb-2">
                            <span><i class="fas fa-calendar"></i> ${project.date}</span>
                            <span><i class="fas fa-code-branch"></i> ${project.type}</span>
                            <span><i class="fas fa-clock"></i> ${project.duration}</span>
                            <span><i class="fas fa-user"></i> ${project.role}</span>
                        </div>
                        <div class="project-modal-tech mb-2">
                            ${(project.technologies || []).map(t => `<span class='tech-pill'>${t}</span>`).join(' ')}
                        </div>
                        <div class="project-modal-section mb-2">
                            <div class="project-modal-section-title">Description</div>
                            <div class="project-modal-section-content">${project.description}</div>
                        </div>
                        <div class="project-modal-section mb-2">
                            <div class="project-modal-section-title">Key Features</div>
                            <div class="project-modal-section-content">
                                <ul style="padding-left:1.2em;">
                                    ${(project.features || []).map(f => `<li>${f}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        <div class="project-modal-section mb-2">
                            <div class="project-modal-section-title">Challenges</div>
                            <div class="project-modal-section-content">${project.challenges}</div>
                        </div>
                        <div class="project-modal-section mb-2">
                            <div class="project-modal-section-title">Solutions</div>
                            <div class="project-modal-section-content">${project.solutions}</div>
                        </div>
                        <div class="project-modal-section mb-2">
                            <div class="project-modal-section-title">My Contributions</div>
                            <div class="project-modal-section-content">
                                <ul style="padding-left:1.2em;">
                                    ${(project.contributions || []).map(c => `<li>${c}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        <div class="project-modal-section mb-2">
                            <div class="project-modal-section-title">Achievements</div>
                            <div class="project-modal-section-content">
                                <ul style="padding-left:1.2em;">
                                    ${(project.achievements || []).map(a => `<li>${a}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        <div class="project-modal-actions mt-3">
                            ${project.githubUrl ? `<a href="${project.githubUrl}" class="btn btn-github" target="_blank"><i class="fab fa-github"></i> GitHub</a>` : ''}
                            ${project.demoUrl ? `<a href="${project.demoUrl}" class="btn btn-live" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                        </div>
                    </div>
                </div>
            `;
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
        });
    });
    
    AOS.refreshHard();
}

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
        // Hide arrows if not scrollable
        if (scrollContainer.scrollWidth <= scrollContainer.clientWidth + 10) {
            leftArrow.style.display = 'none';
            rightArrow.style.display = 'none';
            return;
        } else {
            leftArrow.style.display = '';
            rightArrow.style.display = '';
        }
        // Disable left arrow if at start
        if (scrollContainer.scrollLeft <= 5) {
            leftArrow.disabled = true;
            leftArrow.classList.add('disabled');
        } else {
            leftArrow.disabled = false;
            leftArrow.classList.remove('disabled');
        }
        // Disable right arrow if at end
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 5) {
            rightArrow.disabled = true;
            rightArrow.classList.add('disabled');
        } else {
            rightArrow.disabled = false;
            rightArrow.classList.remove('disabled');
        }
    }
    updateArrows();
    window.addEventListener('resize', updateArrows);
    scrollContainer.addEventListener('scroll', updateArrows);
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
// The following legacy code is now removed to avoid confusion and duplication.
// All project rendering and modal logic should use projectDetails and displayProjects only.