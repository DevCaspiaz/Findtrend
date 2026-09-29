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
