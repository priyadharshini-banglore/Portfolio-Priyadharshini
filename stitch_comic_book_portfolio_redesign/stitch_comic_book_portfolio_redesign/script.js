// ==========================================================================
// PRIYADHARSHINI PORTFOLIO - CORE INTERACTIONS
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {

    // Default theme class
    document.body.className = "theme-minimal";

    // ==========================================
    // SCROLL REVEAL - INTERSECTION OBSERVER
    // ==========================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));


    // ==========================================
    // 1. POPULATE DATA FROM CONFIG (data.js)
    // ==========================================
    if (typeof portfolioData !== 'undefined') {
        const { personal, stats, journey, skills, projects, codingPlatforms, hackathons, certifications } = portfolioData;

        // Personal Info
        if (personal) {
            document.title = `${personal.name} | ${personal.title}`;
            const brandEl = document.getElementById("brand-name");
            if (brandEl) brandEl.textContent = `${personal.name}.ai`;
            const roleEl = document.getElementById("hero-role-title");
            if (roleEl) roleEl.textContent = personal.title;
            const bioHeadlineEl = document.getElementById("bio-headline");
            if (bioHeadlineEl) bioHeadlineEl.textContent = personal.bioHeadline;
            const bioDescEl = document.getElementById("bio-description");
            if (bioDescEl) bioDescEl.textContent = personal.bioDescription;
            const statusEl = document.getElementById("header-status");
            if (statusEl) statusEl.textContent = personal.status;
            const emailEl = document.getElementById("email-display");
            if (emailEl) emailEl.textContent = personal.email;
            const emailLink = document.getElementById("email-link");
            if (emailLink) emailLink.href = `mailto:${personal.email}`;
            const footerEl = document.getElementById("footer-name");
            if (footerEl) footerEl.textContent = personal.name;
        }

        // Stats Grid
        const statsContainer = document.getElementById("stats-container");
        if (statsContainer && stats) {
            statsContainer.innerHTML = stats.map(st => `
                <div class="stat-item">
                    <span class="stat-value">${st.value}</span>
                    <span class="stat-label">${st.label}</span>
                </div>
            `).join('');
        }

        // Journey Timeline
        const journeyContainer = document.getElementById("journey-container");
        if (journeyContainer && journey) {
            journeyContainer.innerHTML = journey.map(item => `
                <div class="journey-card glass-card">
                    <div class="journey-year">${item.year}</div>
                    <div class="journey-info">
                        <h4>${item.title}</h4>
                        <div class="journey-subtitle">${item.subtitle}</div>
                        <p class="journey-desc">${item.description}</p>
                    </div>
                </div>
            `).join('');
        }

        // Skills Grid & Filtering
        const skillsContainer = document.getElementById("skills-container");
        function renderSkills(filterCategory = "all") {
            if (!skillsContainer || !skills) return;
            const filtered = filterCategory === "all" ? skills : skills.filter(s => s.category === filterCategory);
            skillsContainer.innerHTML = filtered.map(skill => `
                <div class="skill-card glass-card" data-category="${skill.category}">
                    <div class="skill-icon">${skill.icon || '⚡'}</div>
                    <div class="skill-info">
                        <div class="skill-name">${skill.name}</div>
                        <div class="skill-bar-bg">
                            <div class="skill-bar-fill" style="width: ${skill.level}%"></div>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        renderSkills("all");

        const skillFilters = document.querySelectorAll(".filter-btn");
        skillFilters.forEach(btn => {
            btn.addEventListener("click", () => {
                skillFilters.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                renderSkills(btn.getAttribute("data-filter"));
            });
        });

        // Projects Grid & Filtering
        const projectsContainer = document.getElementById("projects-container");
        function renderProjects(filterCategory = "all") {
            if (!projectsContainer || !projects) return;
            const filtered = filterCategory === "all" ? projects : projects.filter(p => p.category === filterCategory);
            
            projectsContainer.innerHTML = filtered.map(p => {
                const isSecret = p.isSecret;
                return `
                    <div class="project-card glass-card ${isSecret ? 'secret-project-card' : ''}" data-pcategory="${p.category}">
                        <div>
                            <div class="project-header">
                                <span class="project-badge">${p.badge}</span>
                                <div class="project-links">
                                    <a href="${p.githubUrl}" target="_blank" class="project-link-icon" title="GitHub Source"><i class="fa-brands fa-github"></i></a>
                                </div>
                            </div>
                            <h3 class="project-title">${p.title}</h3>
                            <p class="project-desc">${p.description}</p>
                            <div class="project-tech-list">
                                ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                            </div>
                        </div>
                        <div class="project-footer">
                            <button class="project-action-btn open-project-modal" data-pid="${p.id}">
                                <span>${isSecret ? 'Sneak Peek 🚀' : 'View Simulation'}</span>
                                <i class="fa-solid fa-arrow-right-long"></i>
                            </button>
                            ${(p.liveUrl && p.liveUrl !== '#preview-modal' && p.liveUrl !== '#sneakpeek-modal') ? `<a href="${p.liveUrl}" target="_blank" class="btn btn-primary btn-sm" style="padding: 6px 14px; font-size: 0.8rem;">Live App 🌐</a>` : ''}
                            <a href="${p.githubUrl}" target="_blank" class="btn btn-outline btn-sm">Code</a>
                        </div>
                    </div>
                `;
            }).join('');

            // Attach modal handlers to newly rendered cards
            document.querySelectorAll(".open-project-modal").forEach(btn => {
                btn.addEventListener("click", () => {
                    const pid = btn.getAttribute("data-pid");
                    const projectObj = projects.find(item => item.id === pid);
                    if (projectObj) {
                        if (projectObj.isSecret) {
                            openModal("sneakpeek-modal");
                        } else {
                            populateAndOpenPreview(projectObj);
                        }
                    }
                });
            });
        }
        renderProjects("all");

        const projectFilters = document.querySelectorAll(".project-filter-btn");
        projectFilters.forEach(btn => {
            btn.addEventListener("click", () => {
                projectFilters.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                renderProjects(btn.getAttribute("data-pfilter"));
            });
        });

        // Coding Platforms
        const platformsContainer = document.getElementById("platforms-container");
        if (platformsContainer && codingPlatforms) {
            platformsContainer.innerHTML = codingPlatforms.map(pl => `
                <a href="${pl.link}" target="_blank" class="platform-card glass-card">
                    <div class="platform-left">
                        <span class="platform-icon">${pl.icon}</span>
                        <div class="platform-info">
                            <h4>${pl.platform}</h4>
                            <p>${pl.subtitle}</p>
                        </div>
                    </div>
                    <span class="platform-badge">${pl.stats}</span>
                </a>
            `).join('');
        }

        // Hackathons
        const hackathonsContainer = document.getElementById("hackathons-container");
        if (hackathonsContainer && hackathons) {
            hackathonsContainer.innerHTML = hackathons.map(hk => `
                <div class="hackathon-card glass-card">
                    <div class="hackathon-header">
                        <span class="hackathon-title">${hk.title}</span>
                        <span class="hackathon-date">${hk.date}</span>
                    </div>
                    <div class="hackathon-project"><i class="fa-solid fa-code-branch"></i> ${hk.project}</div>
                    <span class="hackathon-award"><i class="fa-solid fa-trophy"></i> ${hk.award}</span>
                </div>
            `).join('');
        }

        // Certifications
        const certsContainer = document.getElementById("certifications-container");
        if (certsContainer && certifications) {
            certsContainer.innerHTML = certifications.map(cert => `
                <div class="cert-card glass-card">
                    <span class="cert-icon">${cert.icon}</span>
                    <div class="cert-info">
                        <h4>${cert.title}</h4>
                        <p>${cert.issuer} • <strong style="color: var(--accent-primary)">${cert.category}</strong></p>
                    </div>
                </div>
            `).join('');
        }
    }

    // ==========================================
    // 2. DYNAMIC TYPING TEXT EFFECT
    // ==========================================
    const typingTextEl = document.getElementById("typing-text");
    const taglines = (typeof portfolioData !== 'undefined' && portfolioData.personal && portfolioData.personal.taglines) 
        ? portfolioData.personal.taglines 
        : ["Intelligent AI Systems", "Full Stack Web Apps", "Real-World Architecture", "Scalable Cloud SaaS"];

    let currentTaglineIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    function typeLoop() {
        if (!typingTextEl) return;
        const currentString = taglines[currentTaglineIndex];

        if (isDeleting) {
            typingTextEl.textContent = currentString.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 35;
        } else {
            typingTextEl.textContent = currentString.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 70;
        }

        if (!isDeleting && currentCharIndex === currentString.length) {
            typingSpeed = 2200; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTaglineIndex = (currentTaglineIndex + 1) % taglines.length;
            typingSpeed = 300;
        }

        setTimeout(typeLoop, typingSpeed);
    }
    setTimeout(typeLoop, 1000);

    // ==========================================
    // 3. AMBIENT PARTICLE & NEURAL GRID CANVAS
    // ==========================================
    const canvas = document.getElementById("particle-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particleCount = Math.min(Math.floor(window.innerWidth / 15), 80);
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                radius: Math.random() * 2 + 1
            });
        }

        let mouseX = -1000;
        let mouseY = -1000;
        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);

            const computedStyle = getComputedStyle(document.body);
            const accentColor = computedStyle.getPropertyValue("--accent-primary").trim() || "#00f2fe";

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Mouse push
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    p.x += (dx / dist) * 1.5;
                    p.y += (dy / dist) * 1.5;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = accentColor;
                ctx.fill();

                // Draw connecting lines to nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const distance = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
                    if (distance < 110) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(0, 242, 254, ${1 - distance / 110})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // ==========================================
    // 4. MODAL MANAGEMENT ENGINE
    // ==========================================
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add("active");
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove("active");
    }

    // Close on buttons or backdrop click
    document.querySelectorAll(".modal-close").forEach(btn => {
        btn.addEventListener("click", () => {
            const overlay = btn.closest(".modal-overlay");
            if (overlay) overlay.classList.remove("active");
        });
    });

    document.querySelectorAll(".modal-overlay").forEach(overlay => {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) overlay.classList.remove("active");
        });
    });

    // Populate and open project live simulation modal
    function populateAndOpenPreview(project) {
        const titleEl = document.getElementById("modal-project-title");
        if (titleEl) titleEl.textContent = project.title;

        const badgeEl = document.getElementById("modal-project-badge");
        if (badgeEl) badgeEl.textContent = project.badge;

        const descEl = document.getElementById("modal-project-desc");
        if (descEl) descEl.textContent = `${project.description} \n\nArchitecture Highlights: ${project.previewDetails || 'Built for enterprise resilience and sub-second latency.'}`;

        const tagsEl = document.getElementById("modal-project-tags");
        if (tagsEl) {
            tagsEl.innerHTML = project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
        }

        const urlEl = document.getElementById("modal-project-url");
        const isRealUrl = project.liveUrl && project.liveUrl !== "#preview-modal" && project.liveUrl !== "#sneakpeek-modal";
        if (urlEl) urlEl.textContent = isRealUrl ? project.liveUrl : `https://${project.id}.priya-ai-cloud.app`;

        const liveBtn = document.getElementById("modal-live-btn");
        if (liveBtn) {
            if (isRealUrl) {
                liveBtn.href = project.liveUrl;
                liveBtn.style.display = "inline-flex";
            } else {
                liveBtn.href = "#";
                liveBtn.onclick = () => { alert("Live demo simulation mode active!"); return false; };
            }
        }

        const githubBtn = document.getElementById("modal-github-btn");
        if (githubBtn) githubBtn.href = project.githubUrl;

        // Render interactive simulated UI inside simulation screen based on project type
        const simScreen = document.getElementById("modal-simulation-screen");
        if (simScreen) {
            if (project.id === "food-waste-tracker") {
                simScreen.innerHTML = `
                    <div style="width: 100%; text-align: left; font-family: var(--font-code); font-size: 0.85rem;">
                        <div style="color: #10b981; font-weight: bold; margin-bottom: 8px;">🟢 MERN AI FOOD TRACKER LIVE SYNC | WASTE REDUCTION: -34%</div>
                        <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; margin-bottom: 8px;">
                            <span style="color: #00f2fe">Order #409</span> [SMART MENU] &bull; Recommended Portion &bull; Status: <strong style="color: #10b981">OPTIMIZED & PREPARING</strong>
                        </div>
                        <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px;">
                            <span style="color: #bd34fe">Inventory AI Alert</span> &bull; Fresh Produce Forecast &bull; Action: <strong style="color: #f59e0b">AUTO-ORDER SCHEDULED</strong>
                        </div>
                    </div>
                `;
            } else if (project.id === "doctor-patient-system") {
                simScreen.innerHTML = `
                    <div style="width: 100%; text-align: left; font-family: var(--font-body); font-size: 0.88rem;">
                        <div style="background: rgba(0, 242, 254, 0.1); padding: 10px; border-radius: 8px; margin-bottom: 8px;">
                            <i class="fa-solid fa-user-doctor" style="color: #00f2fe"></i> <strong>Django Role-Based Portal (Doctor/Patient):</strong> <br>
                            <em>Patient #104 booked slot with Dr. Aravind (General Medicine) @ 10:30 AM</em>
                        </div>
                        <div style="background: rgba(16, 185, 129, 0.15); padding: 10px; border-radius: 8px;">
                            <i class="fa-solid fa-shield-halved" style="color: #10b981"></i> <strong>Medical Record Management (Encrypted):</strong> <br>
                            Prescription & diagnosis logs securely synced across MongoDB & Django REST endpoint.
                        </div>
                    </div>
                `;
            } else {
                simScreen.innerHTML = `
                    <div style="text-align: center;">
                        <i class="fa-solid fa-chart-line" style="font-size: 3rem; color: var(--accent-primary); margin-bottom: 12px;"></i>
                        <h4>Interactive Neural Simulation Active</h4>
                        <p style="font-size: 0.85rem; color: #94a3b8">Real-time data modeling and automated cloud execution engine operational.</p>
                    </div>
                `;
            }
        }

        openModal("preview-modal");
    }

    // Navbar Resume link
    const navResumeLink = document.getElementById("nav-resume-link");
    if (navResumeLink) {
        navResumeLink.addEventListener("click", (e) => {
            e.preventDefault();
            openModal("resume-modal");
        });
    }

    // Close success
    const closeSuccessBtn = document.getElementById("close-success");
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener("click", () => closeModal("success-modal"));
    }

    // ==========================================
    // 5. CONTACT FORM SUBMISSION HANDLER
    // ==========================================
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            // Show interactive confirmation modal
            openModal("success-modal");
            contactForm.reset();
        });
    }

    // ==========================================
    // 6. MOBILE NAVIGATION MENU TOGGLE
    // ==========================================
    const mobileToggle = document.getElementById("mobile-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const icon = mobileToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }
        });

        // Close when link clicked
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                const icon = mobileToggle.querySelector("i");
                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }
            });
        });
    }

    // ==========================================
    // 7. ACTIVE NAV SCROLL HIGHLIGHTING + NAVBAR EFFECT
    // ==========================================
    const sections = document.querySelectorAll("section[id]");
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        const scrollY = window.pageYOffset;

        // Navbar shadow when scrolled
        if (navbar) {
            if (scrollY > 60) {
                navbar.style.boxShadow = "0 8px 32px rgba(0,0,0,0.5)";
                navbar.style.background = "rgba(10, 10, 15, 0.95)";
            } else {
                navbar.style.boxShadow = "none";
                navbar.style.background = "rgba(10, 10, 15, 0.85)";
            }
        }

        // Active nav link
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            const sectionId = current.getAttribute("id");
            const navItem = document.querySelector(`.nav-links a[href*=${sectionId}]`);
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navItem) navItem.classList.add("active");
            } else {
                if (navItem) navItem.classList.remove("active");
            }
        });
    });

    // ==========================================
    // 8. SMOOTH SCROLL PROGRESS BAR
    // ==========================================
    const progressBar = document.createElement("div");
    progressBar.style.cssText = `
        position: fixed; top: 0; left: 0; height: 2px; width: 0%;
        background: linear-gradient(90deg, #7c6ef7, #a78bfa);
        z-index: 9999; transition: width 0.1s linear; pointer-events: none;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + "%";
    });
});
