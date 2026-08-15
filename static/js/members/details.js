document.querySelectorAll('.detail details').forEach(details => {
    const summary = details.querySelector('summary');
    const contents = details.querySelector('.favorite-real-contents');

    summary.addEventListener('click', event => {
        event.preventDefault();

        if (details.dataset.animating) {
            return;
        }

        details.dataset.animating = 'true';

        if (!details.open) {
            details.open = true;

            const height = contents.scrollHeight;

            requestAnimationFrame(() => {
                contents.style.height = `${height}px`;
            });

            contents.addEventListener('transitionend', () => {
                contents.style.height = 'auto';
                delete details.dataset.animating;
            }, { once: true });

            return;
        }

        contents.style.height = `${contents.scrollHeight}px`;

        requestAnimationFrame(() => {
            contents.style.height = '0';
        });

        contents.addEventListener('transitionend', () => {
            details.open = false;
            delete details.dataset.animating;
        }, { once: true });
    });
});