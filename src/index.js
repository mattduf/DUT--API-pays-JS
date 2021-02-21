import "./style.css";
import roboto from "./font/Roboto-Light.ttf";
import {countries} from "./countries.js";

//Appelle la méthode countries
let countriesContent = new countries();
countriesContent.displayCountries();

//police
let police = document.createElement('style');
police.innerHTML = "@font-face {font-family: 'Roboto'; src: url('" + roboto + "') format('woff2');}";
document.body.appendChild(police);

//FOOTER
let footer = document.createElement("footer");
document.body.appendChild(footer);

let divAuteurs = document.createElement("div");
divAuteurs.innerHTML = "© Copyright Anouar AMIMRI & Mattéo DUFOUR";
footer.appendChild(divAuteurs);