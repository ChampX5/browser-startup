function buildURL(string) {
    return isUrl
        ? 'https://' + string
        : 'https://www.google.com/search?q=' + string;
}

const isUrlInput = document.getElementById('url-toggle');
let isUrl = true;

isUrlInput.addEventListener('change', () => {
    isUrl = isUrlInput.checked;
});

document.addEventListener('DOMContentLoaded', () => {
    inputBox.focus({
        preventScroll: false
    });
});

const inputBox = document.getElementById('main-search');

inputBox.addEventListener('keyup', ({ key }) => {
    if (key === 'Enter') {
        const input = inputBox.value;
        const url = buildURL(input);
        window.location.replace(url);
    }

    if (key === 'u' && document.activeElement.id !== inputBox.id) {
        isUrlInput.click();
    }
});
