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

    // Box ve img'nin başlangıçtaki gerçek ölçülerini al
    const initialBoxWidth = box.getBoundingClientRect().width;
    const initialImgWidth = img.getBoundingClientRect().width;

    // Başlangıç oranını hesapla
    const ratio = initialImgWidth / initialBoxWidth;

    const observer = new ResizeObserver(() => {
        const currentBoxWidth = box.getBoundingClientRect().width;

        img.style.width = `${currentBoxWidth * ratio}px`;
    });

    observer.observe(box);
});