
        const words = ["Kreatif, Mandiri, dan Berprestasi", "Berakhlak Mulia", "Cinta Al-Quran", "Pemimpin Masa Depan"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentWord = words[wordIndex];
        const typingSpan = document.querySelector('.typing-text');
        
        if (isDeleting) {
            typingSpan.innerHTML = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingSpan.innerHTML = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
    }
    
    typeEffect();
        // Navbar Scroll Effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });     

        // Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            });
        });

        // Scroll Reveal
        const revealElements = document.querySelectorAll('.reveal');
        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const elementVisible = 150;
            revealElements.forEach((element) => {
                const elementTop = element.getBoundingClientRect().top;
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        };
        
        window.addEventListener('scroll', revealOnScroll);
        window.addEventListener('load', revealOnScroll);

        // Lightbox
        function openLightbox(src) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            lightboxImg.src = src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        document.getElementById('lightbox').addEventListener('click', function(e) {
            if (e.target === this) closeLightbox();
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeLightbox();
        });

        // Contact Form
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            btn.disabled = true;
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Pesan Terkirim!';
                btn.style.background = 'var(--accent-green)';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                    this.reset();
                }, 2000);
            }, 1500);
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Parallax shapes
        document.addEventListener('mousemove', function(e) {
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 20;
                const xOffset = (window.innerWidth / 2 - e.clientX) / speed;
                const yOffset = (window.innerHeight / 2 - e.clientY) / speed;
                shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        });

        // Counter stats
        const statNumbers = document.querySelectorAll('.stat-number');
        let counted = false;
        const countUp = () => {
            const statsSection = document.querySelector('.about-stats');
            if (statsSection) {
                const sectionTop = statsSection.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (sectionTop < windowHeight - 100 && !counted) {
                    counted = true;
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.textContent);
                        const suffix = stat.textContent.replace(/[0-9]/g, '');
                        let current = 0;
                        const increment = target / 50;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                stat.textContent = target + suffix;
                                clearInterval(timer);
                            } else {
                                stat.textContent = Math.floor(current) + suffix;
                            }
                        }, 30);
                    });
                }
            }
        };
        window.addEventListener('scroll', countUp);
        
        // Hero card click handlers
        document.querySelectorAll('.hero-card').forEach(card => {
            card.addEventListener('click', function() {
                const url = this.getAttribute('data-url');
                if (url && url !== '#') {
                    window.open(url, '_blank');
                }
            });
        });