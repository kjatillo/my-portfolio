/* Apply .scrolled class to the body as the page is scrolled down */
function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');

    if (!selectHeader.classList.contains('scroll-up-sticky') &&
        !selectHeader.classList.contains('sticky-top') &&
        !selectHeader.classList.contains('fixed-top'))
        return;

    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
}

document.addEventListener('scroll', toggleScrolled);
window.addEventListener('load', toggleScrolled);

/* Scrolling & Navigation */
window.addEventListener('load', function (e) {
    if (window.location.hash) {
        if (document.querySelector(window.location.hash)) {
            setTimeout(() => {
                let section = document.querySelector(window.location.hash);
                let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
                window.scrollTo({
                    top: section.offsetTop - parseInt(scrollMarginTop),
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});

let navmenulinks = document.querySelectorAll('.navmenu a');
function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
        if (!navmenulink.hash) return;
        let section = document.querySelector(navmenulink.hash);
        if (!section) return;
        let position = window.scrollY + 200;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
            document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
            navmenulink.classList.add('active');
        } else {
            navmenulink.classList.remove('active');
        }
    })
}
window.addEventListener('load', navmenuScrollspy);
document.addEventListener('scroll', navmenuScrollspy);

/* Navigation - Mobile */
const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
}
mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
            mobileNavToogle();
        }
    });
});

document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
    });
});

/* Animation - Scroll & Typed */
function aosInit() {
    AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
}
window.addEventListener('load', aosInit);

const selectTyped = document.querySelector('.typed');
if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
    });
}

/* Animation - Skills */
let skillsAnimation = document.querySelectorAll('.skills-animation');
skillsAnimation.forEach((item) => {
    new Waypoint({
        element: item,
        offset: '80%',
        handler: function (direction) {
            let progress = item.querySelectorAll('.progress .progress-bar');
            progress.forEach(el => {
                el.style.width = el.getAttribute('aria-valuenow') + '%';
            });
        }
    });
});

/* Education Toggle */
document.querySelectorAll('.education-item h3, .education-item .education-toggle').forEach((educationItem) => {
    educationItem.addEventListener('click', () => {
        educationItem.parentNode.classList.toggle('education-active');
    });
});

/* Contact Form */
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const formData = new FormData(contactForm);
            const formAction = contactForm.getAttribute('action');
            
            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    document.getElementById('success-message').classList.remove('d-none');
                    contactForm.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(error => {
                document.getElementById('error-message').classList.remove('d-none');
            });

            // Hide messages after 5 seconds
            setTimeout(function() {
                document.getElementById('success-message').classList.add('d-none');
                document.getElementById('error-message').classList.add('d-none');
            }, 5000);
        });
    }
});

/* Scroll Top Button */
let scrollTop = document.querySelector('.scroll-top');

function toggleScrollTop() {
    if (scrollTop) {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
}
scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('load', toggleScrollTop);
document.addEventListener('scroll', toggleScrollTop);
