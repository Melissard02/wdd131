const newParagraph = document.createElement("p");
newParagraph.innerText = "Added with Javascript!";
document.body.appendChild(newParagraph);

const newImage = document.createElement("img");
newImage.setAttribute("src", "https://picsum.photos/200");
newImage.setAttribute("alt", "Some rando");
document.body.appendChild(newImage);

const newSection = document.createElement("section");


const newH2 = document.createElement("h2");
newH2.innerText = "DOM Basics";
newSection.appendChild(newH2);

const newPara = document.createElement("p");
newPara.innerText = "This was added through JavaScript";
newSection.appendChild(newPara);

const newP = document.createElement("p");
newP.innerText = "Melissa Dickerson";
newSection.appendChild(newP);

document.body.appendChild(newSection);