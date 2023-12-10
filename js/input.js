function buildURL(string) {
    return isUrl
        ? 'https://' + encodeURIComponent(string)
        : 'https://www.google.com/search?q=' + encodeURIComponent(string);
}

const isUrlInput = document.getElementById('url-toggle');
let isUrl = true;

isUrlInput.addEventListener('change', () => {
    isUrl = isUrlInput.checked;
    console.log(isUrl);
});

const inputBox = document.getElementById('main-search');

inputBox.addEventListener('keyup', ({ key }) => {
    if (key === 'Enter') {
        const input = inputBox.value;
        const url = buildURL(input);
        window.open(url);
    }
});
