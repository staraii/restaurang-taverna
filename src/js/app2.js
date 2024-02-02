


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
            
            buttonSortMenu.forEach((button) =>  {
                button.classList.remove('button-sub-active');
            });
            ulSortState.forEach((ul) => {
                ul.classList.add('hide');
            });
            buttonSortMenu[i].classList.add('button-sub-active');

            if(i === 0){
                ulSortState[0].classList.toggle('hide');
            } else if(i === 2){
                ulSortState[1].classList.toggle('hide');
            } else if(i === 4){
                ulSortState[2].classList.toggle('hide');
            } else if(i === 1 || i === 3 || i === 5){
                let menuItems = document.querySelectorAll('.article-dish');
                menuItems.forEach((item) => {
                    item.classList.remove('hide');
                });
                    
                
                
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

function setOrderMenuItems(item, rate){
    if(rate == "1"){
        item.classList.add('rate-order-1');
    } else if(rate == "2"){
        item.classList.add('rate-order-2');
    } else if(rate == "3"){
        item.classList.add('rate-order-3');
    } else if(rate == "4"){
        item.classList.add('rate-order-4');
    } else if(rate == "5"){
        item.classList.add('rate-order-5');
    }
}





function generateMenuDisches(items, menuSection, ul){
    
    let docFrag = document.createDocumentFragment();
    let stateFrag = document.createDocumentFragment();
    let states = [];

    items.forEach((item) => {


        const articleDish = document.createElement('article');
        articleDish.classList.add('article-dish');
        
        setOrderMenuItems(articleDish, item.rate);
        
        
        

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
            articleDish.setAttribute("rate", item.rate)



       
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
        
            // h3 dishname
            const h3DishName = document.createElement('h3');
            h3DishName.classList.add('h3-dish-name');
            h3DishName.innerText = item.name;
           
        
        spanDish.append(buttonAdd, h3DishName);

        // p dish dsc
        const pDishDsc = document.createElement('p');
        pDishDsc.classList.add('p-dish-dsc');
        pDishDsc.innerText = item.dsc;
        articleDish.appendChild(pDishDsc);

        // p dish price
        const pPrice = document.createElement('p');
        pPrice.classList.add('p-dish-price');
        pPrice.innerText = item.price;
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

        generateStateFilters(item, articleDish);
        docFrag.appendChild(articleDish);
    });
    ul.appendChild(stateFrag);
    menuSection.appendChild(docFrag);
    
    setStateFilters(ul, menuSection);

}



function setStateFilters(ul, section){
    let stateFilters = ul.querySelectorAll('.li-sort-state');
    let menuItems = section.querySelectorAll('.article-dish');

    for(let i = 0; i < stateFilters.length; i++){
        let stateClass = stateFilters[i].dataset.state;
        let filteredMenuItems = section.querySelectorAll(`.${stateClass}`)

        stateFilters[i].addEventListener('click', () => {
            menuItems.forEach((mItem) => {
                mItem.classList.add('hide');
            });
            filteredMenuItems.forEach((filteredItem) => {
                filteredItem.classList.remove('hide');
            });
            ul.classList.add('hide');
        });
    }
   
}




setMenuFilters();


