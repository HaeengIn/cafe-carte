document.querySelectorAll('details').forEach(details => {
    const summary = details.querySelector(':scope > summary');

    if (!summary) {
        return;
    }

    let contents = details.querySelector(':scope > .details-contents');

    if (!contents) {
        contents = details.querySelector(':scope > .favorite-real-contents');
    }

    if (!contents) {
        contents = document.createElement('div');
        contents.className = 'details-contents';

        while (summary.nextSibling) {
            contents.append(summary.nextSibling);
        }

        details.append(contents);
    }

    const finishAnimation = callback => {
        let finished = false;
        const finish = () => {
            if (finished) {
                return;
            }

            finished = true;
            contents.removeEventListener('transitionend', finish);
            callback();
        };

        contents.addEventListener('transitionend', finish, { once: true });
        setTimeout(finish, 500);
    };

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

            finishAnimation(() => {
                contents.style.height = 'auto';
                delete details.dataset.animating;
            });

            return;
        }

        contents.style.height = `${contents.scrollHeight}px`;

        requestAnimationFrame(() => {
            contents.style.height = '0';
        });

        finishAnimation(() => {
            details.open = false;
            delete details.dataset.animating;
        });
    });
});