"use strict"
//Get elements from html and creates variables

const coursesboxEl = document.getElementById("coursesBox");
const employmentEL = document.getElementById("employment");

//Eventlisteners
window.addEventListener('load', getCourses);
window.addEventListener('load', getCourses);

//Funktion för att hämta kurser från rest-api
function getCourses(){
    console.log("hejhej")
    //Gör så att denna funktion körs varje gång fönstret laddas 
    coursesboxEl.innerHTML ='';

    fetch('http://localhost:8080/rest-projekt/courses.php')
    .then(response => response.json())
    .then(data =>{
        data.forEach(course => {
            console.log(course);
            coursesboxEl.innerHTML += 
            "<div id='course'>"+
            "<h3>" + course.name + "</h3>" +
            "<b>DATUM</b> <br>" +
            "<a href='"+ course.link +"'> Kurslänk </a> <br>" +
            "<p>" + course.description + "</p></div>";
        })
    })
}
