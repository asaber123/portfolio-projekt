"use strict"

//Get elements from html and creates variables

//Variables to courses
let coursesEl = document.getElementById("coursesAdmin");
let addCourseBtn = document.getElementById("addCourseBtn");
let updateCourseBtn = document.getElementById("updateCourseBtn");
let updateCourseEL = document.getElementById("updateCourse");
let nameInput = document.getElementById("name");
let descriptionInput = document.getElementById("description");
let linkInput = document.getElementById("link");


//Händelselyssnare
window.addEventListener('load', getCourses);
addCourseBtn.addEventListener('click', addCourse);


//Funktioner som läser in fetch anrop

//Funktion för att hämta kurser från rest-api
function getCourses() {
    //Gör så att denna funktion körs varje gång fönstret laddas 
    coursesEl.innerHTML = '';

    fetch('http://localhost:8080/rest-projekt/courses.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(course => {
                coursesEl.innerHTML +=
                    "<div class='item'><p>" +
                    "<b>Namn: </b>" + course.name + "<br>" +
                    "<b>Beskrivning: </b>" + course.description + "<br>" +
                    "<b>Kursplan: </b>" + course.link + "<br>" +
                    "<b>Id: </b>" + course.id + "<br>" +
                    "</p> <button class='button2' id='" + course.id + "' onClick='getCourseById(" + course.id + ")'> Uppdatera </button>" +
                    "<button class='button2' id='" + course.id + "' onClick='deleteCourse(" + course.id + ")'> Radera </button></div> ";
            })
        })
}

function deleteCourse(id) {

    fetch("http://localhost:8080/rest-projekt/courses.php?id=" + id, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            getCourses();
        })
        .catch(error => {
            console.log('Error:', error);
        })
}
function addCourse() {
    let name = nameInput.value;
    let description = descriptionInput.value;
    let link = linkInput.value;

    let course = { 'name': name, 'link': link, 'description': description };

    fetch("http://localhost:8080/rest-projekt/courses.php", {
        method: 'POST',
        body: JSON.stringify(course),
    })
        .then(response => response.json())
        .then(data => {
            getCourses();
        })
        .catch(error => {
            console.log('Error:', error);
        })
}
function getCourseById(id) {
    updateCourseEL.innerHTML = '';

    fetch('http://localhost:8080/rest-projekt/courses.php?id=' + id, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            data.forEach(course => {
                updateCourseEL.innerHTML=
                    "<h2> Uppdatera Kurs </h2>" +
                    "<form> <label for='namn'>Namn</label> <br>" +
                    "<input class='text-field' type='text' name='name'id='name' value='" + course.name + "'><br>" +
                    "<label for='namn'>Beskrivning</label> <br>" +
                    "<input class='text-field' type='text' name='description' id='description' value='" + course.description + "'> <br>" +
                    "<label for='namn'>Länk</label> <br>" +
                    "<input class='text-field' type='text' name='link' id='link' value = '" + course.link + "'> <br>" +
                    " <input class='button1' type='submit' value='Uppdatera kurs' id='submit' onClick='updateCourse(" + course.id + ")'>";
            })
        })
}
function updateCourse(id) {
    const nameInput = document.getElementById("name");
    const descriptionInput = document.getElementById("description");
    const linkInput = document.getElementById("link");

    const name = nameInput.value;
    const description = descriptionInput.value;
    const link = linkInput.value;

    let data = { 'name': name, 'link': link, 'description': description };
    fetch("http://localhost:8080/rest-projekt/courses.php?id=" + id, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(course => {
            getCourses();
        })
        .catch(error => {
            console.log('Error:', error);
        })

}



