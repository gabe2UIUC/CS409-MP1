/* Your JS here. */
const track = document.querySelector(".carousel-track");
const carouselItems = Array.from(track.children);
const nextButton = document.getElementById("carousel-next");
const prevButton = document.getElementById("carousel-prev");

let currentIndex = 0;

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`
}

nextButton.addEventListener('click', () => {
    if (currentIndex === carouselItems.length - 1) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    updateCarousel();
});

prevButton.addEventListener('click', () => {
    if (currentIndex === 0) {
        currentIndex = carouselItems.length - 1;
    } else {
        currentIndex--;
    }
    updateCarousel();
});

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('course-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModalButton = document.getElementById('close-modal-button');
    const classCards = document.querySelectorAll('.flex-column');

    classCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const description = card.getAttribute('data-description');
            modalTitle.textContent = title;
            modalDescription.textContent = description;

            modal.showModal();
        });
    });

    closeModalButton.addEventListener('click', () => {
        modal.close();
    });

    modal.addEventListener('click', (e) => {
        const dialogDimensions = modal.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            modal.close();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    const viewportHeight = window.innerHeight;
    const navbarLinks = document.querySelectorAll('.navbar-links a');
    const sections = document.querySelectorAll('main .section, #welcome-text');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shrunken');
        } else {
            navbar.classList.remove('shrunken');
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: `-${navbarHeight}px 0px -${viewportHeight - navbarHeight + 10}px 0px`,
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                navbarLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
});