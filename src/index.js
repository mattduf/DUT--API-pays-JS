import _ from 'lodash';
import "./style.css";

//Titre (h1) de la page
let pagetitle = document.createElement("h1");
pagetitle.innerHTML = "Les pays du monde et leur IDH"
document.body.appendChild(pagetitle);

let separation = document.createElement("hr");
document.body.appendChild(separation);

//Conteneur pour la liste des pays
let country_container = document.createElement("div");
country_container.className = "country_container";
document.body.appendChild(country_container);

//Requete XHR qui sollicite la premiere API
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://restcountries.eu/rest/v2/all", true);

//A l'execution de la requete
xhr.onload = function (e) {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let countries = JSON.parse(xhr.responseText);
        countries.forEach(function (country) {
            //Carte qui va contenir le drapeau et le nom du pays
            let card = document.createElement("div");
            card.className = "country_card";
            country_container.appendChild(card);

            //Recupere le drapeau et l'affiche
            let flag = document.createElement("img");
            flag.className = "flag";
            flag.src = country.flag;
            card.appendChild(flag);

            //Recupere le nom du pays et l'affiche
            let name = document.createElement("div");
            name.className = "country_name";
            name.innerHTML = country.name;
            card.appendChild(name);

            //Ajoute un filtre foncé pour la fenetre modale
            let modal_filter = document.createElement("div");
            modal_filter.className = "modal_filter";
            modal_filter.style.display = "none";
            country_container.appendChild(modal_filter);

            //Ajoute la fenetre modale qui va contenir les informations du pays
            let modal = document.createElement("div");
            modal.className = "country_modal";
            modal_filter.appendChild(modal);

            //Ajoute une croix pour fermer la fenetre modale
            let close_modal = document.createElement("div");
            close_modal.className = "close_modal";
            close_modal.innerHTML = 'x';
            modal.appendChild(close_modal);

            //Ajoute un titre (h2) pour la section des infos generales
            let title_infos = document.createElement("h2");
            title_infos.innerHTML = "Informations générales : " + country.name;
            modal.appendChild(title_infos);

            //Crée le tableau avec les informations
            let table = document.createElement('table');

            //Drapeau
            let trFlag = table.insertRow();
            let tdFlag = trFlag.insertCell();
            tdFlag.setAttribute('colSpan', '2');
            let flag2 = document.createElement("img");
            flag2.className = "flag flag2";
            flag2.src = country.flag;
            tdFlag.appendChild(flag2);
            tdFlag.style.textAlign = "center";

            //Infos géographiques
            let sectionGeo = table.insertRow();
            let titleGeo = sectionGeo.insertCell();
            titleGeo.setAttribute('colSpan', '2');
            titleGeo.className = "titre_section_table tGeo";
            titleGeo.appendChild(document.createTextNode('Géographie'));
            let trRegion = table.insertRow();
            let td1Region = trRegion.insertCell();
            td1Region.appendChild(document.createTextNode('Région'));
            let td2Region = trRegion.insertCell();
            td2Region.appendChild(document.createTextNode(country.region));
            let trSousRegion = table.insertRow();
            let td1SousRegion = trSousRegion.insertCell();
            td1SousRegion.appendChild(document.createTextNode('Sous-région'));
            let td2SousRegion = trSousRegion.insertCell();
            td2SousRegion.appendChild(document.createTextNode(country.subregion));
            let trFrontieres = table.insertRow();
            let td1Frontieres = trFrontieres.insertCell();
            td1Frontieres.appendChild(document.createTextNode('Frontières'));
            let td2Frontieres = trFrontieres.insertCell();
            let borders = JSON.stringify(country.borders);//Transforme l'objet en string pour permettre le retour à la ligne dans la cellule
            borders = borders.replace(/["\[\]]+/g, '');
            borders = borders.replace(/[,]+/g, ', ');
            if(borders === "") borders = "Aucune";
            td2Frontieres.appendChild(document.createTextNode(borders));
            let trSuperficie = table.insertRow();
            let td1Superficie = trSuperficie.insertCell();
            td1Superficie.appendChild(document.createTextNode('Superficie'));
            let td2Superficie = trSuperficie.insertCell();
            td2Superficie.appendChild(document.createTextNode(country.area + " km²"));
            let trFuseaux = table.insertRow();
            let td1Fuseaux = trFuseaux.insertCell();
            td1Fuseaux.appendChild(document.createTextNode('Fuseaux horaires'));
            let td2Fuseaux = trFuseaux.insertCell();
            let fuseaux = JSON.stringify(country.timezones);//Transforme l'objet en string pour permettre le retour à la ligne dans la cellule
            fuseaux = fuseaux.replace(/["\[\]]+/g, '');
            fuseaux = fuseaux.replace(/[,]+/g, ', ');
            td2Fuseaux.appendChild(document.createTextNode(fuseaux));
            let trLatLng = table.insertRow();
            let td1LatLng = trLatLng.insertCell();
            td1LatLng.appendChild(document.createTextNode('Latitude/Longitude'));
            let td2LatLng = trLatLng.insertCell();
            td2LatLng.appendChild(document.createTextNode(country.latlng[0] + ", " + country.latlng[1]));
            td2LatLng.style.paddingBottom = "20px";

            //Infos démographiques
            let sectionDemo = table.insertRow();
            let titleDemo = sectionDemo.insertCell();
            titleDemo.setAttribute('colSpan', '2');
            titleDemo.className = "titre_section_table tDemo";
            titleDemo.appendChild(document.createTextNode('Démographie'));
            let trPopu = table.insertRow();
            let td1Popu = trPopu.insertCell();
            td1Popu.appendChild(document.createTextNode('Population'));
            let td2Popu = trPopu.insertCell();
            td2Popu.appendChild(document.createTextNode(country.population + " habs."));
            let trGentile = table.insertRow();
            let td1Gentile = trGentile.insertCell();
            td1Gentile.appendChild(document.createTextNode('Gentilé'));
            let td2Gentile = trGentile.insertCell();
            td2Gentile.appendChild(document.createTextNode(country.demonym));
            td2Gentile.style.paddingBottom = "20px";

            //Infos administration
            let sectionAdmin = table.insertRow();
            let titleAdmin = sectionAdmin.insertCell();
            titleAdmin.setAttribute('colSpan', '2');
            titleAdmin.className = "titre_section_table tAdmin";
            titleAdmin.appendChild(document.createTextNode('Administration'));
            let trCapitale = table.insertRow();
            let td1Capitale = trCapitale.insertCell();
            td1Capitale.appendChild(document.createTextNode('Capitale'));
            let td2Capitale = trCapitale.insertCell();
            td2Capitale.appendChild(document.createTextNode(country.capital));
            let trLang = table.insertRow();
            let td1Lang = trLang.insertCell();
            td1Lang.appendChild(document.createTextNode('Langue(s)'));
            let td2Lang = trLang.insertCell();
            for (let i = 0; i < country.languages.length; i++) {
                if(i === country.languages.length - 1)
                    td2Lang.appendChild(document.createTextNode(country.languages[i].name));
                else
                    td2Lang.appendChild(document.createTextNode(country.languages[i].name + ", "));
            }
            let trMonnaie = table.insertRow();
            let td1Monnaie = trMonnaie.insertCell();
            td1Monnaie.appendChild(document.createTextNode('Monnaie(s)'));
            let td2Monnaie = trMonnaie.insertCell();
            for (let i = 0; i < country.currencies.length; i++) {
                if(i === country.currencies.length - 1)
                    td2Monnaie.appendChild(document.createTextNode(country.currencies[i].name + " (" + country.currencies[i].symbol + ")"));
                else
                    td2Monnaie.appendChild(document.createTextNode(country.currencies[i].name + " (" + country.currencies[i].symbol + "), "));
            }
            let trBloc = table.insertRow();
            let td1Bloc = trBloc.insertCell();
            td1Bloc.appendChild(document.createTextNode('Bloc régional'));
            let td2Bloc = trBloc.insertCell();
            if(country.regionalBlocs.length === 0)
                td2Bloc.appendChild(document.createTextNode("Aucun"));
            else
            {
                for (let i = 0; i < country.regionalBlocs.length; i++) {
                    if (i === country.regionalBlocs.length - 1)
                        td2Bloc.appendChild(document.createTextNode(country.regionalBlocs[i].name));
                    else
                        td2Bloc.appendChild(document.createTextNode(country.regionalBlocs[i].name + ", "));
                }
            }
            td2Bloc.style.paddingBottom = "20px";

            //Infos diverses
            let sectionDivers = table.insertRow();
            let titleDivers = sectionDivers.insertCell();
            titleDivers.setAttribute('colSpan', '2');
            titleDivers.className = "titre_section_table tDivers";
            titleDivers.appendChild(document.createTextNode('Divers'));
            let trAlpha2 = table.insertRow();
            let td1Alpha2 = trAlpha2.insertCell();
            td1Alpha2.appendChild(document.createTextNode('Code Alpha-2'));
            let td2Alpha2 = trAlpha2.insertCell();
            td2Alpha2.appendChild(document.createTextNode(country.alpha2Code));
            let trAlpha3 = table.insertRow();
            let td1Alpha3 = trAlpha3.insertCell();
            td1Alpha3.appendChild(document.createTextNode('Code Alpha-3'));
            let td2Alpha3 = trAlpha3.insertCell();
            td2Alpha3.appendChild(document.createTextNode(country.alpha3Code));
            let trDomaine = table.insertRow();
            let td1Domaine = trDomaine.insertCell();
            td1Domaine.appendChild(document.createTextNode('Domaine Internet'));
            let td2Domaine = trDomaine.insertCell();
            td2Domaine.appendChild(document.createTextNode(country.topLevelDomain));
            let trTel = table.insertRow();
            let td1Tel = trTel.insertCell();
            td1Tel.appendChild(document.createTextNode('Indicatif téléphonique'));
            let td2Tel = trTel.insertCell();
            if(country.callingCodes.length === 0)
                td2Tel.appendChild(document.createTextNode("Aucun"));
            else
            {
                for (let i = 0; i < country.callingCodes.length; i++) {
                    if (i === country.callingCodes.length - 1)
                        td2Tel.appendChild(document.createTextNode("+" + country.callingCodes[i]));
                    else
                        td2Tel.appendChild(document.createTextNode("+" + country.callingCodes[i] + ", "));
                }
            }
            td1Tel.style.paddingBottom = "20px";

            //Ajoute le tableau final
            modal.appendChild(table);

            //Ajoute un titre (h2) pour la section des infos generales
            let title_idh = document.createElement("h2");
            title_idh.innerHTML = "Indice de Développement Humain";
            title_idh.style.marginTop = "50px";
            modal.appendChild(title_idh);

            //Paragraphe s'il n'y a aucun idh
            let no_idh = document.createElement("p");
            no_idh.innerHTML = "Aucune donnée.";
            no_idh.className = "no_idh"
            modal.appendChild(no_idh);

            //----- Evenements -----
            /*
            / Au clic sur une carte :
            / la boite modale correspondante est affichee,
            / on empeche l'utilisateur de faire defiler la page
            */
            card.addEventListener("click",function () {
                let modals = document.getElementsByClassName("modal_filter");
                for (let i = 0; i < modals.length; i++) {
                    modals[i].style.display = "none";
                }
                modal_filter.style.display = "flex";
                document.body.id = "prevent_scrolling";
            }, false)

            //Ferme la modale au clic sur la croix
            close_modal.addEventListener("click",function () {
                modal_filter.style.display = "none";
                document.body.id = "";
            }, false)

            //Ferme la modale au clic en dehors
            modal_filter.onclick = function(event) {
                if (event.target == modal_filter) {
                    modal_filter.style.display = "none";
                    document.body.id = "";
                }
            }

            //Requete XHR qui sollicite la premiere API
            var xhr2 = new XMLHttpRequest();
            xhr2.open("GET", "http://ec2-54-174-131-205.compute-1.amazonaws.com/API/HDRO_API.php/indicator_id=137506", true);

            //A l'execution de la requete
            xhr2.onload = function (e) {
                if (xhr2.readyState === 4 && xhr2.status === 200) {
                    let code = country.alpha3Code;
                    let Id="137506";
                    Object.keys(JSON.parse(xhr2.responseText).indicator_value[code][Id]).forEach(function(year){
                        //console.log(year+" : "+JSON.parse(xhr2.responseText).indicator_value[code][Id][year]);

                        no_idh.remove();
                        let test2 = document.createElement("p");
                        if(JSON.parse(xhr2.responseText).indicator_value[code][Id][year] > 0.600) test2.style.color = "green";
                        test2.innerHTML = year+" : "+JSON.parse(xhr2.responseText).indicator_value[code][Id][year];

                        modal.appendChild(test2);

                    });
                }
            };
            xhr2.send();

        });



    }
};
xhr.send();






