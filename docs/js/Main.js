"use strict"

const specialList = document.querySelector("#Specialists");

//import { creoDiv, creoHref, regoElem } from "./Functions"
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
    let elem;
    elem = document.createElement("a");
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
    let navBarDiv = creoDiv("navbar");
    let hrefs = [
        creoHref("navbutton","Heim","https://vefforritun2-2023-haust-1337.github.io/MainSite/MainIndex.html"),
        creoHref("navbutton","Um Okkur","https://vefforritun2-2023-haust-1337.github.io/MainSite/MainIndex.html"),
        creoHref("navbutton","Sérfræðingar","https://vefforritun2-2023-haust-1337.github.io/MainSite/MainIndex.html"),
        creoHref("navbutton","Verkefni","https://vefforritun2-2023-haust-1337.github.io/MainSite/MainIndex.html")
    ]
    regoElem(hrefs,navBarDiv);
    return navBarDiv;
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

async function init(data = "/docs/data/Serfaedinga.json")
{
    let jsonData = await loadJson(data);
    let list = creoDiv("list");
    let entries = startContent(jsonData,"specialists");
    entries.forEach(elem =>{
        list.appendChild(elem["element"])
    })
    specialList.appendChild(list);
}

if (specialList)
{
    init();
}