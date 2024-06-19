function toggleDropdown(selectBtn, dropdown, menuIcon) {
    selectBtn.addEventListener("click", () => {
        dropdown.classList.toggle("active");
        if (dropdown.classList.contains("active")) {
            menuIcon.classList.remove("bx-chevron-down");
            menuIcon.classList.add("bx-chevron-up");
        } else {
            menuIcon.classList.remove("bx-chevron-up");
            menuIcon.classList.add("bx-chevron-down");
        }
    });
}

// elements
const dropdown = document.querySelector('.nav-list .dropdown'),
      selectBtn = document.querySelector('.select-btn'),
      menuIconNav = document.querySelector('.primary-navigation #menu-icon'),
      options = document.querySelector(".options");

// call the function for just the nav dropdown
toggleDropdown(selectBtn, dropdown, menuIconNav);

// close the dropdown for menu on mouse leave
options.addEventListener("mouseleave", () => {
    dropdown.classList.remove("active");
    menuIconNav.classList.remove("bx-chevron-up");
    menuIconNav.classList.add("bx-chevron-down");
});

// sections for each dropdown in body
const sections = ['crust', 'topping', 'sauce'];

// for each section toggle the dropdown
sections.forEach(section => {
    const selectBtn = document.querySelector(`#${section}-section .select-btn`);
    const dropdown = document.querySelector(`#${section}-section .dropdown`);
    const menuIcon = document.querySelector(`#${section}-section #menu-icon`);
    toggleDropdown(selectBtn, dropdown, menuIcon);
});


// pizza cost var
var pizzaCost = 0;
const pizzaCostDisplay = document.querySelector('#price');

// active state for price-container

const priceContainer = document.querySelector('.price-container');
const smallPizza = document.querySelector('#small-size');
const mediumPizza = document.querySelector('#medium-size');
const largePizza = document.querySelector('#large-size');

const pizzas = [smallPizza, mediumPizza, largePizza];

pizzas.forEach(pizza => {
    pizza.addEventListener("click", () => {
        if (pizza.classList.contains('active')) {
            pizza.classList.remove('active');
        }
        else {
            pizzas.forEach(p => p.classList.remove('active'));
            pizza.classList.add('active');
        }
        

        // check if at least one pizza is selected, if not remove active from price-container
        const isActive = pizzas.some(pizza => pizza.classList.contains('active'));
        console.log(isActive);
        if (isActive) {
            priceContainer.classList.add('active');
        }
        else {
            priceContainer.classList.remove('active');
        }

        // check for type of pizza and change price accordingly
        if (pizza === smallPizza) {
            pizzaCost = 6;
        }
        else if (pizza === mediumPizza) {
            pizzaCost = 11;
        }
        else {
            pizzaCost = 15;
        }

        // update the pizza price display in price container
        pizzaCostDisplay.innerHTML = `$${pizzaCost.toFixed(2)}`;
    });
});


// toppings variables
const pepperoni = document.querySelector('#pepperoni-top');
const bacon = document.querySelector('#bacon-top');
const italianSausage = document.querySelector('#italian-sausage-top');

const toppings = [pepperoni, bacon, italianSausage];

toppings.forEach(topping => {
    topping.addEventListener("click", () => {
        const checkbox = topping.querySelector('.checkbox');
        console.log(checkbox);
        if (topping.classList.contains('active')) {
            topping.classList.remove('active');
            checkbox.checked = false;
        }
        else {
            topping.classList.add('active');
            checkbox.checked = true;
        }
        

        if (topping === pepperoni) {
            pizzaCost += checkbox.checked ? 0.8 : -0.8;
        }
        else if (topping === bacon) {
            pizzaCost += checkbox.checked ? 0.8 : -0.8;
        }
        else if (topping === italianSausage) {
            pizzaCost += checkbox.checked ? 1 : -1;
        }
        pizzaCostDisplay.innerHTML = `$${pizzaCost.toFixed(2)}`;
    });
});