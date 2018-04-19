'use strict';

const hyfUrl = "https://api.github.com/orgs/HackYourFuture/repos?per_page=100";

function fetchJSON(url) {

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);

        xhr.responseType = "json";
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status < 400) {
                    resolve(xhr.response);
                } else {
                    reject(new Error(`Network Error: ${xhr.statusText} - ${xhr.status}`));
                }
            }
        };
        xhr.send();
    });
}

// 04 Function to create and append HTML

function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.keys(options).forEach(key => {
        const value = options[key];
        if (key === 'html') {
            elem.innerHTML = value;
        } else {
            elem.setAttribute(key, value);
        }
    });
    return elem;
}

function renderError(err) {
    const container = document.getElementById('container');
    container.innerHTML = '';
    createAndAppend('h1', container, { html: err.message });
}
// 05 Get name from specific repository

function renderSelect(repositories) {

    const select = document.getElementById("select");

    repositories.forEach((repository, index) => {
        const selectBoxOptions = createAndAppend("option", select);
        selectBoxOptions.setAttribute("value", index);
        selectBoxOptions.innerHTML = repository.name;
    });

    select.addEventListener("change", () => {
        renderRepository(repositories[select.value]);
    });
    renderRepository(repositories[select.value]);
}

//07 Rendering website HTML

function renderFixedHeader() {
    const root = document.getElementById("root");
    const header = document.createElement("div");

    header.setAttribute("class", "header");
    root.appendChild(header);

    const label = document.createElement("span");
    label.setAttribute("class", "select-label");
    label.textContent = "Select Repositories: ";
    header.appendChild(label);

    const select = createAndAppend("select", header);
    select.setAttribute("id", "select");

    const container = createAndAppend("div", root);
    container.setAttribute("id", "container");

    const descriptionContainer = createAndAppend("div", container);
    descriptionContainer.setAttribute("id", "descriptionContainer");

    const contributorsContainer = createAndAppend("div", container);

    const ul = createAndAppend("ul", contributorsContainer);
    ul.setAttribute("id", "contributorsContainer");

    const table = createAndAppend("table", descriptionContainer);

    const tBody = createAndAppend("tbody", table);
    tBody.setAttribute("id", "tBody");
}


// 08 function to render database

async function renderRepository(repo) {
    try {
        const tBody = document.getElementById("tBody");
        tBody.innerHTML = "";

        const tr1 = createAndAppend("tr", tBody);
        const td1 = createAndAppend("td", tr1);
        td1.innerHTML = "Repository:";
        const td2 = createAndAppend("td", tr1);
        td2.innerHTML = repo.name;

        const tr2 = createAndAppend("tr", tBody);
        const td3 = createAndAppend("td", tr2);
        td3.innerHTML = "Description:";
        const td4 = createAndAppend("td", tr2);
        td4.innerHTML = repo.description;

        const tr3 = createAndAppend("tr", tBody);
        const td5 = createAndAppend("td", tr3);
        td5.innerHTML = "Forks:";
        const td6 = createAndAppend("td", tr3);
        td6.innerHTML = repo.forks;

        const tr4 = createAndAppend("tr", tBody);
        const td7 = createAndAppend("td", tr4);
        td7.innerHTML = "Updated:";
        const td8 = createAndAppend("td", tr4);
        td8.innerHTML = repo.updated_at;

        const contributors = await fetchJSON(repo.contributors_url);

        const ul = document.getElementById("contributorsContainer");
        ul.innerHTML = "";
        contributors.forEach(contributor => {
            const li = createAndAppend("li", ul);
            const img = createAndAppend("img", li);
            img.setAttribute("src", contributor.avatar_url);
            const p1 = createAndAppend("p", li);
            p1.innerHTML = contributor.login;
            const p2 = createAndAppend("p", li);
            p2.innerHTML = contributor.contributions;
        });
    }
    catch (error) {
        renderError(error);
    }
}


async function main() {
    try {
        renderFixedHeader();

        //06 Getting select box rendered.
        const data = await fetchJSON(hyfUrl);
        renderSelect(data);
    }
    catch (err) {
        renderError(err);
    }
}

window.onload = main;
