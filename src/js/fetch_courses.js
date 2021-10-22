"use strict"

//Get elements from html and creates variables

//Variables to courses
let coursesEl = document.getElementById("coursesAdmin");
let addCourseBtn = document.getElementById("addCourseBtn");
let nameInput = document.getElementById("name");
let descriptionInput = document.getElementById("description");
let linkInput = document.getElementById("link");


//Händelselyssnare
window.addEventListener('load', getCourses);
addCourseBtn.addEventListener('click', addCourse);


//Funktioner som läser in fetch anrop

//Funktion för att hämta kurser från rest-api
function getCourses(){
    //Gör så att denna funktion körs varje gång fönstret laddas 
    coursesEl.innerHTML ='';

    fetch('http://localhost:8080/rest-projekt/courses.php')
    .then(response => response.json())
    .then(data =>{
        data.forEach(course => {
            coursesEl.innerHTML += 
            "<div class='course'><p>"+
            "<b>Namn: </b>" + course.name + "<br>" +
            "<b>Beskrivning: </b>" + course.description + "<br>" +
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
function addCourse(){
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



