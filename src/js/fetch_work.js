//Variables to courses
let workExperienceEl = document.getElementById("workExperienceAdmin");
let updateWorkEl = document.getElementById("updateWork");
let addWorkBtn = document.getElementById("addWorkBtn");
let WorkNameInput = document.getElementById("WorkName");
let WorkTextInput = document.getElementById("WorkText");
let WorkDescriptionInput = document.getElementById("WorkDescription");
let WorkDateInput = document.getElementById("WorkDate");


//Händelselyssnare
window.addEventListener('load', getWorkExperience);
addWorkBtn.addEventListener('click', addWorkExperience);


//Funktioner som läser in fetch anrop

//Funktion för att hämta kurser från rest-api
function getWorkExperience(){
    //Gör så att denna funktion körs varje gång fönstret laddas 
    workExperienceEl.innerHTML ='';

    fetch('http://localhost:8080/rest-projekt/workplaces.php')
    .then(response => response.json())
    .then(data =>{
        data.forEach(work => {
            console.log(work);
            workExperienceEl.innerHTML += 
            "<div class='item'><p>"+
            "<b>Namn: </b>" + work.name + "<br>" +
            "<b>Datum: </b>" + work.date + "<br>" +
            "<b>Beskrivning/titel av jobb: </b>" + work.description + "<br>" +
            "<b>Beskrivning-text: </b>" + work.text + "<br>" +
            "<b>Id: </b>" + work.id + "<br>" +
            "</p> <button class='button2' id='" + work.id + "' onClick='getWorkById(" + work.id + ")'> Uppdatera </button>" +
            " <button class='button2' id='"+ work.id +"' onClick='deleteWorkExperience("+ work.id +")'> Radera </button></div> ";
        })
    })
}

function deleteWorkExperience(id){
    fetch("http://localhost:8080/rest-projekt/workplaces.php?id="+ id, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data =>{
        getWorkExperience();
    })
    .catch(error =>{
        console.log('Error:', error);
    })
}
function addWorkExperience(){
    let WorkName= WorkNameInput.value;
    let WorkDate= WorkDateInput.value;
    let WorkTextDescription = WorkTextInput.value;
    let WorkDescrition= WorkDescriptionInput.value;

    let course = {'name': WorkName,'date': WorkDate, 'description': WorkDescrition, 'text':WorkTextDescription};

    fetch("http://localhost:8080/rest-projekt/workplaces.php",{
        method: 'POST',
        body: JSON.stringify(course),
    })
    .then(response => response.json())
    .then(data =>{
        getWorkExperience();
    })
    .catch(error =>{
        console.log('Error:', error);
    })
}
function getWorkById(id) {
    updateCourseEL.innerHTML = '';

    fetch('http://localhost:8080/rest-projekt/workplaces.php?id=' + id, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            data.forEach(work => {
                updateWorkEl.innerHTML=
                    "<h2> Uppdatera Kurs </h2>" +
                    "<form> <label for='Namn'>Namn</label> <br>" +
                    "<input class='text-field' type='text' name='WorkName'id='WorkName' value='" + work.name + "'><br>" +
                    "<label for='namn'>Datum</label> <br>" +
                    "<input class='text-field' type='text' name='WorkDate' id='WorkDate' value='" + work.date + "'> <br>" +
                    "<label for='namn'>Beskrivning/titel av jobb</label> <br>" +
                    "<input class='text-field' type='text' name='WorkDescription' id='WorkDescription' value = '" + work.description+ "'> <br>" +
                    "<label for='namn'>Beskrivande-text</label> <br>" +
                    "<input class='text-field' type='text' name='WorkText' id='WorkText' value = '" + work.text+ "'> <br>" +
                    " <input class='button1' type='submit' value='Uppdatera' id='submit' onClick='updateWork(" + work.id + ")'>";
            })
        })
}
function updateWork(id) {
    const WorkNameInput = document.getElementById("WorkName");
    const WorkTextInput = document.getElementById("WorkText");
    const WorkDescriptionInput = document.getElementById("WorkDescription");
    const WorkDateInput = document.getElementById("WorkDate");

    const name = WorkNameInput.value;
    const text = WorkTextInput.value;
    const description = WorkDescriptionInput.value;
    const date = WorkDateInput.value;

    const work = {'name': name, 'description': description, 'text':text, 'date':date,};
    fetch('http://localhost:8080/rest-projekt/workplaces.php?id=' + id, {
        method: 'PUT',
        body: JSON.stringify(work),
    })
        .then(response => response.json())
        .then(work => {
            getProjects();
        })
        .catch(error => {
            console.log('Error:', error);
        })

}