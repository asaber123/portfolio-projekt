"use strict";const coursesboxEl=document.getElementById("coursesBox"),employmentEL=document.getElementById("employment"),projectsEL=document.getElementById("projects");function getCourses(){coursesboxEl.innerHTML="",fetch("http://asaberglund.se/rest-projekt/courses.php").then((e=>e.json())).then((e=>{e.forEach((e=>{coursesboxEl.innerHTML+="<div id='course'><h3>"+e.name+"</h3><b> "+e.university+" </b><br><a href='"+e.link+"'> Kurslänk </a> <br><p>"+e.description+"</p></div>"}))}))}function getWorkExperience(){employmentEL.innerHTML="",fetch("http://asaberglund.se/rest-projekt/workplaces.php/").then((e=>e.json())).then((e=>{e.forEach((e=>{employmentEL.innerHTML+="<div class='employment-div'><div class='employment-name'><h3>"+e.name+"</h3><b>"+e.description+"</b> <br><b>"+e.date+"</b> </div><div class='employment-description'><h3> Beskrivning:</h3><p>"+e.text+"</p> </div> </div>"}))}))}function getProjects(){projectsEL.innerHTML="",fetch("http://asaberglund.se/rest-projekt/projects.php/").then((e=>e.json())).then((e=>{e.forEach((e=>{projectsEL.innerHTML+="<div class='project'><iframe class='project-box' src='"+e.link+"' height='250' width='300' title='"+e.name+"'></iframe><a href='"+e.link+"'><div class='overlay'> <h3>"+e.name+"</h3><b>"+e.description+" </b></div> </a> </div>"}))}))}function toggleFunction(){$(".navbar").toggle(0)}window.addEventListener("load",getCourses),window.addEventListener("load",getWorkExperience),window.addEventListener("load",getProjects);
//# sourceMappingURL=../maps/main.js.map
