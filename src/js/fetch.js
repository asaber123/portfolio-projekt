"use strict"
//Get elements from html and creates variables

const coursesboxEl = document.getElementById("coursesBox");
const employmentEL = document.getElementById("employment");
const projectsEL = document.getElementById("projects");

//Eventlisteners that starts running functions on an event
window.addEventListener('load', getCourses);
window.addEventListener('load', getWorkExperience);
window.addEventListener('load', getProjects);

//Functions to get courses from the rest-api
function getCourses() {
    //Everytime the window reloads, the previous loadded content is removed and new data is set in. 
    coursesboxEl.innerHTML = '';

    fetch('http://localhost/rest-projekt/courses.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(course => {
                //Types our the data in the element with id courses-box in the html. 
                coursesboxEl.innerHTML +=
                    "<div id='course'>" +
                    "<h3>" + course.name + "</h3>" +
                    "<b> "+ course.university +" </b><br>" +
                    "<a href='" + course.link + "'> Kurslänk </a> <br>" +
                    "<p>" + course.description + "</p></div>";
            })
        })
}
function getWorkExperience() {
    //Everytime the window reloads, the previous loadded content is removed and new data is set in. 
    employmentEL.innerHTML = '';

    fetch('http://localhost/rest-projekt/workplaces.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(work => {
                //Types our the data in the element with id employment in the html. 
                employmentEL.innerHTML +=
                    "<div class='employment-div'>" +
                    "<div class='employment-name'>" +
                    "<h3>" + work.name + "</h3>" +
                    "<b>" + work.description + "</b> <br>" +
                    "<b>" + work.date + "</b> </div>" +
                    "<div class='employment-description'><h3> Beskrivning:</h3>" +
                    "<p>" + work.text + "</p> </div> " +
                    "</div>";

            })
        })
}
function getProjects() {

    //Everytime the window reloads, the previous loadded content is removed and new data is set in. 
    projectsEL.innerHTML = '';

    fetch('http://localhost/rest-projekt/projects.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(project => {
                //Types our the data in the element with id projects in the html. 
                projectsEL.innerHTML +=
                    "<div class='project'>" +
                    "<iframe class='project-box' src='" + project.link + "' height='250' width='300' title='" + project.name + "'></iframe>" +
                    "<a href='" + project.link + "'>" +
                    "<div class='overlay'> <h3>" + project.name + "</h3><b>" + project.description + " </b></div> </a> </div>"

            })
        })
}

