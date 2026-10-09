//Navbar menu btn

const navbar = document.querySelector(".navigation__nav");
const navbarBtn = document.querySelector(".btn-toggle");



navbarBtn.addEventListener("click", () => {

    navbar.classList.toggle("active");
    navbarBtn.classList.toggle("rotate");

    document.body.classList.toggle("no-scroll")
})



const boxes = document.querySelectorAll('.startup__box');

boxes.forEach(box => {
    const img = box.querySelector('img');

    const initialBoxWidth = box.getBoundingClientRect().width;
    const initialImgWidth = img.getBoundingClientRect().width;

    const ratio = initialImgWidth / initialBoxWidth;

    const observer = new ResizeObserver(() => {
        const currentBoxWidth = box.getBoundingClientRect().width;

        img.style.width = `${currentBoxWidth * ratio}px`;
    });

    observer.observe(box);
});


// Pricing billing switch

const billingOffers = document.querySelectorAll("[data-billing]");
const billingToggle = document.querySelector(".pricing__toggle");
const priceAmounts = document.querySelectorAll("[data-monthly-price]");
const pricePeriods = document.querySelectorAll(".pricing__card__period");

const formatPrice = (price) => new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
}).format(price);

const setBillingPeriod = (period) => {
    const isYearly = period === "yearly";

    billingOffers.forEach((offer) => {
        const isActive = offer.dataset.billing === period;
        offer.classList.toggle("is-active", isActive);
        offer.setAttribute("aria-pressed", String(isActive));
    });

    billingToggle.classList.toggle("is-yearly", isYearly);
    billingToggle.setAttribute("aria-pressed", String(isYearly));
    billingToggle.setAttribute("aria-label", `Switch to ${isYearly ? "monthly" : "yearly"} billing`);

    priceAmounts.forEach((amount) => {
        const monthlyPrice = Number(amount.dataset.monthlyPrice);
        const displayedPrice = isYearly ? monthlyPrice * 0.9 * 12 : monthlyPrice;
        amount.textContent = `$${formatPrice(displayedPrice)}`;
    });

    pricePeriods.forEach((pricePeriod) => {
        pricePeriod.textContent = isYearly ? "/Year" : "/Month";
    });
};

billingOffers.forEach((offer) => {
    offer.addEventListener("click", () => setBillingPeriod(offer.dataset.billing));
});

billingToggle.addEventListener("click", () => {
    setBillingPeriod(billingToggle.classList.contains("is-yearly") ? "monthly" : "yearly");
});





//!Register


const logButtons = document.querySelectorAll("#login-btn, #register-btn");


const loginRegistration = document.querySelector(".login-register");
const loginContainer = document.querySelector(".login-register__container");

const loginTabsButton = document.querySelector("#login-page");
const registerTabsButton = document.querySelector("#register-page");

const signInButton = document.querySelector(".sign-in-btn")
const registerButton = document.querySelector(".register-button");
const passwordRepeat = document.querySelector(".password-repeat");

function logIn () {
    registerButton.style.display = "none";
    passwordRepeat.style.display = "none";
    loginTabsButton.style.color = "var(--black)";
    registerTabsButton.style.color = "var(--light-gray-3)";


}

function register() {
    registerButton.style.display = "block";
    passwordRepeat.style.display = "block";
    loginTabsButton.style.color = "var(--light-gray-3)";
    registerTabsButton.style.color = "var(--black)";
}

logButtons.forEach((button) => {

    button.addEventListener("click", () => {
        loginRegistration.classList.add("active");
        loginContainer.classList.add("active")

        if(button.id === "login-btn"){
            logIn();
        } else if(button.id === "register-btn") {
            register();
        }
    })

})

loginTabsButton.addEventListener("click", () => {
    logIn();
})
registerTabsButton.addEventListener("click", () => {
    register();
})






//Close Registration Page
const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", () => {
    loginRegistration.classList.remove("active");
})

// //Buttons on the menu
// const loginBtn = document.querySelectorAll("#login-btn, #register-btn");
// const registerPage = document.querySelector(".login-register");

// const registerPageContainer = document.querySelector(".login-register__container");
// const closeBtn = document.querySelector(".close-btn");

// const login = document.querySelector("#login-page");
// const register = document.querySelector("#register-page");
// const tabs = document.querySelectorAll(".login-register__tabs__btn");

// const passwordRepeat = document.querySelector(".password-repeat");
// const registerButton = document.querySelector(".register-button");
// const signInButton = document.querySelector(".sign-in-btn");

// //To open register menu
// loginBtn.forEach(button => {
//     button.addEventListener("click", ()=> {
//         registerPage.classList.add("active");
//         registerPageContainer.classList.add("active");

//         login.classList.remove("active");
//         register.classList.remove("active");

//         if(button.id === "login-btn") {
//             login.classList.add("active");
//             registerButton.classList.remove("active");
//             signInButton.classList.add("active")
//             passwordRepeat.classList.remove("active");


//         } else if (button.id === "register-btn") {
//             register.classList.add("active");
//             registerButton.classList.add("active");
//             signInButton.classList.remove("active")
//             passwordRepeat.classList.add("active");
//         }


//     })


// })

// //close button on the register page


// closeBtn.addEventListener("click", ()=> {
//     registerPage.classList.remove("active");
// })


// //To choose whichone;

// tabs.forEach((button) => {
//     button.addEventListener("click", () => {
//         tabs.forEach((tab) => {
//             tab.classList.remove("active");
//         });

//         button.classList.add("active");
//     });
// });





