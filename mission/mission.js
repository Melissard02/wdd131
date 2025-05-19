
const changeTheme = document.getElementById("dark-mode");
const logo = document.getElementById("logo");
const box = document.getElementsByClassName(".missionbox");


changeTheme.addEventListener("change", function() {
    if (changeTheme.value == "dark-mode") {
        document.body.classList.add("dark-mode");
        logo.src = "images/byui-logo_white.png";
    }
    else {
        document.body.classList.remove("dark-mode");
        logo.src = "images/byui-logo_blue.webp";
    }
});