const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll(
    '.fade-down, .fade-left, .fade-right'
).forEach(element => {
    observer.observe(element);
});

window.addEventListener('load', () => {
    document.querySelectorAll(
        '.fade-down, .fade-left, .fade-right'
    ).forEach(element => {
        const rect = element.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            element.classList.add('is-visible');
            observer.unobserve(element);
        }
    });
});
