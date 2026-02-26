document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');

    // Intersection Observer for active class
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Optional: remove class when out of view
                // entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    slides.forEach(slide => {
        observer.observe(slide);
    });

    // Handle Nav links active state
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section');

    const slidesContainer = document.querySelector('.slides-container');
    slidesContainer.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const containerScroll = slidesContainer.scrollTop;
            if (containerScroll >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            const hrefId = link.getAttribute('href').substring(1);
            if (current.includes(hrefId)) {
                link.classList.add('active-nav');
            }
        });
    });

    // Works Tab Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');

            // Update buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update panes
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.getAttribute('id') === target) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // subtle mouse movement effect for decoration
    const decoElements = document.querySelectorAll('.square-deco');
    window.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) / 50;
        const moveY = (e.clientY - window.innerHeight / 2) / 50;

        decoElements.forEach((el, index) => {
            const speed = (index + 1) * 0.5;
            el.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
    });
});
