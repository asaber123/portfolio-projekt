//Variables to courses
let workExperienceEl = document.getElementById("workExperienceAdmin");
let addCourseBtn = document.getElementById("addWorkBtn");
let nameInput = document.getElementById("name");
let textInput = document.getElementById("text");
let descriptionInput = document.getElementById("description");
let dateInput = document.getElementById("date");


//Händelselyssnare
window.addEventListener('load', getWorkExperience);
addCourseBtn.addEventListener('click', addWorkExperience);


//Funktioner som läser in fetch anrop

//Funktion för att hämta kurser från rest-api
function getWorkExperience(){
    //Gör så att denna funktion körs varje gång fönstret laddas 
    //coursesEl.innerHTML ='';

    fetch('http://localhost:8080/rest-projekt/workplaces.php')
    .then(response => response.json())
    .then(data =>{
        data.forEach(work => {
            console.log(work);
            workExperienceEl.innerHTML += 
            "<div class='work-admin'><p>"+
            "<b>Namn: </b>" + work.name + "<br>" +
            "<b>Beskrivning/titel av jobb: </b>" + work.description + "<br>" +
            "<b>Beskrivning-text: </b>" + work.text + "<br>" +
            "<b>Kursplan: </b><a href='" + course.link + "'>Länk till Kursplan</a><br>" +
            "<b>Id: </b>" + course.id + "<br>" +
            "</p></div> <button class='button2' id='"+ course.id +"' onClick='deleteCourse("+ course.id +")'> Radera </button> <hr>";
        })
    })
}

function deleteCourse(id){
    fetch("http://localhost:8080/rest-projekt/courses.php?id="+ id, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data =>{
        getCourses();
    })
    .catch(error =>{
        console.log('Error:', error);
    })
}
function addWorkExperience(){
    let name= nameInput.value;
    let description= descriptionInput.value;
    let link= linkInput.value;

    let course = {'name': name,'link': link, 'description': description};

    fetch("http://localhost:8080/rest-projekt/courses.php",{
        method: 'POST',
        body: JSON.stringify(course),
    })
    .then(response => response.json())
    .then(data =>{
        getCourses();
    })
    .catch(error =>{
        console.log('Error:', error);
    })
}