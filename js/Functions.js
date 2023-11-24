"use strict"

export function creoDiv(klas = "",text = "")
{
    let elem
    elem = document.createElement("div")
    if (!(klas == ""))
    {
        elem.className = klas
    }
    if (!(text == ""))
    {
        elem.textContent = text
    }
    return elem
}

export function creoHref(klas = "",text = "",href = "")
{
    let elem
    elem = document.createElement("a")
    elem.href = href
    if (!(klas == ""))
    {
        elem.className = klas
    }
    if (!(text == ""))
    {
        elem.textContent = text
    }
    return elem
}

export function regoElem(children = [], paren)
{
    children.forEach(child =>{
        paren.appendchild(child)
    })
}