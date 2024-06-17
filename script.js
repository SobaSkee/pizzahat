const dropdown = document.querySelector('.dropdown'),       selectBtn = document.querySelector('.select-btn'),
menuIcon = document.querySelector('#menu-icon'),
options = document.querySelector(".options");


selectBtn.addEventListener("click", ()=> {
    dropdown.classList.toggle("active");
    if (dropdown.classList.contains("active")) {
        menuIcon.classList.remove("bx-chevron-down");
        menuIcon.classList.add("bx-chevron-up");
    }
    else {
        menuIcon.classList.remove("bx-chevron-up");
        menuIcon.classList.add("bx-chevron-down");
    }
    console.log('toggled');
});

options.addEventListener("mouseleave", ()=> {
    dropdown.classList.remove("active");
    menuIcon.classList.remove("bx-chevron-up");
    menuIcon.classList.add("bx-chevron-down");
});


