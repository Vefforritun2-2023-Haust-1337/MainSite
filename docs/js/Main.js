"use strict"

const specialList = document.querySelector("#Specialists");
const specialRegi = document.querySelector("#Register");
const navbar = document.querySelector("#Navbar");
const taskList = document.querySelector("#Tasks");
const leaderboard = document.querySelector("#Board");

function creoDiv(klas = "",text = "")
{
    let elem;
    elem = document.createElement("div");
    if (!(klas == ""))
    {
        elem.className = klas;
    }
    if (!(text == ""))
    {
        elem.textContent = text;
    }
    return elem;
}

function creoHref(klas = "",text = "",href = "")
{
    let elem = document.createElement("a");
    elem.href = href;
    if (!(klas == ""))
    {
        elem.className = klas;
    }
    if (!(text == ""))
    {
        elem.textContent = text;
    }
    return elem;
}

function regoElem(children = [], paren)
{
    children.forEach(child =>{
        paren.appendChild(child);
    })
}

function creoNavBar()
{
    let navBarDiv = creoDiv("topnav");
    let hrefs = [
        creoHref("icon-home3","Heim","./MainIndex.html"),
        creoHref("icon-info","Um Okkur","./aboutMe.html"),
        creoHref("icon-user-tie","Sérfræðingar","./specialists.html"),
        creoHref("icon-bubble","Verkefni","https://vefforritun2-2023-haust-1337.github.io/MainSite/MainIndex.html")
    ]
    regoElem(hrefs,navBarDiv);
    navbar.appendChild(navBarDiv);
}

async function loadJson(file = "/data.json")
{
    let response = await fetch(file);
    if (response.status === 200)
    {
        console.log(response.status,"Json Status");
        console.log(response.statusText);
        return await response.json();
    }
    else
    {
        console.log(response.status,"Json Status");
        console.log(response.statusText);
    }
}

function startContent(data,key)
{
    let entries = [];
    data[key].forEach(elem =>{
        let entry = creoDiv("entry")
        let contentEntry = [
            creoDiv("id",elem["id"]),
            creoDiv("name",elem["name"]),
            creoDiv("specialty",elem["specialty"]),
            creoDiv("location",elem["location"]),
            creoDiv("email",elem["contact"]["email"]),
            creoDiv("phone",elem["contact"]["phone"])
        ];
        regoElem(contentEntry,entry);
        entries.push({
            data:elem,
            element:entry
        });
    })
    return entries;
}

async function creoDatalist(zone = creoDiv(),dataset = "specialists",data = "./data/Serfaedinga.json")
{
    let jsonData = await loadJson(data);
    let list = creoDiv("list");
    let entries = startContent(jsonData,dataset);
    entries.forEach(elem =>{
        list.appendChild(elem["element"])
    })
    zone.appendChild(list);
}

function register()
{
    let elems = [
        creoDiv("paragrah","Register as a specialist here."),
        creoHref("button","Register","./specialistsForm.html")];
    regoElem(elems,specialRegi);
}

if (navbar)
{
    creoNavBar();
}

if (specialList)
{
    creoDatalist(specialList);
}

if(specialRegi)
{
    register();
}

if (leaderboard)
{
    creoDatalist(leaderboard,"contracts");
}