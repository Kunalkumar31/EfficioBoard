const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
let dragElemet = null;


const tasks = document.querySelectorAll('.task');

tasks.forEach(tasks => {
    tasks.addEventListener("drag", (e) => {
        dragElemet = tasks;
    })
});

// progress.addEventListener("dragenter", (e) => {
//     progress.classList.add("hover-over");
// })

// progress.addEventListener("dragleave", (e) => {
//     progress.classList.remove("hover-over");
// })

function addDragEventsOnColumn(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    })
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    })

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    column.addEventListener("drop", (e) => {
        e.preventDefault();
        column.appendChild(dragElemet);
        column.classList.remove("hover-over");

    })
}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);


/*Modal related logic*/
const toggleModalButton = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskButton = document.querySelector("#add-new-task");


toggleModalButton.addEventListener("click", () => {
    modal.classList.toggle("active");
})
modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
})

addTaskButton.addEventListener("click", () => {
    const taskTittele = document.querySelector("#task-title-input").value
    const taskDesc = document.querySelector("#task-desc-input").value

    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
    <h2>${taskTittele}</h2>
    <p>${taskDesc}</p>
    <button>Delete</button>
    `
    todo.appendChild(div);
    div.addEventListener("drag",(e)=>{
        dragElemet=div;
    })
    modal.classList.remove("active");
})



/*Modal related logic*/