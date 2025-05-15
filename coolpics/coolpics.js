document.addEventListener("DOMContentLoaded", function menu() {
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

const galleryImages = document.querySelectorAll(".gallery img");
galleryImages.forEach(function(image) 
    {
        image.addEventListener("click", function() 
    {
        showImageModal(image.src);
    });
});


function showImageModal(smallSrc) {
    const fileName = smallSrc.split("/").pop();
    const nameParts = fileName.split("-");
    const fullFileName = `${nameParts[0]}-full.jpeg`;
    const fullSrc = `images/${fullFileName}`;
    const dialog = document.createElement("dialog");
    dialog.classList.add("image-viewer");
    dialog.innerHTML = `
        <div class="modal-content">
            <img class="full" src="${fullSrc}" alt="Pretty Cool Pic">
            <button class="close-window">X</button>
        </div>
    `;

    document.querySelector("main").appendChild(dialog);
    dialog.showModal();

    const closeButton = dialog.querySelector(".close-window");
    closeButton.addEventListener("click", function() {
        dialog.close();
        dialog.remove();
    });
}











