document.addEventListener("DOMContentLoaded", () => {
    // variables to reset on reload
    const quantitySelector = document.querySelector('.price-container #quantity-selector');
    const quantityCart = document.querySelector('#item-count-p');
    const pizzaCostDisplay = document.querySelector('#price');
    const priceTag = document.querySelector('#price-p');
    const addToOrder = document.querySelector('#add-cart-button');
    const sauceSelector = document.querySelector('#sauce-selector');
    const sauceImg = document.querySelector('.sauce-selection img');
    let pizzaCost = 0;
    let pizzaSize = "";
    let sauceType = "marinara";
    let selectedToppings = [];
    let yourOrderStr = "";

    // toppings variables
    const pepperoni = document.querySelector('#pepperoni-top'),
        bacon = document.querySelector('#bacon-top'),
        italianSausage = document.querySelector('#italian-sausage-top'),
        onionsTop = document.querySelector('#onions-top'),
        jalapenosTop = document.querySelector('#jalapenos-top'),
        pineappleTop = document.querySelector('#pineapple-top');


    const toppings = [pepperoni, bacon, italianSausage, onionsTop, jalapenosTop, pineappleTop];
    

    if (sessionStorage.getItem('isReloaded')) {
        // reset to 1
        if (quantitySelector) {
            quantitySelector.value = 1;
        }
        // reset to 0
        if (quantityCart) {
            quantityCart.innerHTML = '0';
        }
        // reset cost and display
        if (pizzaCostDisplay && priceTag) {
            pizzaCostDisplay.innerHTML = `$0.00`;
            priceTag.innerHTML = `$0.00`;
        }
        // reset the toppings to all inactive/unchecked
        toppings.forEach(topping => {
            topping.classList.remove('active');
            const checkbox = topping.querySelector('.checkbox');
            if (checkbox) {
                checkbox.checked = false;
            }
        });

        // reset the selector
        if (sauceSelector) {
            sauceSelector.value = "marinara-sauce";
            sauceImg.src = "./images/Marinara.png";
        }

    }
    else {
        if (quantitySelector) {
            quantitySelector.value = 1;
        }
    }

    sessionStorage.removeItem('isReloaded');

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
        options = document.querySelector(".options"),
        resetBtn = document.querySelector('#reset-btn');

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



    // active state for price-container
    const priceContainer = document.querySelector('.price-container');
    const smallPizza = document.querySelector('#small-size');
    const mediumPizza = document.querySelector('#medium-size');
    const largePizza = document.querySelector('#large-size');
    const orderContainer = document.querySelector('.order-container');

    const pizzas = [smallPizza, mediumPizza, largePizza];

    // boolean to check if crust is selected so we can prevent
    // user from selecting a topping if one crust is not selected
    let crustSelected = false;

    pizzas.forEach(pizza => {
        pizza.addEventListener("click", () => {
            const selectedQuantity = parseInt(quantitySelector.value);
            if (pizza.classList.contains('active')) {
                pizza.classList.remove('active');
                orderContainer.classList.remove('active');
                pizzaCost = 0;
                updatePizzaCostCart(0);
                updateCartQuantity(0);
                crustSelected = false;
                toppings.forEach(t => {
                    t.classList.remove('active');
                    const checkbox = t.querySelector('.checkbox');
                    checkbox.checked = false;
                });
            }
            else {
                pizzas.forEach(p => p.classList.remove('active'));
                pizza.classList.add('active');
                // remove -size from the id to get the pizza size
                pizzaSize = pizza.id.replace('-size', "");
                crustSelected = true;
            }
            

            // check if at least one pizza is selected, if not remove active from price-container
            const isActive = pizzas.some(pizza => pizza.classList.contains('active'));
            // console.log(isActive);
            if (isActive) {
                priceContainer.classList.add('active');
                console.log("price container active");
            }
            else {
                priceContainer.classList.remove('active');
                console.log("price container inactive");
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
            updatePizzaCostDisplay(selectedQuantity);

        });
    });

    toppings.forEach(topping => {
        topping.addEventListener("click", () => {
            if (crustSelected) {
                const checkbox = topping.querySelector('.checkbox');
                const selectedQuantity = parseInt(quantitySelector.value);


                if (topping.classList.contains('active')) {
                    topping.classList.remove('active');
                    checkbox.checked = false;
                    // create a shallow copy of the toppings array but remove the -top
                    selectedToppings = selectedToppings.filter(t => t !== topping.id.replace("-top", ""));
                }
                else {
                    topping.classList.add('active');
                    checkbox.checked = true;
                    selectedToppings.push(topping.id.replace("-top", ""));
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
                else if (topping === onionsTop) {
                    pizzaCost += checkbox.checked ? 0.5 : -0.5;
                }
                else if (topping === jalapenosTop) {
                    pizzaCost += checkbox.checked ? 0.5 : -0.5;
                }
                else if (topping === pineappleTop) {
                    pizzaCost += checkbox.checked ? 2 : -2;
                }
                // update the pizza price display in price container
                updatePizzaCostDisplay(selectedQuantity);
            }

        });
    });

    addToOrder.addEventListener("click", () => {
        const selectedQuantity = parseInt(quantitySelector.value);
        // call a function to update the cart quantity number at the top right
        orderContainer.classList.add('active');
        updateCartQuantity(selectedQuantity);
        updatePizzaCostDisplay(selectedQuantity);
        updatePizzaCostCart(selectedQuantity);
        updateYourOrder();
    });

    function updateCartQuantity(quantity) {
        quantityCart.innerHTML = `${quantity}`;
    }

    function updatePizzaCostDisplay(quantity) {
        let totalPizzaCost = pizzaCost * quantity;
        pizzaCostDisplay.innerHTML = `$${totalPizzaCost.toFixed(2)}`;
    }

    function updatePizzaCostCart(quantity) {
        let totalPizzaCost = pizzaCost * quantity;
        priceTag.innerHTML = `$${totalPizzaCost.toFixed(2)}`;
    }

    function updateYourOrder() {
        yourOrderStr = `Your order is a ${pizzaSize} ${sauceType} pizza`;
        // if theres toppings append to yourOrderStr
        if (selectedToppings.length > 0) {
            yourOrderStr += ` with ${selectedToppings.join(", ")}`;
        }
        const yourOrderTag = document.querySelector('.order-container p');
        yourOrderTag.innerHTML = yourOrderStr;
    }

    resetBtn.addEventListener("click", () =>{
        window.location.reload();
    });
    
    sauceSelector.addEventListener("change", () => {
        if (sauceSelector.value === "marinara-sauce") {
            sauceImg.src = "./images/Marinara.png";
        }
        else if (sauceSelector.value === "buffalo-sauce") {
            sauceImg.src = "./images/Buffalo.png";
        }
        else if (sauceSelector.value === "barbeque-sauce") {
            sauceImg.src = "./images/BBQ.png";
        }
        sauceType = sauceSelector.value.replace("-sauce", "");
    });



});

window.addEventListener("beforeunload", () => {
    // Set a flag in sessionStorage
    sessionStorage.setItem('isReloaded', 'true');
});
