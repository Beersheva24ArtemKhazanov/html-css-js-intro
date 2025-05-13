import RateComponent from "./RateComponent.js";

const parent = document.getElementById("rate");
const rating = new RateComponent(100);
rating.render(parent, 50);