# DUT--API-pays-JS
Dans le cadre du module M4103ip, nous devons développer une application client-riche. Nous avons choisi de réaliser une application présentant des informations sur les pays du monde entier avec des données sur leur IDH.

## APIs utilisées
- Informations générales sur les pays : https://restcountries.eu/rest/v2/all
- Informations sur l’IDH des pays en fonction de chaque année : http://ec2-54-174-131-205.compute-1.amazonaws.com/API/HDRO_API.php/indicator_id=137506

## Compiler le projet
*Prérequis : avoir NodeJS d'installé*
1. Télécharger l'archive du projet
2. Ouvrir un terminal dans la racine du dossier du projet (cela peut être un terminal intégré à un IDE) et taper les commandes suivantes :
    - `npm install --save-dev webpack-dev-server`
    - `npm install --save-dev html-webpack-plugin`
    - `npm install --save-dev clean-webpack-plugin`
    - puis `npm run start`
→ Une page doit alors s'ouvrir dans le navigateur.

**ATTENTION : il est impossible d’interagir avec la deuxième API en localhost.** Pour contourner ce problème il faut installer et activer une extension de type CORS Changer (par exemple l’extension Moesif Origin & CORS Changer sur chrome).

## Présentation du projet
Les données des deux APIs sont récupérées au moyen de deux requêtes XHR, la deuxième étant dépendante de la première. En effet, nous récupérons dans un premier temps les informations générales des pays, puis nous récupérons les données de l’IDH associé au pays correspondant. 250 pays sont listés. Il faut cliquer sur un pays pour afficher ses informations.
