//Navbar menu btn

const navbar = document.querySelector(".navigation__nav");
const navbarBtn = document.querySelector(".btn-toggle");

function setNavbarOpen (isOpen) {
    navbar.classList.toggle("active", isOpen);
    navbar.classList.toggle("rotate", isOpen);
    document.body.classList.toggle("no-scroll", isOpen);

    navbarBtn.setAttribute("aria-expanded", String(isOpen));
    navbarBtn.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
}

navbarBtn.addEventListener("click", () => {

    const isOpen = navbarBtn.getAttribute("aria-expanded") !== "true";
    setNavbarOpen(isOpen);
});

navbar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setNavbarOpen(false));
});



// Ads' boxes

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
const loginTitle = document.querySelector(".login-register__title");
const loginDescription = document.querySelector(".login-register__description");

const signInButton = document.querySelector(".sign-in-btn")
const registerButton = document.querySelector(".register-button");
const passwordRepeat = document.querySelector(".password-repeat");
const passwordRepeatInput = document.querySelector("#password-repeat");

function logIn () {
    signInButton.classList.add("active");
    signInButton.style.display = "block";
    registerButton.style.display = "none";
    passwordRepeat.style.display = "none";
    passwordRepeatInput.required = false;
    passwordRepeatInput.setCustomValidity("");

    loginTitle.textContent = "Welcome back.";
    loginDescription.textContent = "Sign in to continue to Findtrend.";

    loginTabsButton.style.color = "var(--black)";
    registerTabsButton.style.color = "var(--light-gray-3)";

    loginRegistration.classList.add("active");
    loginContainer.classList.add("active")

    document.querySelector("#email").focus();
}

function register() {
    signInButton.classList.remove("active");
    signInButton.style.display = "none";
    registerButton.style.display = "block";
    passwordRepeat.style.display = "block";
    passwordRepeatInput.required = true;

    loginTitle.textContent = "Create your account.";
    loginDescription.textContent = "Register to get started with Findtrend.";

    loginTabsButton.style.color = "var(--light-gray-3)";
    registerTabsButton.style.color = "var(--black)";

    loginRegistration.classList.add("active");
    loginContainer.classList.add("active")

    document.querySelector("#email").focus();
}

logButtons.forEach((button) => {

    button.addEventListener("click", () => {

        if(button.id === "login-btn"){
            lastModalTrigger = button;
            logIn();
        } else if(button.id === "register-btn") {
            lastModalTrigger = button;
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

let lastModalTrigger = null;

function closeLoginRegister() {
    loginRegistration.classList.remove("active");
    loginContainer.classList.remove("active");
    lastModalTrigger?.focus();
}


const closeBtn = document.querySelector(".close-btn");

closeBtn.addEventListener("click", closeLoginRegister);

loginContainer.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLoginRegister();
        return;
    }

    if (event.key !== "Tab") return;

    const focusableElements = [
        ...loginContainer.querySelectorAll(
            'button:not([disabled]), input:not([disabled]), a[href]'
        )
    ].filter((element) => element.offsetParent !== null);

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
});

//Password hide/show


document.querySelectorAll(".login-register__field").forEach((field) => {
    const input = field.querySelector('input[type="password"]');
    const showPassword = field.querySelector(".show-password");
    const hidePassword = field.querySelector(".hide-password");

    if (!input || !showPassword || !hidePassword) return;

    showPassword.style.display = "none";

    hidePassword.addEventListener("click", () => {
        input.type = "text";
        showPassword.style.display = "block";
        hidePassword.style.display = "none";
    });

    showPassword.addEventListener("click", () => {
        input.type = "password";
        showPassword.style.display = "none";
        hidePassword.style.display = "block";
    });


});

//Get started btn, Free Trial, Join Btn

const openLogin = document.querySelectorAll(".get-start, .join__button, .pricing__card__button");

openLogin.forEach(button => {
    button.addEventListener("click", ()=> {
        lastModalTrigger = button;
        logIn()

    })
})




//Form

const loginForm = document.querySelector(".login-register__form");
const passwordInput = document.querySelector("#password");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if(!passwordRepeatInput.required) return;

    if(passwordInput.value !== passwordRepeatInput.value) {
        passwordRepeatInput.setCustomValidity("Passwords do not match!");
        passwordRepeatInput.reportValidity();
        return;
    }

    passwordRepeatInput.setCustomValidity("");
});

passwordRepeatInput.addEventListener("input", () => {
    passwordRepeatInput.setCustomValidity("");
});
