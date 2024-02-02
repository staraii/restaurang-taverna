
import db from "./db.js";


// Menyknapp - hamburgermeny
const menuButton = document.querySelector(".menu-button");

// Dropdownmenyn
const menuDropdown = document.querySelector("menu");

// A - nodlista över länkar i dropdownmenyn
const linksMenu = document.querySelectorAll(".a-menu");

// IMG - logon i headern/förstasidan
const imgLogo = document.querySelector('.img-header');
const imgWelcome = document.querySelector('.img-welcome');
const figureWelcome = document.querySelector('.figure-welcome');

// Sections - nodlista, containrar för de olika sidornas innehåll t.ex. hem, meny mm.
const sectionContent = document.querySelectorAll(".section-content");

// Footer -
const footer = document.querySelector("footer");
// Button - expanderar footern
const buttonFooterOpener = document.querySelector(".button-footer-opener");

const ulFooterOrder = document.querySelector('.ul-footer-order');




// Hindrar att användaren klickar på flera artiklar samtidigt.
let toggleLock = false;


const buttonMenuBackward = document.querySelector('.button-menu-backward');
const divMenuMaincat = document.querySelectorAll('.div-menu-maincat');
const divSortMenu = document.querySelectorAll('.div-sort-menu');
const imgMenuFilters = document.querySelectorAll('.img-menu-filters');
const sectionMenuCat = document.querySelectorAll('.section-menu-cat');
const subSections = document.querySelectorAll('.section-menu-cat-content');
const buttonSortMenu = document.querySelectorAll('.button-sort-menu');

const ulSortState = document.querySelectorAll('.ul-sort-state');
const menuIsSet = false;

let bbqMenuIsSet = false;
let drinksMenuIsSet = false;
let dessertsMenuIsSet = false;

const arrayOfBbq = [...db.bbqs];
const arrayOfDrinks = [...db.drinks];
const arrayOfDesserts = [...db.desserts];

let stateFilterActive = false;



// Gör menuknappen tryckbar, öppnar dropdownmenyn
function dropdownMenuOpener() {
    // Gör menyknappen klickbar
	menuButton.addEventListener("click", () => {
		menuDropdown.classList.toggle("menu-open");
	});
}

function setDropdownMenu() {
    // Sätter eventlisteners på menyn
	for (let i = 0; i < linksMenu.length; i++) {
		linksMenu[i].addEventListener("click", () => {
			toggleLogo(i);
			
			for (let j = 0; j < linksMenu.length; j++) {
				
				if (linksMenu[i] === linksMenu[j]) {
					// Visar vald sida i main
					
					sectionContent[j].classList.remove("hide");
				} else {
					sectionContent[j].classList.add("hide");
				}
			}
			//toggleLogo(i);
			//Stänger menyn
			menuDropdown.classList.toggle("menu-open");
			closeFooter();
		});
	}

    //Stänger dropdown meny om man klickar utanför
	document.addEventListener("click", (event) => {
		const isMenuClicked = menuButton.contains(event.target) || menuDropdown.contains(event.target);

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

function toggleLogo(clickedMenuLink){
	for(let i = 0; i < sectionContent.length; i++){
		if(!sectionContent[i].classList.contains("hide")){
			// Den sektion som är öppen
			if(i === 0){
				imgLogo.classList.remove('img-header-trans');
				figureWelcome.classList.add('figure-welcome-trans');

			} else if(clickedMenuLink === 0){
				imgLogo.classList.add('img-header-trans');
				figureWelcome.classList.remove('figure-welcome-trans');
			}

			let openSection = sectionContent[i];
			console.log(openSection);
		}
	}
	
};

// Gör "se beställning"-knappen klickbar, öppnar/stänger footern
function setFooterOpener() {
	buttonFooterOpener.addEventListener("click", () => {
		if (buttonFooterOpener.innerText === "Se beställning") {
			openFooter();
		} else {
			closeFooter();
		}
	});
}

// Öppnar footern, ändrar text och färg på knappen
function openFooter(){
	footer.classList.add('footer-open');
	
	setTimeout(() => {
		buttonFooterOpener.innerText = "Tillbaka";
		buttonFooterOpener.style.backgroundColor = "#f04245";
		buttonFooterOpener.style.color = "#0a0a0a";
	}, 1000);
}

// Stänger footern, ändrar tillbaka text och färg på knappen
function closeFooter(){
	footer.classList.remove('footer-open');
	
	setTimeout(() => {
		buttonFooterOpener.innerText = "Se beställning";
		buttonFooterOpener.style.backgroundColor = "#0a0a0a";
		buttonFooterOpener.style.color = "#f04245";
	}, 1000);
}


// Meny sidan, filter och innehåll ------------------------------------------------------------------------

function setMenuFilters(){

    // ----------- Tillbaka knappen -----------
	function setButtonBack(){
		buttonMenuBackward.addEventListener('click', () => {
            // Går tillbaka till första sidan av menyn, återställer alla filter
			function resetMenu(){
                // Döljer sidorna med korten/maträtter
				subSections.forEach((section) => {
				section.classList.add('hide');
				});
                // Döljer menyfiltren
				divSortMenu.forEach((div) => {
					div.classList.add('hide');
				});
                // Visar bilderna för val av huvudkategori
				imgMenuFilters.forEach((img) => {
					img.classList.remove('hide');
				});
                // Visar sektionerna för de olika huvudkategorierna
				sectionMenuCat.forEach((section) => {
				section.classList.remove('hide');
				});
            	// Döljer tillbaka knappen
				buttonMenuBackward.classList.add('hide');
				menuButton.classList.remove('hide');
			}
		resetMenu();  
		});
	}


	function setMenuSelectMainCat(){
		for(let i = 0; i < divMenuMaincat.length; i++){
			divMenuMaincat[i].addEventListener('click', () => {
				sectionMenuCat.forEach((section) => {
					section.classList.add('hide');
				});
				imgMenuFilters.forEach((img) => {
					img.classList.add('hide');
				});
				ulSortState.forEach((ul) => {
					ul.classList.add('hide');
				});
				buttonSortMenu.forEach((button) => {
					button.classList.remove('button-sub-active');
				});
				sectionMenuCat[i].classList.remove('hide');
				subSections[i].classList.remove('hide');
				divSortMenu[i].classList.remove('hide');
				buttonMenuBackward.classList.remove('hide');
				menuButton.classList.add('hide');
				resetMenuItems(i);
				generateMenuCat(i);
			});
		}
	}


	function resetMenuItems(i){
		let sectionReset = subSections[i].querySelectorAll('.article-dish');
		sectionReset.forEach((dish) => {
			dish.classList.remove('hide');
		});
	}


	function setMenuSubCatFilters(){
		for(let i = 0; i < buttonSortMenu.length; i++){
			buttonSortMenu[i].addEventListener('click', () => {
				if(i === 0){
					if(stateFilterActive === true){
						ulSortState[0].classList.toggle('hide');
					} else {
						ulSortState[0].classList.toggle('hide');
						buttonSortMenu[0].classList.toggle('button-sub-active');
					}
				} else if(i === 2){
					if(stateFilterActive === true){
						ulSortState[1].classList.toggle('hide'); 
					} else {
						ulSortState[1].classList.toggle('hide');
						buttonSortMenu[2].classList.toggle('button-sub-active');
					}
				} else if(i === 4){
					if(stateFilterActive === true){
						ulSortState[2].classList.toggle('hide'); 
					} else {
						ulSortState[2].classList.toggle('hide');
						buttonSortMenu[4].classList.toggle('button-sub-active');
					}
				} else if(i === 1 || i === 3 || i === 5){
					stateFilterActive = false;
					let menuItems = document.querySelectorAll('.article-dish');
					let stateFilters = document.querySelectorAll('.li-sort-state');
					stateFilters.forEach((filter) => {
						filter.classList.remove('li-state-filter-active');
					});
					menuItems.forEach((item) => {
						item.classList.remove('hide');
					}); 
						if(i === 1){
							buttonSortMenu[1].classList.add('button-sub-active');
							buttonSortMenu[0].classList.remove('button-sub-active');
							ulSortState[0].classList.add('hide');
						} else if(i === 3){
							buttonSortMenu[3].classList.add('button-sub-active');
							buttonSortMenu[2].classList.remove('button-sub-active');
							ulSortState[1].classList.add('hide');
						} else if(i === 5) {
							buttonSortMenu[5].classList.add('button-sub-active');
							buttonSortMenu[4].classList.remove('button-sub-active');
							ulSortState[2].classList.add('hide');
						}
					// Visa dolda items, stat filter
				}  
			});
		}
	}


	setButtonBack();
	setMenuSelectMainCat();
	setMenuSubCatFilters();
}


function generateMenuCat(cat){
	if(cat === 0){
		if(!bbqMenuIsSet){
			generateMenuDisches(arrayOfBbq, subSections[0], ulSortState[0]);
			bbqMenuIsSet = true;
		} else {
			return;
		}
	} else if(cat === 1){
		if(!drinksMenuIsSet){
			generateMenuDisches(arrayOfDrinks, subSections[1], ulSortState[1]);
			drinksMenuIsSet = true;
		} else {
			return;
		}
	}else if(cat === 2){
		if(!dessertsMenuIsSet){
			generateMenuDisches(arrayOfDesserts, subSections[2], ulSortState[2]);
			dessertsMenuIsSet = true;
		} else {
			return;
		}
	}
}


function generateMenuDisches(items, menuSection, ul){
	let docFrag = document.createDocumentFragment();
	let stateFrag = document.createDocumentFragment();
	let states = [];

	items.forEach((item) => {
		const articleDish = document.createElement('article');
		articleDish.classList.add('article-dish');

        // pMenuOriginRate
		const pMenuOriginRate = document.createElement('p');
		pMenuOriginRate.classList.add('p-article-originandrate');

		// span origin
		const spanOrigin = document.createElement('span');
		spanOrigin.classList.add('span-origin');
		spanOrigin.innerText = "Ursprung: " + item.country; 

		// span rate
		const spanRate = document.createElement('span');
		spanRate.classList.add('span-rate');
		spanRate.innerText = "Rate: " + item.rate;
		articleDish.setAttribute("data-rate", item.rate);

		pMenuOriginRate.append(spanOrigin, spanRate);
		articleDish.appendChild(pMenuOriginRate);

        // img
		const imgItem = document.createElement('img');
		imgItem.classList.add('img-dish');
		imgItem.src = item.img;
		articleDish.appendChild(imgItem);

        // span dish
		const spanDish = document.createElement('span');
		spanDish.classList.add('span-dish');

        // button add
		const buttonAdd = document.createElement('button');
		buttonAdd.classList.add('button-article-add');
		buttonAdd.innerText = "Lägg till +";
		buttonAdd.setAttribute("data-name", `${item.name}`);
		buttonAdd.setAttribute("data-price", `${item.price}`);
		buttonAdd.addEventListener('click', () => {
			footerInteract();
			buttonArticleAddInteract(buttonAdd);
			addDishToOrder(buttonAdd);
		});

        // h3 dishname
		const h3DishName = document.createElement('h3');
		h3DishName.classList.add('h3-dish-name');
		h3DishName.innerText = item.name;

		spanDish.append(buttonAdd, h3DishName);
		articleDish.appendChild(spanDish);

		// p dish dsc
		const pDishDsc = document.createElement('p');
		pDishDsc.classList.add('p-dish-dsc');
		pDishDsc.innerText = item.dsc;
		articleDish.appendChild(pDishDsc);

		// p dish price
		const pPrice = document.createElement('p');
		pPrice.classList.add('p-dish-price');
		pPrice.innerText = `${item.price} kr`;
		articleDish.appendChild(pPrice);



		function generateStateFilters(item, dish){
			let state = item.country.split(', ');
			dish.classList.add(state[1]);
			
			if(!states.includes(state[1])){
				states.push(state[1]);
				const liState = document.createElement('li');
				liState.classList.add('li-sort-state');
				liState.innerText = state[1];
				liState.dataset.state = state[1];
				stateFrag.appendChild(liState);
			}
		}

		if(!ul){
			docFrag.appendChild(articleDish);
		} else {
			generateStateFilters(item, articleDish);
			docFrag.appendChild(articleDish);
		}
		
	});

	if(!ul){
		menuSection.appendChild(docFrag);
	} else {
		ul.appendChild(stateFrag);
		menuSection.appendChild(docFrag);
		setStateFilters(ul, menuSection);
	}
	
}




function setStateFilters(ul, section){
	let stateFilters = ul.querySelectorAll('.li-sort-state');
	let menuItems = section.querySelectorAll('.article-dish');

	for(let i = 0; i < stateFilters.length; i++){
		let stateClass = stateFilters[i].dataset.state;
		let filteredMenuItems = section.querySelectorAll(`.${stateClass}`)

		stateFilters[i].addEventListener('click', () => {
			stateFilters.forEach((filter) => {
				filter.classList.remove('li-state-filter-active');
			});

			stateFilters[i].classList.add('li-state-filter-active');
			
			menuItems.forEach((mItem) => {
				mItem.classList.add('hide');
			});
			filteredMenuItems.forEach((filteredItem) => {
				filteredItem.classList.remove('hide');
			});
			ul.classList.add('hide');
			buttonSortMenu[1].classList.remove('button-sub-active');
			buttonSortMenu[3].classList.remove('button-sub-active');
			buttonSortMenu[5].classList.remove('button-sub-active');
			stateFilterActive = true;
		});
	}
}



function addDishToOrder(item){
	let dishExists = Array.from(document.querySelectorAll(".li-order")).find((dish) => dish.dataset.name === item.dataset.name);
	

	if(!dishExists){
		// Skapar ett nytt li-element
		const newOrderItemLi = document.createElement('li');
		newOrderItemLi.classList.add('li-order');
		newOrderItemLi.setAttribute("data-name", item.dataset.name);
		newOrderItemLi.setAttribute("data-price", item.dataset.price);
		newOrderItemLi.setAttribute("data-numberof", 1);

		const newOrderItemSpanName = document.createElement('span');
		newOrderItemSpanName.classList.add('span-footer-itemname');
		newOrderItemSpanName.innerText = item.dataset.name;

		const newOrderItemSpanPrice = document.createElement('span');
		newOrderItemSpanPrice.classList.add('span-footer-itemprice');
		newOrderItemSpanPrice.innerText = `${item.dataset.price} kr`;

		const newOrderItemSpanNumberOf = document.createElement('span');
		newOrderItemSpanNumberOf.classList.add('span-footer-numberofitem');
		newOrderItemSpanNumberOf.innerText = "1";

		const newOrderItemSpanButtons = document.createElement('span');
		newOrderItemSpanButtons.classList.add('span-footer-buttons');

		const newOrderItemButtonAdd = document.createElement('button');
		newOrderItemButtonAdd.type = "button";
		newOrderItemButtonAdd.textContent = "+";
		newOrderItemButtonAdd.setAttribute("data-name", item.dataset.name);
		newOrderItemButtonAdd.classList.add("button-footer-order", "button-footer-order-add");
		newOrderItemButtonAdd.addEventListener('click', () => {
			addNumberOfItems(newOrderItemLi);
			liFooterInteract(newOrderItemLi);
		});

		const newOrderItemButtonRemove = document.createElement('button');
		newOrderItemButtonRemove.type = "button";
		newOrderItemButtonRemove.textContent = "-";
		newOrderItemButtonRemove.setAttribute("data-name", item.dataset.name);
		newOrderItemButtonRemove.classList.add("button-footer-order", "button-footer-order-remove");
		newOrderItemButtonRemove.addEventListener('click', () => {
			removeNumberOfItems(newOrderItemLi);
			liFooterInteract(newOrderItemLi);
		});

		newOrderItemSpanButtons.append(newOrderItemButtonAdd, newOrderItemButtonRemove);
		newOrderItemLi.append(newOrderItemSpanName, newOrderItemSpanPrice, newOrderItemSpanNumberOf, newOrderItemSpanButtons);
		ulFooterOrder.appendChild(newOrderItemLi);
		updateOrder();
	} else {
		addNumberOfItems(dishExists);
	}
}

function addNumberOfItems(dish){
	dish.dataset.numberof = parseInt(dish.dataset.numberof, 10) + 1;

	updateOrder();
}

function removeNumberOfItems(dish){
	dish.dataset.numberof = parseInt(dish.dataset.numberof, 10) - 1;
	if(parseInt(dish.dataset.numberof, 10) < 1){
		dish.remove();
	}
	updateOrder();
}

function updateOrder(){
	let liOrderItems = document.querySelectorAll('.li-order');
	let spanOrderNumberOfItems = document.querySelectorAll('.span-footer-numberofitem');
	
	let totalPrice = 0;
	let totalNumberOfItems = 0;

	for(let i = 0; i < liOrderItems.length; i++){
		let newPrice = parseInt(liOrderItems[i].dataset.price);
		let newNumberOf = parseInt(liOrderItems[i].dataset.numberof);
		spanOrderNumberOfItems[i].textContent = newNumberOf;
		totalPrice += (newPrice * newNumberOf);
		totalNumberOfItems += newNumberOf;
	}

	document.querySelector('.span-footer-total-price').textContent = `${totalPrice} kr`;
	document.querySelector('.span-footer-dishes').textContent = totalNumberOfItems;
}

function liFooterInteract(li){
	li.classList.add('li-order-interact');
	setTimeout(() => {
		li.classList.remove('li-order-interact');
	}, 400);
}

function footerInteract(){
	footer.classList.add('footer-added');
	setTimeout(() => {
		footer.classList.remove('footer-added');
	}, 400);
}

function buttonArticleAddInteract(button){
	button.classList.add('button-article-add-interact');
	setTimeout(() => {
		button.classList.remove('button-article-add-interact');
	}, 400);
}


function todaysDishes(){

	// Index för de fyra utvalda rätterna som ska visas
	const chosenIndexes = [0, 2, 4, 6]; // Ändra dessa för att byta maträtter
	let dagensMenu = [];
	// Array för de utvalda menyobjekten/   const dagensMenu = [];
	// Fyller dagensMenu med de utvalda menyobjekten från db.best-foods
	chosenIndexes.forEach((index) => {
		if(index >= 0 && index < db['best-foods'].length){
		dagensMenu.push(db['best-foods'][index]);
	}
	});

	generateMenuDisches(dagensMenu, sectionContent[0]);

	figureWelcome.classList.remove('figure-welcome-trans');
}

todaysDishes();



dropdownMenuOpener();
setDropdownMenu();
setFooterOpener();
setMenuFilters();