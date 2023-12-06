"use strict"

import { creoDiv, creoHref, regoElem } from "./Functions"

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
}