//Variables to courses
let updateProjectEL = document.getElementById("updateProject");
let projectsEl = document.getElementById("projectsAdmin");
let addProjectBtn = document.getElementById("addProjectBtn");
let projectNameInput = document.getElementById("ProjectName");
let projectDescriptionInput = document.getElementById("ProjectDescription");
let projectLinkInput = document.getElementById("ProjectLink");


//Händelselyssnare
window.addEventListener('load', getProjects);
addProjectBtn.addEventListener('click', addProjects);


//Funktioner som läser in fetch anrop

//Funktion för att hämta kurser från rest-api
function getProjects(){
    //Gör så att denna funktion körs varje gång fönstret laddas 
    projectsEl.innerHTML ='';

    fetch('http://localhost:8080/rest-projekt/projects.php')
    .then(response => response.json())
    .then(data =>{
        data.forEach(project => {
            console.log(project);
            projectsEl.innerHTML += 
            "<div class='item'><p>"+
            "<b>Namn: </b>" + project.name + "<br>" +
            "<b>Beskrivning: </b>" + project.description + "<br>" +
            "<b>Länk: </b>" + project.link + "<br>" +
            "<b>Id: </b>" + project.id + "<br>" +
            "</p> <button class='button2' id='" + project.id + "' onClick='getProjectById(" + project.id + ")'> Uppdatera </button>" +
            "<button class='button2' id='"+ project.id +"' onClick='deleteProject("+ project.id +")'> Radera </button></div> ";
        })
    })
}

function deleteProject(id){
    fetch("http://localhost:8080/rest-projekt/projects.php?id="+ id, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data =>{
        getProjects();
    })
    .catch(error =>{
        console.log('Error:', error);
    })
}
function addProjects(){
    let projectName= projectNameInput.value;
    let projectDescription= projectDescriptionInput.value;
    let projectLink = projectLinkInput.value;

    let course = {'name': projectName, 'description': projectDescription, 'link':projectLink};

    fetch("http://localhost:8080/rest-projekt/projects.php",{
        method: 'POST',
        body: JSON.stringify(course),
    })
    .then(response => response.json())
    .then(data =>{
        getProjects();
    })
    .catch(error =>{
        console.log('Error:', error);
    })
}
function getProjectById(id) {
    updateCourseEL.innerHTML = '';

    fetch('http://localhost:8080/rest-projekt/projects.php?id=' + id, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            data.forEach(project => {
                updateProjectEL.innerHTML=
                    "<h2> Uppdatera Kurs </h2>" +
                    "<form> <label for='namn'>Namn</label> <br>" +
                    "<input class='text-field' type='text' name='ProjectName'id='ProjectName' value='" + project.name + "'><br>" +
                    "<label for='namn'>Länk</label> <br>" +
                    "<input class='text-field' type='text' name='ProjectLink' id='ProjectLink' value='" + project.link + "'> <br>" +
                    "<label for='namn'>Beskrivning av projekt</label> <br>" +
                    "<input class='text-field' type='text' name='ProjectDescription' id='ProjectDescription' value = '" + project.description+ "'> <br>" +
                    " <input class='button1' type='submit' value='Uppdatera kurs' id='submit' onClick='updateProject(" + project.id + ")'>";
            })
        })
}
function updateProject(id) {
    const projectNameInput = document.getElementById("ProjectName");
    const projectDescriptionInput = document.getElementById("ProjectDescription");
    const projectLinkInput = document.getElementById("ProjectLink");

    const name = projectNameInput.value;
    const description = projectDescriptionInput.value;
    const link = projectLinkInput.value;

    const course = {'name': name, 'description': description, 'link':link};
    fetch('http://localhost:8080/rest-projekt/projects.php?id=' + id, {
        method: 'PUT',
        body: JSON.stringify(course),
    })
        .then(response => response.json())
        .then(project => {
            getProjects();
        })
        .catch(error => {
            console.log('Error:', error);
        })

}