import "./style.css";
import roboto from "./font/Roboto-Light.ttf";
import {countries} from "./countries.js";

let countriesContent = new countries();
countriesContent.displayCountries();

//police
let police = document.createElement('style');
police.innerHTML = "@font-face {font-family: 'Roboto'; src: url('" + roboto + "') format('woff2');}";
document.body.appendChild(police);