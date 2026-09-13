//Navbar menu btn

const navbar = document.querySelector(".navigation__nav");
const navbarBtn = document.querySelector(".btn-toggle");



navbarBtn.addEventListener("click", () => {

    navbar.classList.toggle("active");
    navbarBtn.classList.toggle("rotate");

    document.body.classList.toggle("no-scroll")
})