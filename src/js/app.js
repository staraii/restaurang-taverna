import db from "./db.js";
// --------- Header/Nav/Meny ------------

// Menyknapp - hamburgermeny
const menuButton = document.querySelector(".menu-button");



// Dropdownmenyn
const menuDropdown = document.querySelector("menu");

// A - nodlista över länkar i dropdownmenyn
const linksMenu = document.querySelectorAll(".a-menu");

// Sections - nodlista, containrar för de olika sidornas innehåll t.ex. hem, meny mm.
const sectionContent = document.querySelectorAll(".section-content");

// Article - produktkort/maträtt på första sidan
const articleDagens = document.querySelectorAll(".article-dagens");
// Article - produktkort/maträtt på meny sidan
const articleMeny = document.querySelectorAll(".article-meny");
// Button - lägg till knapp på första sidan
const buttonArticleAddDagens = document.querySelectorAll(".button-article-add-dagens");
// Button - lägg till knapp på meny sidan
const buttonArticleAddMeny = document.querySelectorAll(".button-article-add-meny");
// Footer -
const footer = document.querySelector("footer");
// Button - expanderar footern
const buttonFooterOpener = document.querySelector(".button-footer-opener");

// Hindrar att användaren klickar på flera artiklar samtidigt.
let toggleLock = false;

// ----------------------------- FUNKTIONER -------------------------------------

// Funktion - lägger till eventlisteners på länkarna i menyn.

function setDropdownMenu() {
  // Sätter eventlisteners på menyn
  for (let i = 0; i < linksMenu.length; i++) {
    linksMenu[i].addEventListener("click", () => {
      for (let j = 0; j < linksMenu.length; j++) {
        if (linksMenu[i] === linksMenu[j]) {
          // Visar vald sida i main
          sectionContent[j].classList.remove("hide");
        } else if (linksMenu[i] === linksMenu[j]) {
          // Döljer övriga sidor
          sectionContent[j].classList.remove("hide");
        } else {
          sectionContent[j].classList.add("hide");
        }
      }
      //Stänger menyn
      menuDropdown.classList.toggle("menu-open");
      // Ta bort klassen "footer-open" från <footer> om den är satt
      let footer = document.querySelector(".footer-open");
      if (footer) {
        footer.classList.remove("footer-open");
        buttonFooterOpener.innerText = "Se beställning";
        buttonFooterOpener.style.backgroundColor = "#2C4251";
        buttonFooterOpener.style.color = "#FFCB47";
      }
    });
  }

  //Stänger dropdown meny om man klickar utanför
  document.addEventListener("click", (event) => {
    const isMenuClicked =
      menuButton.contains(event.target) || menuDropdown.contains(event.target);

    // Kolla om klicket var utanför menyn och knappen
    if (!isMenuClicked) {
      // Stäng menyn genom att ta bort "menu-open" klassen
      menuDropdown.classList.remove("menu-open");
    }
  });

  //Stänger dropdown meny om man scrollar
  document.querySelector("main").addEventListener("scroll", () => {
    // Stäng menyn genom att ta bort "menu-open" klassen
    menuDropdown.classList.remove("menu-open");
  });
}

// Funktion - gör menyobjekten klickbara och expanderar lägg till knappen

function setArticlesDish(article, buttonAdd) {
  for (let i = 0; i < article.length; i++) {
    buttonAdd[i].addEventListener("click", () => {
      footer.classList.toggle("footer-added");
      setTimeout(() => {
        footer.classList.toggle("footer-added");
      }, 1000);
    });

    article[i].addEventListener("click", () => {
      if (!toggleLock) {
        toggleLock = true;

        if (!buttonAdd[i].textContent) {
          buttonAdd[i].classList.toggle("button-article-add-open");
          setTimeout(() => {
            buttonAdd[i].textContent = "Lägg till +";
            toggleLock = false;
          }, 1000);
        } else {
          buttonAdd[i].textContent = "";
          buttonAdd[i].classList.toggle("button-article-add-open");
          setTimeout(() => {
            toggleLock = false;
          }, 1000);
        }
      }
      return;
    });
  }
}

// Funktion - Gör menyknappen(hamburgermenyn) & "Se beställning"-knappen(expanderar footern) klickbara

function menuAndFooterOpeners() {
  // Gör menyknappen klickbar
  menuButton.addEventListener("click", () => {
    menuDropdown.classList.toggle("menu-open");
  });

  // Gör "se beställning"-knappen klickbar
  buttonFooterOpener.addEventListener("click", () => {
    if (buttonFooterOpener.innerText === "Se beställning") {
      footer.classList.add("footer-open");
      document.querySelector("header").classList.remove("hide-header");
      setTimeout(() => {
        buttonFooterOpener.innerText = "Tillbaka";
        buttonFooterOpener.style.backgroundColor = "#f04245";
        buttonFooterOpener.style.color = "#0a0a0a";
      }, 1000);
    } else {
      footer.classList.remove("footer-open");

      setTimeout(() => {
        buttonFooterOpener.innerText = "Se beställning";
        buttonFooterOpener.style.backgroundColor = "#0a0a0a";
        buttonFooterOpener.style.color = "#f04245";
      }, 1000);
    }
  });
}

setDropdownMenu();

menuAndFooterOpeners();

// filter meny och hämta produkt från databasen

// Hämta referenser till DOM-element
const buttonMenuFilters = document.querySelectorAll(".button-menu-filter");
const liSubmenuFilter = document.querySelectorAll(".li-submenu-filter");
const sectionMenuCat = document.querySelectorAll(".section-menu-cat");







function laggtill(){
  // Hämta produktnamnet från det klickade elementet
  let produktNamn = this.parentNode.querySelector(".h3-dish").textContent;

  // Kontrollera om produkten redan finns i varukorgen
  let befintligtObjekt = Array.from(
    document.querySelectorAll(".span-footer-itemname")
  ).find((objekt) => objekt.textContent === produktNamn);

  if (befintligtObjekt) {
    // Om produkten redan finns, öka bara antalet
    ökaAntalVara(befintligtObjekt.nextElementSibling);
    uppdateraAntalValdaProdukter(1); // Öka räknaren när en produkt läggs till
  } else {
    // Skapa HTML-element om produkten inte finns
    let listItem = document.createElement("li");
    let itemNameSpan = document.createElement("span");
    let numberOfItemSpan = document.createElement("span");
    let buttonsSpan = document.createElement("span");
    let addButton = document.createElement("button");
    let removeButton = document.createElement("button");

    listItem.classList.add("li-order");
    itemNameSpan.classList.add("span-footer-itemname");
    itemNameSpan.textContent = produktNamn;

    numberOfItemSpan.classList.add("span-footer-numberofitem");
    numberOfItemSpan.textContent = " 1 ";

    buttonsSpan.classList.add("span-footer-buttons");
    addButton.classList.add("button-footer-order", "button-footer-order-add");
    addButton.type = "button";
    addButton.textContent = "Lägg till";
    removeButton.classList.add(
      "button-footer-order",
      "button-footer-order-remove"
    );
    removeButton.type = "button";
    removeButton.textContent = "Ta bort";

    addButton.addEventListener("click", function () {
      ökaAntalVara(numberOfItemSpan);
      uppdateraAntalValdaProdukter(1); // Öka räknaren när en produkt läggs till
    });

    removeButton.addEventListener("click", function () {
      minskaAntalVara(numberOfItemSpan);
      uppdateraAntalValdaProdukter(-1); // Öka räknaren när en produkt tas bort
    });

    // Lägg till knapparna i span-elementet
    buttonsSpan.appendChild(addButton);
    buttonsSpan.appendChild(removeButton);

    // Lägg till elementen i listan
    listItem.appendChild(itemNameSpan);
    listItem.appendChild(numberOfItemSpan);
    listItem.appendChild(buttonsSpan);

    // Lägg till elementet i varukorgen
    document.querySelector(".ul-footer-order").appendChild(listItem);

    // Öka räknaren när en ny produkt läggs till
    uppdateraAntalValdaProdukter(1);
  }
}

function ökaAntalVara(spanElement) {
  spanElement.textContent = parseInt(spanElement.textContent, 10) + 1;
}

function minskaAntalVara(spanElement) {
  let nuvarandeAntal = parseInt(spanElement.textContent, 10);
  if (nuvarandeAntal > 1) {
    spanElement.textContent = nuvarandeAntal - 1;
  } else {
    // Ta bort elementet om antalet är mindre än 1
    spanElement.parentNode.parentNode.removeChild(spanElement.parentNode);
  }
}

function uppdateraAntalValdaProdukter(värde) {
  // Uppdatera det totala antalet valda produkter
  antalValdaProdukter += värde;
  document.querySelector(".span-footer-dishes").textContent =
    antalValdaProdukter;
}

// bestälning submit ---------------
let beställaBtn = document.getElementById("beställning-submit");
beställaBtn.addEventListener("click", () => validateAndSubmit());

function validateAndSubmit() {
  let form = document.getElementById("beställning-form");
  var bordsnummerValue = document.getElementById("bordsnummer").value;

  if (bordsnummerValue === "" || isNaN(parseInt(bordsnummerValue, 10))) {
    alert("Ange bordsnumret korrekt");
  } else {
    form.submit();
  }
}



//Väljer ut och genererar menyobjekt för "Dagens special"
function todaysDishes(){

	// Index för de fyra utvalda rätterna som ska visas
	const chosenIndexes = [0, 2, 4, 6]; // Ändra dessa för att byta maträtter
	
	// Array för de utvalda menyobjekten/   const dagensMenu = [];
	// Fyller dagensMenu med de utvalda menyobjekten från db.best-foods
	chosenIndexes.forEach((index) => {
		if(index >= 0 && index < db['best-foods'].length){
		dagensMenu.push(db['best-foods'][index]);
	}
	});

	fillMenuOnThePage(dagensMenu, document.querySelector('.todays-dishes'));
}
// todaysDishes();
