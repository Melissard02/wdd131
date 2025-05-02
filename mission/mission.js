
const changeTheme = document.getElementById("dark")
const logo = document.getElementById("logo")
const blueText = document.getElementById("byui")


changeTheme.addEventListener("change", function() {
    if (changeTheme.value == "dark") {
        // document.body.style.backgroundColor = "black";
        // document.body.style.color = "white";
        document.body.classList.add("dark");
        blueText.style.color = "#8bbff3"
        logo.src = "images/byui-logo_white.png";
        
    }
    else {
        // document.body.style.backgroundColor = "";
        // document.body.style.color = "";
        document.body.classList.remove("dark");
        blueText.style.color = "#185b9d"
        logo.src = "images/byui-logo_blue.webp";
    }
});