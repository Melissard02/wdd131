
const changeTheme = document.getElementById("dark");
const logo = document.getElementById("logo");
const box = document.getElementsByClassName(".boxyboo");


changeTheme.addEventListener("change", function() {
    if (changeTheme.value == "dark") {
        document.body.classList.add("dark");
        logo.src = "images/byui-logo_white.png";
    }
    else {
        document.body.classList.remove("dark");
        logo.src = "images/byui-logo_blue.webp";
    }
});