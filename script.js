// ==========================================================================
// PRIYADHARSHINI M - 3D COMIC BOOK PORTFOLIO CORE INTERACTIVE ENGINE
// Live Comic Creation Engine: Physical Paint-Strokes, Letter-by-Letter Reveals & 3D Physics
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. POPULATE DATA FROM LOCKED data.js
    // ==========================================
    if (typeof portfolioData !== 'undefined') {
        const { personal, stats, journey, skills, projects, codingPlatforms, hackathons, certifications } = portfolioData;

        // Personal Information Setup
        if (personal) {
            document.title = `${personal.fullName || personal.name} | 3D Comic Book Portfolio`;
            
            const brandEl = document.getElementById("brand-name");
            if (brandEl) brandEl.textContent = `${personal.name}.ai`;
            
            const roleEl = document.getElementById("hero-role-title");
            if (roleEl) {
                roleEl.innerHTML = `<strong>B.E. CSE Student @ KIT</strong> • Full Stack Developer • AI/ML Engineer • <span class="comic-stat-pill">1,400+ Problems Solved</span>`;
            }

            const bioHeadlineEl = document.getElementById("bio-headline");
            if (bioHeadlineEl) bioHeadlineEl.textContent = `"${personal.bioHeadline}"`;

            const bioDescEl = document.getElementById("bio-description");
            if (bioDescEl) bioDescEl.textContent = personal.bioDescription;

            const statusEl = document.getElementById("header-status");
            if (statusEl) statusEl.textContent = personal.status;

            const emailDisplayEl = document.getElementById("email-display");
            if (emailDisplayEl) emailDisplayEl.textContent = personal.email;

            const emailLinkEl = document.getElementById("email-link");
            if (emailLinkEl) emailLinkEl.href = `mailto:${personal.email}`;

            const phoneDisplayEl = document.getElementById("phone-display");
            if (phoneDisplayEl) phoneDisplayEl.textContent = personal.phone;

            const phoneLinkEl = document.getElementById("phone-link");
            if (phoneLinkEl) phoneLinkEl.href = `tel:${personal.phone.replace(/[^0-9+]/g, '')}`;

            const locationEl = document.getElementById("location-display");
            if (locationEl) locationEl.textContent = `${personal.location}, India`;
        }

        // Stats Deck (Hero 4 Collectible Cards)
        const statsDeck = document.getElementById("hero-stats-deck");
        if (statsDeck && stats) {
            const rotations = ["card-rotate-1", "card-rotate-neg1 card-accent-yellow", "card-rotate-2 card-accent-blue", "card-rotate-neg2 card-accent-orange"];
            statsDeck.innerHTML = stats.map((st, idx) => `
                <div class="stat-burst-card ${rotations[idx % rotations.length]}">
                    <span class="stat-big-num">${st.value}</span>
                    <span class="stat-label-text">${st.label}</span>
                </div>
            `).join('');
        }

        // Story Progression Panels (Chapter 01 Journey)
        const journeyContainer = document.getElementById("journey-container");
        if (journeyContainer && journey) {
            const chips = [
                { class: "chip-yellow", label: "PANEL 01" },
                { class: "chip-blue", label: "PANEL 02" },
                { class: "chip-orange", label: "PANEL 03" },
                { class: "chip-green", label: "PANEL 04" }
            ];
            const panelRotations = ["pop-rotate-neg1", "pop-rotate-1", "pop-rotate-neg2", "pop-rotate-2"];

            journeyContainer.innerHTML = journey.map((item, idx) => `
                <div class="story-panel-card ${panelRotations[idx % panelRotations.length]}">
                    <div>
                        <div class="panel-header-strip">
                            <span class="panel-chip ${chips[idx % chips.length].class}">${chips[idx % chips.length].label}</span>
                            <span class="panel-year-text">${item.year}</span>
                        </div>
                        <h4 class="panel-main-title">${item.title}</h4>
                        <p class="panel-sub-title">${item.subtitle}</p>
                        <p class="panel-body-desc">${item.description}</p>
                    </div>
                    <div class="panel-footer-spec">
                        <span>Chapter ${idx + 1}</span>
                        <span>● Milestone Unlocked</span>
                    </div>
                </div>
            `).join('');
        }

        // Technical Arsenal (Skills Deck with Category Filtering)
        const skillsContainer = document.getElementById("skills-container");
        function renderSkills(category = "all") {
            if (!skillsContainer || !skills) return;

            const filtered = category === "all" ? skills : skills.filter(s => s.category === category);
            const fillColors = ["fill-yellow", "fill-cyan", "fill-orange", "fill-green"];
            const skillRotations = ["pop-rotate-neg1", "pop-rotate-1", "pop-rotate-neg2", "pop-rotate-2"];

            skillsContainer.innerHTML = filtered.map((sk, idx) => `
                <div class="comic-skill-card ${skillRotations[idx % skillRotations.length]}">
                    <div>
                        <div class="skill-card-top">
                            <span class="skill-emoji-icon">${sk.icon || '⚡'}</span>
                            <span class="skill-cat-pill">${sk.category}</span>
                        </div>
                        <h4 class="skill-name-heading">${sk.name}</h4>
                    </div>
                    <div class="skill-power-meter-wrapper">
                        <div class="power-meter-header">
                            <span>POWER LEVEL</span>
                            <span>${sk.level}%</span>
                        </div>
                        <div class="power-meter-track">
                            <div class="power-meter-fill ${fillColors[idx % fillColors.length]}" style="width: ${sk.level}%;"></div>
                        </div>
                    </div>
                </div>
            `).join('');

            attach3DTilt(document.querySelectorAll(".comic-skill-card"));
        }
        renderSkills("all");

        // Skill Filters
        const skillTabs = document.querySelectorAll("#skill-filters .comic-filter-tab");
        skillTabs.forEach(tab => {
            tab.addEventListener("click", () => {
                skillTabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                renderSkills(tab.getAttribute("data-filter"));
            });
        });

        // Featured Hero Missions (Projects)
        const projectsContainer = document.getElementById("projects-container");
        function renderProjects(pfilter = "all") {
            if (!projectsContainer || !projects) return;

            const filtered = pfilter === "all" 
                ? projects 
                : pfilter === "team" 
                    ? projects.filter(p => p.type === "Team Project")
                    : projects.filter(p => p.category === pfilter || (p.type && p.type.toLowerCase().includes(pfilter)));

            projectsContainer.innerHTML = filtered.map((proj, idx) => {
                const isVoice = proj.id === "voice-logistic-assistant";
                const isFood = proj.id === "food-waste-tracker";
                
                const splashClass = isVoice ? "splash-cyan" : (isFood ? "splash-green" : "splash-yellow");
                const tagClass = isVoice ? "tag-cyan" : (isFood ? "tag-mint" : "tag-amber");
                const icon = isVoice ? "🎙️" : (isFood ? "🍲" : "🩺");
                const issueNum = proj.type ? proj.type.toUpperCase() : `ISSUE #0${idx + 1}`;
                
                return `
                    <div class="comic-project-cover-card" data-pid="${proj.id}">
                        <div class="project-corner-paint-splash ${splashClass}"></div>
                        <div>
                            <div class="project-issue-strip">
                                <span class="issue-badge-tag ${tagClass}">${issueNum} • PRODUCTION READY</span>
                                <span class="issue-stack-label">${proj.badge}</span>
                            </div>
                            <div class="project-title-row">
                                <h3 class="project-issue-title">${proj.title}</h3>
                                <span class="project-issue-icon">${icon}</span>
                            </div>
                            <p class="project-issue-desc">${proj.description}</p>
                            
                            <!-- Visual Sandbox Frame Preview -->
                            <div class="project-visual-canvas">
                                <div class="visual-live-indicator">
                                    <span class="live-green-pulse"></span>
                                    <span>${isVoice ? 'Live Voice AI & n8n Engine' : (proj.liveUrl && proj.liveUrl.startsWith('http') ? 'Live Deployed App Ready' : 'Simulated Reactive Engine')}</span>
                                </div>
                            </div>

                            <div class="project-tech-badges-wrap">
                                ${proj.tech.map((t, tidx) => `
                                    <span class="tech-comic-pill ${tidx === 0 ? 'pill-accent' : ''}">${t}</span>
                                `).join('')}
                            </div>
                        </div>

                        <div class="project-card-action-bar">
                            <button class="comic-btn btn-primary btn-sm open-sim-btn" data-pid="${proj.id}">
                                <span>Launch Simulation</span>
                                <span class="btn-icon-burst">🚀</span>
                            </button>
                            <div class="project-links-duo">
                                ${proj.liveUrl && proj.liveUrl.startsWith('http') ? `
                                <a href="${proj.liveUrl}" target="_blank" rel="noopener" class="comic-btn btn-surface btn-xs" title="Open Live Website">
                                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                    <span>Live</span>
                                </a>
                                ` : ''}
                                <a href="${proj.githubUrl}" target="_blank" rel="noopener" class="comic-btn btn-surface btn-xs" title="GitHub Code">
                                    <i class="fa-brands fa-github"></i>
                                    <span>Code</span>
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            // Attach event listeners to project simulation buttons
            document.querySelectorAll(".open-sim-btn").forEach(btn => {
                btn.addEventListener("click", () => {
                    const pid = btn.getAttribute("data-pid");
                    const targetProj = projects.find(p => p.id === pid);
                    if (targetProj) openProjectSimulation(targetProj);
                });
            });

            attach3DTilt(document.querySelectorAll(".comic-project-cover-card"));
        }
        renderProjects("all");

        // Project Filter Buttons
        const projectFilterTabs = document.querySelectorAll("#project-filters .comic-filter-tab");
        projectFilterTabs.forEach(tab => {
            tab.addEventListener("click", () => {
                projectFilterTabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                renderProjects(tab.getAttribute("data-pfilter"));
            });
        });

        // Competitive Coding Platforms (Bento Grid)
        const platformsContainer = document.getElementById("platforms-container");
        if (platformsContainer && codingPlatforms) {
            const rotStyles = ["pop-rotate-neg1", "pop-rotate-1", "pop-rotate-neg2"];
            platformsContainer.innerHTML = codingPlatforms.slice(0, 3).map((pl, idx) => `
                <div class="platform-bento-card ${rotStyles[idx % rotStyles.length]}">
                    <div>
                        <div class="platform-card-header">
                            <div class="platform-title-group">
                                <span class="text-2xl">${pl.icon}</span>
                                <h4 class="platform-name">${pl.platform}</h4>
                            </div>
                            <span class="platform-rank-pill">${pl.stats}</span>
                        </div>
                        <div class="platform-stats-stack">
                            <p style="font-size: 0.88rem; color: var(--ink-muted);">${pl.subtitle}</p>
                        </div>
                        <div class="platform-badges-strip">
                            <span class="collectible-badge-chip">⚡ Daily Solver</span>
                            <span class="collectible-badge-chip">🎯 High Consistency</span>
                        </div>
                    </div>
                    <div class="platform-card-footer">
                        <a href="${pl.link}" target="_blank" rel="noopener" style="color: var(--ink-black); font-weight: 800; text-decoration: underline;">
                            View Profile ↗
                        </a>
                    </div>
                </div>
            `).join('');
        }

        // Major Hackathon Victories (4 Distinct Cards)
        const hackathonsContainer = document.getElementById("hackathons-container");
        if (hackathonsContainer && hackathons) {
            const hackCards = [
                { color: "card-yellow", tag: "2ND PRIZE PODIUM", bounty: "₹75,000" },
                { color: "card-blue", tag: "MOST INNOVATIVE", bounty: "₹7,000" },
                { color: "card-green", tag: "CODE-RELAY WINNER", bounty: "₹3,000" },
                { color: "card-orange", tag: "DEPARTMENT TOPPER", bounty: "70 Solved" }
            ];

            hackathonsContainer.innerHTML = hackathons.slice(0, 4).map((hk, idx) => `
                <div class="hackathon-prize-card ${hackCards[idx % hackCards.length].color}">
                    <div>
                        <div class="hackathon-top-bar">
                            <span class="hack-podium-tag">${hackCards[idx % hackCards.length].tag}</span>
                            <span class="hack-prize-cash">${hackCards[idx % hackCards.length].bounty}</span>
                        </div>
                        <h4 class="hack-event-title">${hk.title}</h4>
                        <p class="hack-achievement-desc"><strong>${hk.project}</strong> — ${hk.award}</p>
                    </div>
                    <div class="hack-card-footer">
                        <span>Year: ${hk.date}</span>
                        <span class="material-symbols-outlined text-[20px]">workspace_premium</span>
                    </div>
                </div>
            `).join('');
        }

        // Verified Certifications (15 collectible badges)
        const certsContainer = document.getElementById("certifications-container");
        if (certsContainer && certifications) {
            const certRotations = ["pop-rotate-neg1", "pop-rotate-1", "pop-rotate-neg2", "pop-rotate-2"];
            certsContainer.innerHTML = certifications.map((c, idx) => `
                <div class="cert-stamp-card ${certRotations[idx % certRotations.length]}">
                    <span class="cert-emoji-icon">${c.icon}</span>
                    <h5 class="cert-title-text">${c.title}</h5>
                    <span class="cert-issuer-text">${c.issuer}</span>
                </div>
            `).join('');
        }
    }

    // ==========================================
    // 2. LIVE TYPOGRAPHY GENERATOR (LETTER-BY-LETTER)
    // ==========================================
    function initLiveTypographySpans() {
        const textElements = document.querySelectorAll(".live-paint-text");
        textElements.forEach(el => {
            const rawText = el.getAttribute("data-text-paint") || el.textContent.trim();
            el.innerHTML = ""; // Clear for letter injection

            let charDelayCounter = 0;
            for (let i = 0; i < rawText.length; i++) {
                const char = rawText[i];
                const span = document.createElement("span");
                span.className = "char-paint-item";
                span.textContent = char === " " ? "\u00A0" : char;
                
                // Assign calculated micro-delay & subtle random rotational jitter
                const delay = (charDelayCounter * 0.032).toFixed(3);
                const rot = ((Math.random() - 0.5) * 6).toFixed(1);
                span.style.setProperty("--char-delay", `${delay}s`);
                span.style.setProperty("--char-rot", `${rot}deg`);

                el.appendChild(span);
                charDelayCounter++;
            }
        });
    }
    initLiveTypographySpans();

    // ==========================================
    // 3. KINETIC TYPING EFFECT FOR HERO
    // ==========================================
    const typingTarget = document.getElementById("typing-text");
    const taglines = [
        "Intelligent AI Systems",
        "Full Stack Web Apps",
        "MERN & Django Pipelines",
        "Award-Winning Hackathons",
        "Algorithmic Architecture"
    ];

    let tIdx = 0;
    let cIdx = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeLoop() {
        if (!typingTarget) return;
        const currentPhrase = taglines[tIdx];

        if (isDeleting) {
            cIdx--;
            typingTarget.textContent = currentPhrase.substring(0, cIdx);
            typingSpeed = 40;
        } else {
            cIdx++;
            typingTarget.textContent = currentPhrase.substring(0, cIdx);
            typingSpeed = 80;
        }

        if (!isDeleting && cIdx === currentPhrase.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && cIdx === 0) {
            isDeleting = false;
            tIdx = (tIdx + 1) % taglines.length;
            typingSpeed = 400;
        }

        setTimeout(typeLoop, typingSpeed);
    }
    setTimeout(typeLoop, 800);

    // ==========================================
    // 4. SIGNATURE PHYSICAL YELLOW PAINT-STROKE FOR HERO (PRIYADHARSHINI)
    // ==========================================
    let paintAnimationRunning = false;

    function initSignatureHeroPaintAnimation() {
        if (paintAnimationRunning) return;

        const clipRect = document.getElementById("paint-brush-reveal-rect-hero");
        const brushHead = document.getElementById("paint-brush-head-hero");
        const paintWrapper = document.getElementById("paint-stroke-wrapper");
        const letterElements = document.querySelectorAll("#paint-letters-deck-hero .paint-letter-item");

        if (!clipRect || !brushHead || !paintWrapper) return;
        paintAnimationRunning = true;

        clipRect.setAttribute("width", "0");
        brushHead.setAttribute("transform", "translate(0, 0)");
        brushHead.classList.remove("is-done");
        paintWrapper.classList.remove("paint-complete");
        
        letterElements.forEach((el, idx) => {
            el.classList.remove("is-revealed");
            const rot = (idx % 2 === 0 ? -1 : 1) * (1.5 + (idx % 3));
            el.style.setProperty("--rot", `${rot}deg`);
        });

        const totalWidth = 720;
        const totalDuration = 2600;
        const startTimestamp = performance.now();
        const revealed = new Array(letterElements.length).fill(false);

        const startX = 30;
        const endX = 660;
        const step = letterElements.length > 1 ? (endX - startX) / (letterElements.length - 1) : 0;

        function stepPaint(now) {
            const elapsed = now - startTimestamp;
            const progress = Math.min(elapsed / totalDuration, 1);
            const easedProgress = Math.pow(progress, 0.95);
            const currentX = easedProgress * totalWidth;

            clipRect.setAttribute("width", currentX.toFixed(1));
            brushHead.setAttribute("transform", `translate(${currentX.toFixed(1)}, 0)`);

            letterElements.forEach((el, idx) => {
                const triggerX = startX + idx * step;
                if (!revealed[idx] && currentX >= triggerX) {
                    revealed[idx] = true;
                    el.classList.add("is-revealed");
                }
            });

            if (progress < 1) {
                requestAnimationFrame(stepPaint);
            } else {
                brushHead.classList.add("is-done");
                paintWrapper.classList.add("paint-complete");
                paintAnimationRunning = false;
            }
        }

        requestAnimationFrame(stepPaint);
    }

    // ==========================================
    // 5. LIVE COMIC CREATION SCROLL OBSERVER ENGINE
    // ==========================================
    const comicPanelObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const panel = entry.target;
                panel.classList.add("panel-drawn");

                // If hero section, trigger signature paint stroke
                if (panel.getAttribute("data-comic-section") === "hero") {
                    setTimeout(initSignatureHeroPaintAnimation, 200);
                }
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".live-comic-panel").forEach(panel => {
        comicPanelObserver.observe(panel);
    });

    // ==========================================
    // 6. 3D TILT EFFECT ON CARDS WITH PERSPECTIVE
    // ==========================================
    function attach3DTilt(elements) {
        elements.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
                card.style.transition = "transform 0.3s ease";
                setTimeout(() => {
                    card.style.transition = "";
                }, 300);
            });
        });
    }

    const heroCard = document.getElementById("hero-character-card");
    if (heroCard) attach3DTilt([heroCard]);
    attach3DTilt(document.querySelectorAll(".story-panel-card, .hackathon-prize-card, .platform-bento-card"));

    // ==========================================
    // 7. AMBIENT COMIC PARTICLES & SPEED LINES CANVAS
    // ==========================================
    const canvas = document.getElementById("comic-particle-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        const numParticles = Math.min(Math.floor(window.innerWidth / 30), 45);

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 2,
                shape: Math.random() > 0.5 ? "circle" : "star",
                color: Math.random() > 0.5 ? "#FACC15" : "#FB923C",
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.02
            });
        }

        let mouseX = -1000;
        let mouseY = -1000;
        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function drawStar(cx, cy, spikes, outerRadius, innerRadius, color) {
            let rot = Math.PI / 2 * 3;
            let x = cx;
            let y = cy;
            let step = Math.PI / spikes;

            ctx.beginPath();
            ctx.moveTo(cx, cy - outerRadius);
            for (let i = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * outerRadius;
                y = cy + Math.sin(rot) * outerRadius;
                ctx.lineTo(x, y);
                rot += step;

                x = cx + Math.cos(rot) * innerRadius;
                y = cy + Math.sin(rot) * innerRadius;
                ctx.lineTo(x, y);
                rot += step;
            }
            ctx.lineTo(cx, cy - outerRadius);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.strokeStyle = "#18181B";
            ctx.lineWidth = 1;
            ctx.fill();
            ctx.stroke();
        }

        function renderParticles() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.rotation += p.rotSpeed;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    p.x += (dx / dist) * 2;
                    p.y += (dy / dist) * 2;
                }

                if (p.shape === "star") {
                    drawStar(p.x, p.y, 4, p.size * 2, p.size, p.color);
                } else {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.strokeStyle = "#18181B";
                    ctx.lineWidth = 1;
                    ctx.fill();
                    ctx.stroke();
                }
            });

            requestAnimationFrame(renderParticles);
        }
        renderParticles();
    }

    // ==========================================
    // 8. READING SCROLL PROGRESS BAR & ACTIVE NAV
    // ==========================================
    const progressBar = document.getElementById("comic-scroll-progress");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".comic-nav-link");

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (progressBar && docHeight > 0) {
            progressBar.style.width = (scrollTop / docHeight) * 100 + "%";
        }

        sections.forEach(sec => {
            const top = sec.offsetTop - 140;
            const height = sec.offsetHeight;
            const id = sec.getAttribute("id");

            if (scrollTop >= top && scrollTop < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("data-nav") === id) {
                        link.classList.add("active");
                    }
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileToggle = document.getElementById("mobile-menu-toggle");
    const navMenu = document.getElementById("comic-nav-menu");
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            const icon = mobileToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                const icon = mobileToggle.querySelector("i");
                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }
            });
        });
    }

    // ==========================================
    // 9. MODALS ENGINE (SIMULATION, RESUME, SUCCESS)
    // ==========================================
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add("active");
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove("active");
    }

    document.querySelectorAll(".modal-close-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const overlay = btn.closest(".comic-modal-overlay");
            if (overlay) overlay.classList.remove("active");
        });
    });

    document.querySelectorAll(".comic-modal-overlay").forEach(overlay => {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) overlay.classList.remove("active");
        });
    });

    // Real-time clock for simulation
    setInterval(() => {
        const clockEl = document.getElementById("sim-clock-display");
        if (clockEl) {
            const now = new Date();
            clockEl.textContent = now.toTimeString().split(' ')[0];
        }
    }, 1000);

    // Open Project Live Simulation Sandbox
    function openProjectSimulation(proj) {
        const titleEl = document.getElementById("modal-project-title");
        const badgeEl = document.getElementById("modal-project-badge");
        const urlEl = document.getElementById("modal-project-url");
        const descEl = document.getElementById("modal-project-desc");
        const tagsEl = document.getElementById("modal-project-tags");
        const liveBtn = document.getElementById("modal-live-btn");
        const githubBtn = document.getElementById("modal-github-btn");
        const simContent = document.getElementById("modal-simulation-screen");

        const hasLiveSite = Boolean(proj.liveUrl && proj.liveUrl.startsWith('http'));

        if (titleEl) titleEl.textContent = proj.title;
        if (badgeEl) badgeEl.textContent = proj.badge;
        if (urlEl) urlEl.textContent = hasLiveSite ? proj.liveUrl : `https://${proj.id}.priya-ai-systems.org`;
        if (descEl) descEl.textContent = `${proj.description} \n\n${proj.previewDetails || 'Architected with full role-based access, low-latency state persistence, and modular cloud endpoints.'}`;

        if (tagsEl) {
            tagsEl.innerHTML = proj.tech.map(t => `<span class="tech-comic-pill">${t}</span>`).join('');
        }

        if (githubBtn) githubBtn.href = proj.githubUrl;
        if (liveBtn) {
            if (hasLiveSite) {
                liveBtn.href = proj.liveUrl;
                liveBtn.onclick = null;
            } else {
                liveBtn.href = '#';
                liveBtn.onclick = (e) => {
                    e.preventDefault();
                    alert(`🚀 Interactive Sandbox simulation active for ${proj.title}! Full production demo running in test mode.`);
                };
            }
        }

        if (simContent) {
            if (proj.id === "voice-logistic-assistant") {
                simContent.innerHTML = `
                    <div style="color: #38BDF8; font-weight: bold; margin-bottom: 8px;">🎙️ VOICE LOGISTIC ASSISTANT | N8N + GEMINI AI + FIREBASE ENGINE</div>
                    <div style="background: rgba(255,255,255,0.06); padding: 10px; border-radius: 6px; margin-bottom: 8px; font-family: monospace; font-size: 0.85rem;">
                        <span style="color: #FACC15;">[VOICE INPUT] Driver:</span> "Hey Assistant, mark delivery #TX-904 delivered!"<br>
                        <span style="color: #22C55E;">[n8n EVENT WEBHOOK]:</span> Triggered webhook payload -> <strong>Firebase Firestore</strong>.<br>
                        <span style="color: #22C55E;">[DATABASE WRITE]:</span> Order #TX-904 status updated to <strong>DELIVERED</strong> at 09:12:44.<br>
                        <span style="color: #38BDF8;">[AI VOICE RESPONSE]:</span> "Order #TX-904 marked delivered! Updating delivery route queue."<br><br>
                        <span style="color: #FACC15;">[VOICE INPUT] Driver:</span> "What is my next stop?"<br>
                        <span style="color: #A855F7;">[GPS & ROUTING ENGINE]:</span> Next Stop: 42 Palm Grove Ave, Tirupur (1.8 km). Rendering live interactive map...
                    </div>
                    <div style="background: rgba(255,255,255,0.06); padding: 8px 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem;">
                        <span style="color: #22C55E;">● Hands-Free Voice Agent: Active</span>
                        <span style="color: #FACC15;">Firebase Realtime Sync: Connected</span>
                    </div>
                `;
            } else if (proj.id === "food-waste-tracker") {
                simContent.innerHTML = `
                    <div style="color: #22C55E; font-weight: bold; margin-bottom: 8px;">🟢 MERN AI FOOD TRACKER STREAM ACTIVE | SPOILAGE MITIGATION: 98.4%</div>
                    <div style="background: rgba(255,255,255,0.06); padding: 10px; border-radius: 6px; margin-bottom: 8px;">
                        <span style="color: #38BDF8;">[14:22:04] > CAFET_A:</span> Logged 45 surplus meal packages [Expiry window: 3 hrs]<br>
                        <span style="color: #FACC15;">[14:22:06] > AI ALGORITHM:</span> Proximity matching nearest certified NGO distribution center...<br>
                        <span style="color: #22C55E;">[14:22:09] > DISPATCH ASSIGNED:</span> Hope Relief Transit Van #3 (1.2 km away) routed.
                    </div>
                    <div style="background: rgba(255,255,255,0.06); padding: 10px; border-radius: 6px;">
                        <span style="color: #FB923C;">REAL-TIME INVENTORY METRIC:</span> 420 kg meals salvaged today across 18 partnering hubs.
                    </div>
                `;
            } else if (proj.id === "doctor-patient-system") {
                simContent.innerHTML = `
                    <div style="color: #38BDF8; font-weight: bold; margin-bottom: 8px;">🩺 DJANGO + REACT HEALTHCARE EHR PORTAL | ENCRYPTED SYNC</div>
                    <div style="background: rgba(255,255,255,0.06); padding: 10px; border-radius: 6px; margin-bottom: 8px;">
                        <span style="color: #FACC15;">[09:15:02] SELECT * FROM clinic_appointments WHERE doctor_id=14;</span><br>
                        <span style="color: #22C55E;">[09:15:04] 200 OK:</span> Role-based Token verified for Dr. Priyadharshini (Physician Portal).<br>
                        <span style="color: #38BDF8;">[09:15:10] POST /api/v1/prescriptions:</span> Encrypted medical record written to MySQL database.
                    </div>
                    <div style="background: rgba(255,255,255,0.06); padding: 10px; border-radius: 6px;">
                        <span style="color: #22C55E;">ACTIVE STATUS:</span> 24 appointments slated, triage status verified, webhook notifications live.
                    </div>
                `;
            }
        }

        openModal("preview-modal");
    }

    const modalCloseFooterBtn = document.getElementById("modal-close-footer-btn");
    if (modalCloseFooterBtn) {
        modalCloseFooterBtn.addEventListener("click", () => closeModal("preview-modal"));
    }

    // Resume Modal Triggers
    const navResumeBtn = document.getElementById("nav-resume-btn");
    const heroResumeTrigger = document.getElementById("hero-resume-trigger");
    const closeResumeBottomBtn = document.getElementById("close-resume-bottom-btn");

    if (navResumeBtn) {
        navResumeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal("resume-modal");
        });
    }

    if (heroResumeTrigger) {
        heroResumeTrigger.addEventListener("click", () => openModal("resume-modal"));
    }

    if (closeResumeBottomBtn) {
        closeResumeBottomBtn.addEventListener("click", () => closeModal("resume-modal"));
    }

    // Contact Form Submission (Live Delivery to kit28.24cs128@gmail.com)
    const contactForm = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-dispatch-btn");
    const confirmSuccessBtn = document.getElementById("confirm-success-btn");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("sender-name")?.value.trim() || "Visitor";
            const email = document.getElementById("sender-email")?.value.trim() || "";
            const subject = document.getElementById("sender-subject")?.value || "General Inquiry";
            const message = document.getElementById("sender-message")?.value.trim() || "";

            const originalBtnHtml = submitBtn ? submitBtn.innerHTML : "Send Dispatch! 🚀";
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span>Transmitting Signal...</span> <span class="btn-icon-burst">⚡</span>`;
            }

            try {
                const response = await fetch("https://formsubmit.co/ajax/kit28.24cs128@gmail.com", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        Name: name,
                        Email: email,
                        Topic: subject,
                        Message: message,
                        _subject: `[Portfolio Mission] ${subject} - from ${name}`,
                        _template: "table"
                    })
                });

                if (response.ok) {
                    openModal("success-modal");
                    contactForm.reset();
                } else {
                    // Fallback to mailto link
                    window.location.href = `mailto:kit28.24cs128@gmail.com?subject=${encodeURIComponent("[Portfolio Dispatch] " + subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
                    openModal("success-modal");
                    contactForm.reset();
                }
            } catch (err) {
                // Fallback to direct mailto on network block
                window.location.href = `mailto:kit28.24cs128@gmail.com?subject=${encodeURIComponent("[Portfolio Dispatch] " + subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
                openModal("success-modal");
                contactForm.reset();
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }
            }
        });
    }

    if (confirmSuccessBtn) {
        confirmSuccessBtn.addEventListener("click", () => closeModal("success-modal"));
    }
});
