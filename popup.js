const api_key = '' // enter your api key
const search = document.querySelector("#search");
search.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchImages(search.value)
    }
})
function fetchImages(value) {
    fetch(`http://api.giphy.com/v1/gifs/search?q=${value}&limit=9&api_key=${api_key}`)
        .then(res => res.json())
        .then(jsonData => {
            buildUI(jsonData)
        })
}
function buildUI(response) {
    // document.write(JSON.stringify(response))
    let column = document.querySelector('.columns')
    let len = response.data.length;
    column.innerHTML = '';
    for (let index = 0; index < len; index++) {
        let url = response.data[index].images.original.url;
        let img = document.createElement('img')
        img.setAttribute('src', url);
        column.appendChild(img)
    }

}

document.body.addEventListener('click', (e) => {
    if (e.target.tagName === "IMG")
        chrome.downloads.download({ url: e.target.src }, () => { })
})