"use strict";

// 01 Function to make XHTML request.

function fetchJSON(url, cb) {

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status < 400) {
                cb(null, xhr.response);
            } else {
                cb(new Error(xhr.statusText));
            }
        }
    };
    xhr.send();
}

// 02 specify URL to get the JSON from.

const url = "https://api.github.com/orgs/HackYourFuture/repos?per_page=100";

// 03 checking for errors
function callback(error, data) {
    if (error !== null) {
        console.error(error);
    } else {
        renderRepositories(data);
    }
}

fetchJSON(url, callback);

// 04 Function to create and append HTML

function createAndAppend(tagname, parent) {
    const elem = document.createElement(tagname);
    parent.appendChild(elem);
    return elem;
}

// 05 Get name from specific repository

function renderSelect(data) {

    const select = document.getElementById("select");
    data.forEach(element => {
        const selectBox = createAndAppend("option", select);
        selectBox.setAttribute("value", element.url);
        selectBox.innerHTML = element.name;
    });

    select.addEventListener("change", event => {
        renderDescriptions(event.target.value);
        renderRepositories(event.target.value);
    });
}

//06 Getting select box rendered.
fetchJSON(url, (error, data) => {
    if (error !== null) {
        console.error(error.message);
    } else {
        renderSelect(data);
    }
});

//07 Rendering website HTML

function renderHTML() {
    const root = document.getElementById("root");
    const header = document.createElement("div");

    header.setAttribute("class", "header");
    root.appendChild(header);

    const tag = document.createElement("tag");
    tag.setAttribute("class", "select-tag");
    tag.textContent = "Select Repositories: ";
    header.appendChild(tag);

    const select = createAndAppend("select", tag);
    select.setAttribute("id", "select");

    const container = createAndAppend("div", root);
    container.setAttribute("id", "container");

    const description = createAndAppend("div", container);
    description.setAttribute("class", "descriptionContainer");

    const contributors = createAndAppend("div", container);
    contributors.setAttribute("id", "contributorsContainer");

    const ul = createAndAppend("ul", contributors);
    ul.setAttribute("id", "containerList");
    const table = createAndAppend("table", description);
    const tBody = createAndAppend("tBody", table);

}

renderHTML();

// 08 function to render database

function renderRepositories(data) {
    fetchJSON(data, (error, data2) => {
        if (error !== null) {
            console.error(error.message);
        } else {
            fetchJSON()
        }
    });
}

// Rendering Description

function renderDescriptions(data) {

    fetchJSON(data, (error, data2) => {
        if (error !== null) {
            console.error(error.message);
        } else {
            fetchJSON()
        }
    });
}

