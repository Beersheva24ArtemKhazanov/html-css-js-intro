
const LANGUAGE = "en-us";
const IMAGE_PREFIX = "https://image.tmdb.org/t/p/w500";
const AUTH_HEADER =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Y2U4YzAzM2Y1MjA2YzkyNzBkOTczY2I5Y2MwNWJmNSIsIm5iZiI6MS42ODU4NzY4MDcxMzY5OTk4ZSs5LCJzdWIiOiI2NDdjNzA0NzBlMjlhMjAwZjk4MjRhYzYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.uh49uuV1dj9Usr3S3Uwi0s42lw4HqEkDfKBnColmCFU";
class MoviesApiService {
  #page;
  #totalPages;
  #submittedObj;
  constructor() {
    this.#page = 1;
    this.#totalPages = 0;
  }
  getFormStructureObject() {
    return [
      {
        name: "year",
        type: "number",
        min: 1890,
        max: new Date().getFullYear(),
      },
    ];
  }
  async getNext() {
    let res;
    this.hasNext() && (res = await this.#getNextPrev(true));
    return res;
  }
  async #getNextPrev(isNext) {
    let res = [];
    this.#page = isNext ? this.#page + 1 : this.#page - 1;
    res = await this.getData(this.#submittedObj);
    return res;
  }

  async getPrev() {
    let res;
    this.hasPrev() && (res = await this.#getNextPrev(false));
    return res;
  }
  async getData(submittedObj) {
    this.#submittedObj = submittedObj;
    const year = this.#getYear(submittedObj);

    const response = await fetch(this.#getUrl(year), {
      headers: {
        Authorization: AUTH_HEADER,
      },
    });
    const data = await response.json();
    this.#totalPages = data.total_pages;
    const itemsData = getItemsData(data.results);
    return itemsData;
  }
  hasNext() {
    return this.#page < this.#totalPages;
  }
  hasPrev() {
    return this.#page > 1;
  }

  #getUrl(year) {
    return `https://api.themoviedb.org/3/discover/movie?language=${LANGUAGE}&primary_release_year=${year}&page=${
      this.#page
    }&sort_by=popularity.desc`;
  }

  #getYear(submittedObj) {
    return (
      submittedObj?.year || this.#submittedObj?.year || new Date().getFullYear()
    );
  }
}
function getItemsData(results) {
  // {thumbnailImg: string, detailedImg: string; thumbnailTitle: string; detailedTitle: string}
  const itemsData = results.map(
    ({ poster_path, backdrop_path, title, overview }) => ({
      thumbnailImg: getImage(poster_path),
      detailedImg: getImage(backdrop_path),
      thumbnailTitle: title,
      detailedTitle: overview,
    })
  );
  return itemsData;
}
function getImage(image_id) {
  return `${IMAGE_PREFIX}${image_id}`;
}
const serviceObj = new MoviesApiService();
export default serviceObj;
