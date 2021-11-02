"use strict"
//Get elements from html and creates variables

const coursesboxEl = document.getElementById("coursesBox");
const employmentEL = document.getElementById("employment");
const projectsEL = document.getElementById("projects");

//Eventlisteners
window.addEventListener('load', getCourses);
window.addEventListener('load', getWorkExperience);
window.addEventListener('load', getProjects);

//Funktion för att hämta kurser från rest-api
function getCourses() {
    console.log("hejhej")
    //Gör så att denna funktion körs varje gång fönstret laddas 
    coursesboxEl.innerHTML = '';

    fetch('http://asaberglund.se/rest-projekt/courses.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(course => {
                console.log(course);
                coursesboxEl.innerHTML +=
                    "<div id='course'>" +
                    "<h3>" + course.name + "</h3>" +
                    "<b> "+ course.university +" </b>" +
                    "<a href='" + course.link + "'> Kurslänk </a> <br>" +
                    "<p>" + course.description + "</p></div>";
            })
        })
}
function getWorkExperience() {
    //Gör så att denna funktion körs varje gång fönstret laddas 
    employmentEL.innerHTML = '';

    fetch('http://asaberglund.se/rest-projekt/workplaces.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(work => {
                console.log(work);
                employmentEL.innerHTML +=
                    "<div class='employment-name'>" +
                    "<h3>" + work.name + "</h3>" +
                    "<b>" + work.description + "</b> <br>" +
                    "<b>" + work.date + "</b> </div>" +
                    "<div class='employment-description'><h3> Beskrivning:</h3>" +
                    "<p>" + work.text + "</p> </div>";

            })
        })
}
function getProjects() {

    //Gör så att denna funktion körs varje gång fönstret laddas 
    projectsEL.innerHTML = '';

    fetch('http://asaberglund.se/rest-projekt/projects.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(project => {
                console.log(project);
                projectsEL.innerHTML +=
                    "<div class='project'>" +
                    "<a href='" + project.link + "'>" +
                    "<div class='project-img'>" +
                    "<img src='./img/impact.jpg' alt='Php project - make an impact'> </div>" +
                    "<div class='overlay'> <h3>" + project.name + "<br>" + project.description + "</h3> </div> </a> </div>"

            })
        })
}

