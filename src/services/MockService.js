import NoQueryService from "./NoQueryService.js";

//{thumbnailImg: string, detailedImg: string; thumbnailTitle: string; detailedTitle: string}
class MockService extends NoQueryService{
    getData() {
        const dataStr = 'abcdefghijoprstklmn';
        return Promise.resolve(Array.from(dataStr).map(l =>( {
           thumbnailImg: "images/pug.webp",
            detailedImg:"images/pug.webp" ,
            thumbnailTitle: l.repeat(6),
            detailedTitle: l.repeat(100)
        })))
    }
}
// const serviceObj = new MockService();
// export default serviceObj;