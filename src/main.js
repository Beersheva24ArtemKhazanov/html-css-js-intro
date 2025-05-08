import GalleryComponent from "./components/GalleryComponent.js";
import serviceObj from "./services/MockService.js";

//refernces to the HTML elements
let galleryItems;
const detailedContainerImage = document.querySelector(".detailedContainer_image");
const detailedContainerTitle = document.querySelector(".detailedContainer_title");
const hidingButton = document.getElementById("hidingButton");
const galleryElement = document.querySelector(".gallery");
//objects
const galleryComponent = new GalleryComponent(galleryElement);
const mainElem = document.querySelector(".main") ;
//functions
function setDetails(itemElement) {
    detailedContainerImage.src = itemElement.getAttribute("data-detailed-image");
    detailedContainerTitle.innerHTML = itemElement.getAttribute("data-detailed-title");
    mainElem.classList.remove("hidden");
    animate();
}

function animate() {
    detailedContainerImage.classList.remove("animation-left");
    detailedContainerTitle.classList.remove("animation-right");
    setTimeout(addAnimationClasses);
    
}

function addAnimationClasses() {
    detailedContainerImage.classList.add("animation-left");
    detailedContainerTitle.classList.add("animation-right"); 
}
const hideDetails = () => mainElem.classList.add("hidden");
//actions
hidingButton.addEventListener("click", hideDetails)
serviceObj.getData().then(data => {
    galleryComponent.renderThumbnailElements(data);
    galleryItems = document.querySelectorAll(".gallery_item");
    galleryItems.forEach((item,index) => item.addEventListener("click", () => setDetails(galleryItems[index])));
})