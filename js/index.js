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
        <p class="Datum">Datum: ${elem.publicationDate}</p>
        <a href="${elem.linkTo}" target="_blank" class="btn btn-outline-primary btn-sm" style='float:left'>Lees meer</a>
        <i class="fa fa-heart fa-lg" aria-hidden="true" onclick="like('${elem.UUID}')"></i> ${elem.likes}
        </div>
        </div>`;
    });
    document.getElementById('html').innerHTML = html;
}

function like(id) {
    axios.post('https://thecrew.cc/news/create.php', {
        UUID: id,
    })
        .then(function (response) {
            getData();
        });
}

function search() {
    let txt = document.getElementById('txt').value;
    txt = txt.toLowerCase().toString();
    axios.get('https://thecrew.cc/news/read.php')
        .then(function (response) {
            let data = response.data.news;
            let filtered = data.filter(x => x.title.toLowerCase().includes(txt) || x.content.toLowerCase().includes(txt));
            load(filtered);
        });
}

function sort() {
    axios.get('https://thecrew.cc/news/read.php')
        .then(function (response) {
            let data = response.data.news;
            data = data.sort((a, b) => b.likes - a.likes);
            load(data);
        })
}