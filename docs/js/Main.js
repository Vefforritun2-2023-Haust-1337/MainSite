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
const taskSubmit = document.querySelector("#Contract");
const leaderboard = document.querySelector("#Board");
const specialForm = document.querySelector("#specialform");
const taskForm = document.querySelector("#verkform")


function creoElem(klas = "",text = "",imag = "",href = ""){
    let elem;
    if (!(href === ""))
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
function creoForm(klas="",id="")
{
    let elem = document.createElement("form");
    elem.className = klas;
    elem.id = id;
    return elem;
}
function creoSmall(klas="",id="")
{
    let smallElem = document.createElement("small");
    smallElem.className = klas;
    smallElem.id = id;
    return smallElem;
}
function creoInput(klas="",id="",type="",message="",title="")
{
    let fieldElem = document.createElement("div");
    let inputElem = document.createElement("input");
    inputElem.className = klas;
    inputElem.id = id;
    inputElem.type = type;
    inputElem.placeholder = message;
    let titleElem = document.createElement("div");
    titleElem.className = `${klas}Title`;
    titleElem.className = `${id}Title`;
    titleElem.textContent = title;
    regoElem([titleElem,inputElem],fieldElem);
    fieldElem.id = `${id}Field`;
    return fieldElem;
}
function creoNavBar()
{
    let navBarDiv = creoElem("topnav");
    let hrefs = [
        creoElem("icon-home3","Heim","","./MainIndex.html"),
        creoElem("icon-info","Um Okkur","","./aboutMe.html"),
        creoElem("icon-user-tie","Sérfræðingar","","./specialists.html"),
        creoElem("icon-bubble","Verkefni","","./verkefni.html")
    ]
    regoElem(hrefs,navBarDiv);
    navbar.appendChild(navBarDiv);
}
function creoTextArea(klas="",id="",message="",title="")
{
    let fieldElem = document.createElement("div");
    let inputElem = document.createElement("textarea");
    inputElem.className = klas;
    inputElem.id = id;
    inputElem.placeholder = message;
    inputElem.rows = 10;
    inputElem.cols = 22;
    inputElem.wrap = "hard";
    let titleElem = document.createElement("div");
    titleElem.className = `${klas}Title`;
    titleElem.className = `${id}Title`;
    titleElem.textContent = title;
    regoElem([titleElem,inputElem],fieldElem);
    fieldElem.id = `${id}Field`;
    return fieldElem;
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
        let contentEntry;
        if (dataset === "specialists")
        {
            contentEntry = [
                /*creoElem("id",elem["id"]),*/
                creoElem("name",elem["name"]),
                creoElem("specialty",elem["specialty"]),
                creoElem("location",elem["location"]),
                creoElem("email",elem["contact"]["email"]),
                creoElem("phone",elem["contact"]["phone"])
            ];
        }
        else 
        {
            contentEntry = [
                creoElem("jobTitle",elem["job_title"]),
                creoElem("desc",elem["description"]),
                creoElem("locale",elem["location"]),
                creoElem("duration",elem["duration"]),
                creoElem("pay",elem["payment"]),
                creoElem("avail",elem["specialist_id"] == 0 ? `Open Position`:`Already Fufilled`)
            ];
        }
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

function Register(paren,href)
{
    let elems = [
        creoElem("paragrah",paren == specialForm ? `Register as a Specilist here` : `Submit a contract here`),
        creoElem("button-49",paren == specialForm ? `Register`:`Submit`,"",`${href}`)];
    elems[1].role = "button";
    regoElem(elems,paren);
}

function writeData(data = {},dataset = "specialists")
{
    const db = getDatabase();
    const dbref = ref(getDatabase());
    console.log("writeData.exe");
    let id;
    get(child(dbref, `${dataset}`)).then((snapshot) => {
        console.log("start read")
        if (snapshot.exists()) {
            id = snapshot.val()["length"]+1;
            console.log(id)
            if (dataset === "specialists"){
                set(ref(db, `${dataset}/${id-1}`), {
                    name: data["name"],
                    contact: { 
                        email: data["contact"]["email"],
                        phone: data["contact"]["phone"]},
                    id: id,
                    location: data["location"],
                    specialty: data["specialty"]
                });
            }
            else if (dataset === "contracts"){
                set(ref(db, `${dataset}/${id-1}`), {
                    description: data["description"],
                    duration: data["duration"],
                    id: id,
                    job_title: data["job_title"],
                    location: data["location"],
                    payment: data["payment"],
                    specialist_id: 0
                });
            }
        }
        else {
          console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
  
}

function showMessage(input, message, type) {
	// get the small element and set the message
	const msg = input.parentNode.querySelector("small");
	msg.innerText = message;
    msg.className = type ? "" : "redtext";
	// update the class for the input
	input.className = type ? "succes" : "error";
	return type;
}

function showError(input, message) {
	return showMessage(input, message, false);
}

function showSuccess(input) {
	return showMessage(input, "", true);
}

function validateEmail(input, requiredMsg, invalidMsg) {
	// check if the value is not empty
	if (!hasValue(input, requiredMsg)) {
		return false;
	}
	// validate email format
	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const email = input.value.trim();
	if (!emailRegex.test(email)) {
		return showError(input, invalidMsg);
	}
	return true;
}

function validatePhone(input, requiredMsg, invalidMsg) {
	// check if the value is not empty
	if (!hasValue(input, requiredMsg)) {
		return false;
	}
    
    const phoneRegex =
        /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    
    const phone = input.value.trim();
    if (!(phoneRegex.test(phone))) {
        return showError(input, invalidMsg)
    }
    return true;
}

function hasValue(input, message) {
	if (input.value.trim() === "") {
		return showError(input, message);
	}
	return showSuccess(input);
}

function intellegoForm(formID = "",form)
{
    return form.elements[formID].value;
}

function creoRegiform(zone = creoElem(),dataset = "specialists")
{
    let elem = creoForm("specialRegi","form");
    if (dataset === "specialists")
    {
        //name
        let field = creoInput("defaultInput","nameInput","text","Please enter name","Name");
        field.appendChild(creoSmall("","message"));
        elem.appendChild(field);

        //speciality
        field = creoInput("defaultInput","specialInput","text","Please enter speciality","Speciality");
        field.appendChild(creoSmall("","message"));
        elem.appendChild(field);

        //location
        field = creoInput("defaultInput","localeInput","text","Please enter location","Location");
        field.appendChild(creoSmall("","message"));
        elem.appendChild(field);

        //email
        field = creoInput("defaultInput","emailInput","email","Please enter email","Email");
        field.appendChild(creoSmall("","message"));
        elem.appendChild(field);

        //phonenumber
        field = creoInput("defaultInput","telInput","tel","Please enter phone","Phone Number");
        field.appendChild(creoSmall("","message"));
        elem.appendChild(field);

        //submit
        field = creoInput("Submit","Submit","submit","","");
        elem.appendChild(field);
    }
    else if (dataset === "contracts")
    {
        //name
        let field = creoInput("defaultInput","jTitleInput","text","Please enter Job Title","Job Title");
        field.appendChild(creoSmall("","message"));
        elem.appendChild(field);

        //speciality
        field = creoInput("defaultInput","timeInput","text","Please enter Duration","Duration");
        field.appendChild(creoSmall("","message"));
        elem.appendChild(field);

        //location
        field = creoInput("defaultInput","localeInput","text","Please enter location","Location");
        field.appendChild(creoSmall("","message"));
        elem.appendChild(field);

        //email
        field = creoInput("defaultInput","payInput","text","Please enter the Reward","Reward");
        field.appendChild(creoSmall("","message"));
        elem.appendChild(field);

        //phonenumber
        field = creoTextArea("defaultInput","descInput","Please enter futher information regarding the job","Description");
        field.appendChild(creoSmall("","message"));
        elem.appendChild(field);

        //submit
        field = creoInput("Submit","Submit","submit","","");
        elem.appendChild(field);

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
    Register(specialRegi,"./specialistsForm.html");
}

if (specialForm)
{
    creoRegiform(specialForm);
    const form = document.querySelector("#form");

    const FIELD_REQUIRED = "This field cannot be empty";
    const PHONE_INVALID = "Please enter a correct phone number";
    const EMAIL_INVALID = "Please enter a correct email address format";

    form.addEventListener("submit",function (eve) {
        eve.preventDefault();
        console.log("Submitted",eve);
        console.log(form,form.elements);

        let inputFields = [];
        for (let index = 0; index < form.elements['length']-1; index++)
        {
            inputFields.push(form.elements[index]);
        }

        let emptyField = true;
        inputFields.forEach(elem => {
            emptyField = hasValue(elem, FIELD_REQUIRED);
        });
        let validPhone = validatePhone(form.elements['telInput'],FIELD_REQUIRED,PHONE_INVALID);
        let validEmail = validateEmail(form.elements['emailInput'],FIELD_REQUIRED,EMAIL_INVALID);

        if (emptyField && validPhone && validEmail)
        {
            let entry = {
                "contact": {
                    "email": intellegoForm("emailInput",form),
                    "phone": intellegoForm("telInput",form)
                },
                "location": intellegoForm("localeInput",form),
                "name": intellegoForm("nameInput",form),
                "specialty": intellegoForm("specialInput",form)
            }
            console.log(entry);
            writeData(entry);
        };
    });
}

if (leaderboard)
{
    creoDatalist(leaderboard,"contracts");
}

if(taskSubmit)
{
    Register(taskSubmit,"./verkefniFrom.html");
}

if (taskForm)
{
    creoRegiform(taskForm,"contracts");
    const form = document.querySelector("#form");

    const FIELD_REQUIRED = "This field cannot be empty";

    form.addEventListener("submit",function (eve) {
        eve.preventDefault();
        console.log("Submitted",eve);
        console.log(form,form.elements);

        let inputFields = [];
        for (let index = 0; index < form.elements['length']-1; index++)
        {
            inputFields.push(form.elements[index]);
        }

        let emptyField = true;
        inputFields.forEach(elem => {
            emptyField = hasValue(elem, FIELD_REQUIRED);
        });

        if (emptyField)
        {
            let entry = {
                "description": intellegoForm("descInput",form),
                "duration": intellegoForm("timeInput",form),
                "job_title": intellegoForm("jTitleInput",form),
                "location": intellegoForm("localeInput",form),
                "payment": intellegoForm("payInput",form)
            }
            console.log(entry);
            writeData(entry,"contracts");
        };
    });
}