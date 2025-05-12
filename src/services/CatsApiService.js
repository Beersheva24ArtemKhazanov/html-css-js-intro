import NoQueryService from "./NoQueryService.js";
const BASE_URL = "https://api.thecatapi.com/v1/breeds"
class CatsApiService extends NoQueryService{
    async getData() {
        const resp = await fetch(BASE_URL);
        if (!resp.ok) {
            throw Error(await resp.text())
        }
        const data = (await resp.json()).filter(({reference_image_id}) => !! reference_image_id)
        .map(getObj);
        return data;
    }
}
function getObj({name, description, reference_image_id}) {
    const thumbnailImg = getImage(reference_image_id);
    const res = {thumbnailTitle: name,
         thumbnailImg,
        detailedImg: thumbnailImg,
    detailedTitle: description };
    return res;
}
function getImage(imageId) {
    return `https://cdn2.thecatapi.com/images/${imageId}.jpg`
}
 const serviceObj = new CatsApiService();
 export default serviceObj;