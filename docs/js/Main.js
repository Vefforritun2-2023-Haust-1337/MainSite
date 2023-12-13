"use strict"
//Firbase code--------------------------------------------------------------------------------
  // Import the functions you need from the SDKs you need

  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

  import { getDatabase, ref, child, get, set} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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
const specialForm = document.querySelector("#specialform");


function creoElem(klas = "",text = "",imag = "",type = "",href = ""){
    let elem;
    if (!(type === ""))
    {
        elem = document.createElement("input");
        elem.type = type;
    }
    else if (!(href === ""))
    {
        elem = document.createElement("a");
        elem.href = href;
    }
    else 
    {
        elem = document.createElement("div");
    }
    if (!(klas === "")){
        elem.className = klas
    }
    if (!(text === "")){
        elem.textContent = text;
    }
    if (!(imag === "")){
        let photo = [document.createElement("img")];
        photo[0].src = imag;
        regoElem(photo,elem);
    }
    return elem
}
/*----------unused---------------
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
---------------------------------*/
function regoElem(children = [], paren)
{
    children.forEach(child =>{
        paren.appendChild(child);
    })
}

function creoNavBar()
{
    let navBarDiv = creoElem("topnav");
    let hrefs = [
        creoElem("icon-home3","Heim","","","./MainIndex.html"),
        creoElem("icon-info","Um Okkur","","","./aboutMe.html"),
        creoElem("icon-user-tie","Sérfræðingar","","","./specialists.html"),
        creoElem("icon-bubble","Verkefni","","","https://vefforritun2-2023-haust-1337.github.io/MainSite/MainIndex.html")
    ]
    regoElem(hrefs,navBarDiv);
    navbar.appendChild(navBarDiv);
}

/*----------unused---------------
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
---------------------------------*/
function startContent(data,dataset)
{
    let entries = [];
    data.forEach(elem =>{
        let entry = creoElem("entry")
        let contentEntry = [
            /*creoElem("id",elem["id"]),*/
            creoElem("name",elem["name"]),
            creoElem("specialty",elem["specialty"]),
            creoElem("location",elem["location"]),
            creoElem("email",elem["contact"]["email"]),
            creoElem("phone",elem["contact"]["phone"])
        ];
        regoElem(contentEntry,entry);
        entries.push({
            data:elem,
            element:entry
        });
    })
    return entries;
}

async function creoDatalist(zone = creoElem(),dataset = "specialists")
{   
    const dbRef = ref(getDatabase());
    get(child(dbRef, `${dataset}`)).then((snapshot) => {
      if (snapshot.exists()) {
        let jsonData = [];
        console.log("data read");
        snapshot.val().forEach(element => {
            jsonData.push(element);
        });
        let entries = startContent(jsonData,dataset);
        let list = creoElem("col-3");
        entries.forEach(elem =>{
            list.appendChild(elem["element"])
        })
        zone.appendChild(list);
      } 
      else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}

function register()
{
    let elems = [
        creoElem("paragrah","Register as a specialist here."),
        creoElem("button","Register","./specialistsForm.html")];
    regoElem(elems,specialRegi);
}

function writeData(dataset = "specialists",data = {})
{
    const db = getDatabase();
    set(ref(db, `${dataset}`), {
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  
}

function creoRegiform(zone = creoElem(),dataset = "specialists")
{
    let elem = creoElem("userinput");
    if (dataset = "specialists")
    {

    }
    else if (dataset = "contracts")
    {

    }
    zone.appendChild(elem);
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

if (specialForm)
{
    creoRegiform(specialForm);
}