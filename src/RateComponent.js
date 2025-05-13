export default class RateComponent {
    #starsNumber
    constructor(starsNumber=5) {
        this.#starsNumber = starsNumber;
    }
    render(parent, rate) {
        parent.innerHTML = this.getStars(rate);
    }

    getStars(rating) {
        const {filledStars, halfFilledStars, emptyStars} = this.#getDestributionOfStars(rating);
        const arrayRes = this.#getStarsByClass(filledStars, FULL_STAR_CLASS);
        halfFilledStars && arrayRes.push(`<i class="fa ${HALF_STAR_CLASS }"></i>`);
        arrayRes.push(...this.#getStarsByClass(emptyStars, EMPTY_STAR_CLASS));
        return arrayRes.join("");
    }

    #getStarsByClass(numOfStars, starClass) {
        return Array.from({length: numOfStars},() => `<i class='fa ${starClass}'></i>`)
    }

    #getDestributionOfStars(rating) {
        let filledStars = Math.trunc(rating);
        let halfFilledStars = 0;
        const decimal = rating - filledStars;
        if(decimal >= 0.75) {
            filledStars++;
        } else if(decimal >= 0.25) {
            halfFilledStars++
        }
        const emptyStars = this.#starsNumber - filledStars - halfFilledStars;
        return {filledStars, halfFilledStars, emptyStars};
    }
}

const FULL_STAR_CLASS = "fa-star";
const HALF_STAR_CLASS = "fa-star-half-o";
const EMPTY_STAR_CLASS = "fa-star-o";