document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.getElementById("menu-toggle");
    const nav = document.getElementById("main-nav");

    menuButton.addEventListener("click", function() {
        nav.classList.toggle("show");
    });
});

function handleResize()
{
    const menuToggle = document.querySelector("#menu-toggle");
    
    if (window.innerWidth > 1000) {
        menuToggle.style.display = "none";
    }
    else {
        menuToggle.style.display = "block";
    }
};

window.addEventListener("resize", handleResize);
handleResize();