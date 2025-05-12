export default class GalleryComponent {
  #galleryElement;

  constructor(galleryElement, subject) {
    this.#galleryElement = galleryElement;
  }
  renderThumbnailElements(data) {
    //data is array of the objects
    //each object has the following structure
    //{thumbnailImg: string, detailedImg: string; thumbnailTitle: string; detailedTitle: string}
    this.#galleryElement.innerHTML = getThumbnailItems(data);
  }
}
function getThumbnailItems(data) {
  const res = data.map(getItem);
  return res.join("");
}
function getItem({ thumbnailImg, detailedImg, thumbnailTitle, detailedTitle }) {
  const res = `<li class="gallery_item" data-detailed-image="${detailedImg}"
    data-detailed-title="${detailedTitle}" > 
    <img src="${thumbnailImg}" alt="${thumbnailTitle}"  class="gallery_item_image">
    <figcaption class="gallery_item_title">${thumbnailTitle}</figcaption>
      </li>`;
  return res;
}