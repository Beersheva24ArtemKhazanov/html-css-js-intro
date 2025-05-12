export default class QueryFormComponent {
    constructor(parentElem, submitter, formStructureArray) {
        parentElem.innerHTML += getHtmlForm(formStructureArray);
        addSubmitHandler(submitter);
    }
}
function getHtmlForm(formStructureArray) {
    const form = `<form id="query_form" class="queryForm">
        ${getInputs(formStructureArray)}
        <div class="input-buttons">
            <button class="btn" type="submit">Submit</button>
            <button class="btn" type="reset">Reset</button>
        </div>
    </form>`
    return form
}
function getInputs(formStructureArray) {
    const inputs = formStructureArray.map(getInput).join("");
    return inputs;
}
function getInput({name, type, min, max}) {
    return `<input required class="queryForm_input" name="${name}" type="${type}"
     ${min == undefined ? '' : `min="${min}"`} 
     ${max == undefined ? '' : `max="${max}"}`}
     placeholder="${`Enter ${name}`}">`
}
function addSubmitHandler(submitter){
    const formElem = document.getElementById("query_form");
    formElem.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(formElem);
        const submittedObj = Object.fromEntries(formData);
        submitter(submittedObj);
    })
}