  // Header scroll backdrop effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if(navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close Mobile Menu on Nav Click
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });

document.addEventListener("DOMContentLoaded", () => {
    const statNumbers = document.querySelectorAll(".stat-number");
    let hasAnimated = false;

    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute("data-target");
            const duration = 2000; // Total animation duration in ms (2 seconds)
            const frameDuration = 1000 / 60; // 60fps
            const totalFrames = Math.round(duration / frameDuration);
            let frame = 0;

            const counter = setInterval(() => {
                frame++;
                // Smooth easing progress
                const progress = frame / totalFrames;
                const currentNumber = Math.round(target * progress);

                stat.textContent = currentNumber;

                if (frame === totalFrames) {
                    stat.textContent = target; // Ensure exact final number
                    clearInterval(counter);
                }
            }, frameDuration);
        });
    };

    // Intersection Observer triggers count-up only when scrolled into view
    const statsSection = document.querySelector(".stats");
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateStats();
            }
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }
});
document.addEventListener("DOMContentLoaded", () => {
    // Select all elements with the 'counter' class
    const counters = document.querySelectorAll(".counter");
    const speed = 200; // Lower number = faster animation speed

    // Function to run the counting animation
    const startCounting = (counter) => {
        const target = +counter.getAttribute("data-target");
        let count = 0;

        // Calculate step increment base
        const increment = target / speed;

        const updateCount = () => {
            count += increment;

            if (count < target) {
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 15); // Adjust delay frame time (ms)
            } else {
                counter.innerText = target; // Ensure exact final target number
            }
        };

        updateCount();
    };

    // IntersectionObserver to trigger animation only when visible on screen
    const observerOptions = {
        threshold: 0.4 // Starts animation when 40% of the section is visible
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                startCounting(counter);
                // Stop observing once animated so it doesn't repeat on re-scroll
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    // Observe each counter element
    counters.forEach(counter => {
        statsObserver.observe(counter);
    });
});

