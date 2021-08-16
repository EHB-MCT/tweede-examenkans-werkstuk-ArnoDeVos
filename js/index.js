"use strict";

getData();

function getData() {
    axios.get('https://thecrew.cc/news/read.php')
        .then(function (response) {
            let data = response.data.news;
            load(data);
        });
}

function load(data) {
    let html = "";
    data.forEach(elem => {
        html += `<div class="card m-2" style="width: 18rem; float:left; padding:5px">
        <img class="card-img-top" src="${elem.imageURI}" alt="Card image cap" />
        </div>`;
    });
    document.getElementById('html').innerHTML = html;
}