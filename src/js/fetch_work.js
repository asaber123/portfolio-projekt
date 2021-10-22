//Variables to courses
let workExperienceEl = document.getElementById("workExperienceAdmin");
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
            "</p> <button class='button2' id='"+ work.id +"' onClick='deleteWorkExperience("+ work.id +")'> Radera </button></div> ";
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