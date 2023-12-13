"use strict"
//Firbase code--------------------------------------------------------------------------------
  // Import the functions you need from the SDKs you need

  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

  import { getDatabase, ref, child, get , onValue} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

  // TODO: Add SDKs for Firebase products that you want to use

  // https://firebase.google.com/docs/web/setup#available-libraries


  // Your web app's Firebase configuration

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  const firebaseConfig = {

    apiKey: "AIzaSyATLLQ3hG2ukKrzemVdo6XZCiShXkiz6R4",

    authDomain: "orange-93398.firebaseapp.com",

    databaseURL: "https://orange-93398-default-rtdb.europe-west1.firebasedatabase.app",

    projectId: "orange-93398",

    storageBucket: "orange-93398.appspot.com",

    messagingSenderId: "989680356844",

    appId: "1:989680356844:web:97a591c7772be51a0704c9",

    measurementId: "G-7KS3MVSDG0"

  };


  // Initialize Firebase

  const app = initializeApp(firebaseConfig);

  const data = getDatabase(app);
//--------------------------------------------------------------------
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

function startContent(data)
{
    let entries = [];
    console.log(data);
    data.forEach(elem =>{
        console.log(elem);
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

async function creoDatalist(zone = creoDiv(),dataset = "specialists")
{   
    let jsonData = [];
    const dbRef = ref(getDatabase());
    get(child(dbRef, `${dataset}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log("data read");
        snapshot.val().forEach(element => {
            jsonData.push(element);
        });
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
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