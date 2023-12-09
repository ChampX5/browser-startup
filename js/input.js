function buildURL(string) {
    return (
        'https:///www.google.com/search?q=' +
        encodeURIComponent(string)
    );
}

const inputBox = document.getElementById('main-search');

inputBox.addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
        const input = inputBox.value;
        const url = buildURL(input);
        window.location.href = url;
    }
})