import GalleryComponent from "./components/GalleryComponent.js";
import QueryFormComponent from "./components/QueryFormComponent.js";
import serviceObj from "./services/MoviesApiService.js";

//refernces to the HTML elements
let galleryItems;
const detailedContainerImage = document.querySelector(".detailedContainer_image");
const detailedContainerTitle = document.querySelector(".detailedContainer_title");
const hidingButton = document.getElementById("hidingButton");
const galleryElement = document.querySelector(".gallery");
const buttonQueryElem = document.getElementById("button_query");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
let allImagesElem;
//objects
const galleryComponent = new GalleryComponent(galleryElement);
const mainElem = document.querySelector(".main") ;
const formSectionElem = document.getElementById("form_section");
const formStructureObj = serviceObj.getFormStructureObject();
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
const submitter = (submittedObj) => {
    mainElem.classList.remove("none");
    mainElem.classList.add("hidden")
    formSectionElem.classList.add("none");
    formStructureObj && buttonQueryElem.classList.remove("none");
    getDataFromService(submittedObj);
}
function getDataFromService(submittedObj) {
    const dataPromise = serviceObj.getData(submittedObj);
    getDataFromPromise(dataPromise);
}
function getNextFromService() {
    const dataPromise = serviceObj.getNext();
    getDataFromPromise(dataPromise);
}
function getPrevFromService() {
    const dataPromise = serviceObj.getPrev();
    getDataFromPromise(dataPromise);
}
function getDataFromPromise(dataPromise) {
 dataPromise.then(data => {
    serviceObj.hasNext() ? buttonNext.classList.remove("none") : buttonNext.classList.add("none");
    serviceObj.hasPrev() ? buttonPrev.classList.remove("none") : buttonPrev.classList.add("none");
    hideDetails();
    galleryComponent.renderThumbnailElements(data);
    galleryItems = document.querySelectorAll(".gallery_item");
    galleryItems.forEach((item, index) => item.addEventListener("click", () => setDetails(galleryItems[index])));
    allImagesElem = document.querySelectorAll("img");
    allImagesElem.forEach(elem => elem.addEventListener("error", () => {
        elem.onerror = null;
        elem.src = "images/NoImageIcon.png"
            
    }));
});
}
//actions
!formStructureObj && mainElem.classList.remove("none");
buttonNext.addEventListener("click",getNextFromService);
buttonPrev.addEventListener("click",getPrevFromService);
formStructureObj && buttonQueryElem.addEventListener("click", () => {
    mainElem.classList.add("none");
    buttonQueryElem.classList.add("none");
    formSectionElem.classList.remove("none");
})
hidingButton.addEventListener("click", hideDetails)
formStructureObj && new QueryFormComponent(formSectionElem,
submitter, formStructureObj);