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
        <div class="card-body">
        <h5 class="card-title ml-0">${elem.title}</h5>
        <p class="card-text">${elem.content.split('</p>')[0].replace('<p>', "").replace('</p>', "").replace('<strong>', "").replace('</strong>', "").replace('<h4>', "").replace('</h4>', "").replace('<strong>', "").replace('</strong>', "").replace('<strong>', "").replace('</strong>', "")}</p>
    </div>
        </div>`;
    });
    document.getElementById('html').innerHTML = html;
}