// =============================================
// AUA Internship Hub
// dashboard.js
// FINAL VERSION
// Part 1
// =============================================

// ================= DATA =================

let tasks = JSON.parse(localStorage.getItem("aua_tasks")) || [];

let events = JSON.parse(localStorage.getItem("aua_events")) || [];

let editTaskIndex = -1;

let editEventIndex = -1;

let calendar;

// ================= DEFAULT DATA =================

if(tasks.length===0){

tasks=[

{
title:"Prepare Teaching Materials",
deadline:"2026-07-20",
priority:"Medium",
status:"To Do"
},

{
title:"Observe English Class",
deadline:"2026-07-22",
priority:"Low",
status:"In Progress"
}

];

}

if(events.length===0){

events=[

{
title:"Orientation",
date:"2026-07-10",
time:"09:00",
description:"Intern Orientation"
},

{
title:"Meeting with Mentor",
date:"2026-07-15",
time:"13:00",
description:"Weekly Meeting"
},

{
title:"Mid Evaluation",
date:"2026-08-15",
time:"09:00",
description:"Performance Evaluation"
}

];

}

// ================= SAVE =================

function saveData(){

localStorage.setItem(

"aua_tasks",

JSON.stringify(tasks)

);

localStorage.setItem(

"aua_events",

JSON.stringify(events)

);

}

// ================= TOAST =================

function showToast(message){

const toast=document.createElement("div");

toast.className="toast";

toast.innerHTML=message;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},100);

setTimeout(()=>{

toast.classList.remove("show");

setTimeout(()=>{

toast.remove();

},300);

},2500);

}

// ================= START =================

window.addEventListener("load",()=>{

renderTasks();

renderEvents();

renderCalendar();

});
// =============================================
// TASK SYSTEM
// Part 2
// =============================================

const taskModal=document.getElementById("taskModal");

const addTaskBtn=document.getElementById("addTaskBtn");

const saveTaskBtn=document.getElementById("saveTask");

// =============================

function openTaskModal(){

taskModal.style.display="flex";

}

function closeTaskModal(){

taskModal.style.display="none";

}

window.closeTaskModal=closeTaskModal;

// =============================

addTaskBtn.onclick=()=>{

editTaskIndex=-1;

document.getElementById("taskTitle").value="";

document.getElementById("taskDeadline").value="";

document.getElementById("taskPriority").value="Medium";

document.getElementById("taskStatus").value="To Do";

openTaskModal();

};

// =============================

saveTaskBtn.onclick=()=>{

const title=document.getElementById("taskTitle").value.trim();

const deadline=document.getElementById("taskDeadline").value;

const priority=document.getElementById("taskPriority").value;

const status=document.getElementById("taskStatus").value;

if(title===""||deadline===""){

alert("Please complete all fields.");

return;

}

const task={

title,

deadline,

priority,

status

};

if(editTaskIndex==-1){

tasks.push(task);

showToast("Task Added");

}else{

tasks[editTaskIndex]=task;

showToast("Task Updated");

}

saveData();

renderTasks();

closeTaskModal();

};

// =============================

function editTask(index){

editTaskIndex=index;

const task=tasks[index];

document.getElementById("taskTitle").value=task.title;

document.getElementById("taskDeadline").value=task.deadline;

document.getElementById("taskPriority").value=task.priority;

document.getElementById("taskStatus").value=task.status;

openTaskModal();

}

// =============================

function deleteTask(index){

if(!confirm("Delete this task?")) return;

tasks.splice(index,1);

saveData();

renderTasks();

showToast("Task Deleted");

}

// =============================

window.editTask=editTask;

window.deleteTask=deleteTask;

// =============================

function renderTasks(){

const container=document.getElementById("taskList");

container.innerHTML="";

tasks.forEach((task,index)=>{

container.innerHTML+=`

<div class="task-card">

<div class="task-top">

<h3>${task.title}</h3>

<span class="priority ${task.priority.toLowerCase()}">

${task.priority}

</span>

</div>

<p>

Complete the assigned internship activity.

</p>

<div class="task-footer">

<div>

<strong>${task.deadline}</strong>

<small>Deadline</small>

</div>

<div class="status">

${task.status}

</div>

</div>

<div class="task-action">

<button

class="edit-btn"

onclick="editTask(${index})">

<i class="fa-solid fa-pen"></i>

Edit

</button>

<button

class="delete-btn"

onclick="deleteTask(${index})">

<i class="fa-solid fa-trash"></i>

Delete

</button>

</div>

</div>

`;

});

}
// =============================================
// IMPORTANT DATE SYSTEM
// Part 3
// =============================================

const eventModal=document.getElementById("eventModal");

const addEventBtn=document.getElementById("addEventBtn");

const saveEventBtn=document.getElementById("saveEvent");

// =============================

function openEventModal(){

eventModal.style.display="flex";

}

function closeEventModal(){

eventModal.style.display="none";

}

window.closeEventModal=closeEventModal;

// =============================

addEventBtn.onclick=()=>{

editEventIndex=-1;

document.getElementById("eventTitle").value="";

document.getElementById("eventDate").value="";

document.getElementById("eventTime").value="";

document.getElementById("eventDescription").value="";

openEventModal();

};

// =============================

saveEventBtn.onclick=()=>{

const title=document.getElementById("eventTitle").value.trim();

const date=document.getElementById("eventDate").value;

const time=document.getElementById("eventTime").value;

const description=document.getElementById("eventDescription").value.trim();

if(title===""||date===""){

alert("Please complete all fields.");

return;

}

const event={

title,

date,

time,

description

};

if(editEventIndex==-1){

events.push(event);

showToast("Important Date Added");

}else{

events[editEventIndex]=event;

showToast("Important Date Updated");

}

saveData();

renderEvents();

renderCalendar();

closeEventModal();

};

// =============================

function editEvent(index){

editEventIndex=index;

const event=events[index];

document.getElementById("eventTitle").value=event.title;

document.getElementById("eventDate").value=event.date;

document.getElementById("eventTime").value=event.time;

document.getElementById("eventDescription").value=event.description;

openEventModal();

}

// =============================

function deleteEvent(index){

if(!confirm("Delete this important date?")) return;

events.splice(index,1);

saveData();

renderEvents();

renderCalendar();

showToast("Important Date Deleted");

}

window.editEvent=editEvent;

window.deleteEvent=deleteEvent;

// =============================

function renderEvents(){

const list=document.getElementById("eventList");

list.innerHTML="";

events.forEach((event,index)=>{

list.innerHTML+=`

<li>

<strong>

${new Date(event.date).toLocaleDateString("en-GB")}

</strong>

<br>

${event.title}

<div style="margin-top:10px;display:flex;gap:8px;">

<button

class="edit-btn"

onclick="editEvent(${index})">

Edit

</button>

<button

class="delete-btn"

onclick="deleteEvent(${index})">

Delete

</button>

</div>

</li>

`;

});

}
// =============================================
// FULL CALENDAR
// Part 4
// =============================================

document.addEventListener("DOMContentLoaded",()=>{

renderCalendar();

});

// =============================================

function renderCalendar(){

const calendarEl=document.getElementById("calendar");

if(!calendarEl) return;

// ถ้ามี Calendar อยู่แล้ว ให้ลบก่อน

if(calendar){

calendar.destroy();

}

calendar=new FullCalendar.Calendar(calendarEl,{

initialView:"dayGridMonth",

height:650,

headerToolbar:{

left:"prev,next today",

center:"title",

right:"dayGridMonth,timeGridWeek,listWeek"

},

events:events.map((event,index)=>({

id:index,

title:event.title,

start:event.date,

backgroundColor:"#D4AF37",

borderColor:"#D4AF37",

extendedProps:{

time:event.time,

description:event.description

}

})),

eventClick:function(info){

const event=info.event;

alert(

"Event : "+event.title+

"\n\nDate : "+event.start.toLocaleDateString()+

"\nTime : "+event.extendedProps.time+

"\n\n"+event.extendedProps.description

);

}

});

calendar.render();

}

// =============================================
// Close Modal
// =============================================

window.onclick=function(e){

if(e.target===taskModal){

closeTaskModal();

}

if(e.target===eventModal){

closeEventModal();

}

const courseModal=document.getElementById("courseModal");

if(courseModal && e.target===courseModal){

closeModal();

}

};

// =============================================
// Refresh
// =============================================

function refreshDashboard(){

renderTasks();

renderEvents();

renderCalendar();

saveData();

}

// =============================================

console.log("Calendar Ready");
// =============================================
// COURSE MODAL
// Part 5
// =============================================

function openModal(course){

const body=document.getElementById("modalBody");

switch(course){

case "young":

body.innerHTML=`

<h2>English for Young Learners</h2>

<p><strong>Age :</strong> 9–11 Years</p>

<p>

Develop English through fun activities, games, songs and interactive learning.

</p>

<h3>Skills</h3>

<ul>

<li>Listening</li>

<li>Speaking</li>

<li>Reading</li>

<li>Writing</li>

<li>Vocabulary</li>

<li>Grammar</li>

</ul>

<h3>Course Options</h3>

<ul>

<li> 1 เทอม 32 Hours</li>

14,400 Bath

<li> 2 เทอม 64 Hours</li>

28,800 Bath

<li> 1 ระดับ 128 Hours</li>

57,600 Bath

</ul>

`;

break;

case "junior":

body.innerHTML=`

<h2>Junior English for Communication</h2>

<p><strong>Age :</strong> 12–14 Years</p>

<p><strong>Levels :</strong> A1–B2</p>

<h3>Course Focus</h3>

<ul>

<li>Listening</li>

<li>Speaking</li>

<li>Reading</li>

<li>Writing</li>

<li>Grammar</li>

</ul>

<p><strong>120 Hours (24 Weeks)</strong></p>

<p><strong>Course Fee : 33,000 THB</strong></p>

`;

break;

case "communication":

body.innerHTML=`

<h2>English for Communication</h2>

<p><strong>Age :</strong> 15 Years and Above</p>

<p><strong>Levels :</strong> A1, A2, B1, B1+, B2, C1</p>

<h3>Course Focus</h3>

<ul>

<li>Listening</li>

<li>Speaking</li>

<li>Reading</li>

<li>Writing</li>

<li>Grammar</li>

<li>Vocabulary</li>

</ul>

<p><strong>A1–B1+</strong></p>

<p>80 Hours (16 Weeks)</p>

<p>22,000 THB</p>

<br>

<p><strong>B2–C1</strong></p>

<p>120 Hours (24 Weeks)</p>

<p>33,000 THB</p>

`;

break;

default:

body.innerHTML=`

<h2>English for Business</h2>

<p><strong>Minimum Level :</strong> B1+</p>

<h3>Course Focus</h3>

<ul>

<li>Business Communication</li>

<li>Email Writing</li>

<li>Presentation Skills</li>

<li>Meetings</li>

<li>Negotiation</li>

<li>Customer Service</li>

</ul>

<p>

Business English course for professional communication in the workplace.

</p>

`;

}

document.getElementById("courseModal").style.display="flex";

}

window.openModal=openModal;

// =============================================

function closeModal(){

document.getElementById("courseModal").style.display="none";

}

window.closeModal=closeModal;

// =============================================
// Smooth Scroll
// =============================================

document.querySelectorAll(".menu a").forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth",

block:"start"

});

}

});

});

// =============================================
// Welcome Toast
// =============================================

window.addEventListener("load",()=>{

setTimeout(()=>{

showToast("Welcome to AUA Internship Hub");

},800);

});

// =============================================

console.log("Course Module Ready");
// =============================================
// FINAL PART
// Dashboard.js
// =============================================

// =============================
// Logout
// =============================

const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click",()=>{

const ok = confirm("Are you sure you want to logout?");

if(ok){

localStorage.removeItem("currentUser");

window.location.href="login.html";

}

});

}

// =============================
// Active Menu
// =============================

const sections=document.querySelectorAll("section");

const menuLinks=document.querySelectorAll(".menu li");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=section.offsetTop-120;

if(window.scrollY>=sectionTop){

current=section.getAttribute("id");

}

});

menuLinks.forEach(item=>{

item.classList.remove("active");

const link=item.querySelector("a");

if(link){

const href=link.getAttribute("href");

if(href==="#"+current){

item.classList.add("active");

}

}

});

});

// =============================
// Fade Animation
// =============================

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{

threshold:0.15

});

document.querySelectorAll(

".announcement-card,.placement-card,.course-card,.task-card,.calendar-wrapper"

).forEach(el=>{

observer.observe(el);

});

// =============================
// Keyboard Shortcut
// Ctrl + N = Add Task
// =============================

document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.key==="n"){

e.preventDefault();

if(typeof openTaskModal==="function"){

openTaskModal();

}

}

});

// =============================
// Auto Save
// =============================

setInterval(()=>{

saveData();

},30000);

// =============================
// Dashboard Ready
// =============================

console.log("====================================");

console.log("AUA Internship Hub Ready");

console.log("Task Module Loaded");

console.log("Calendar Module Loaded");

console.log("Course Module Loaded");

console.log("====================================");