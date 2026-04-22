


const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const columns = [todo, progress, done];

let taskData = {}
let dragElemet = null;



function addTask(title, desc, column) {
    const div = document.createElement("div")

    div.classList.add("task");
    div.setAttribute("draggable", "true")

    div.innerHTML = `
    <h2>${title}</h2>
    <p>${desc}</p>
    <button>Delete</button>
    `
    column.appendChild(div);

    div.addEventListener("drag", (e) => {
        dragElemet = div;
    })
    const deleteButton = div.querySelector("button");
    deleteButton.addEventListener("click", () => {
        div.remove();
        updateTaskCount();
    })
    return div;
}

function updateTaskCount() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll('.task');
        const count = col.querySelector('.right');

        taskData[col.id] = Array.from(tasks).map(t => {
            return {
                title: t.querySelector('h2').innerText,
                desc: t.querySelector('p').innerText
            }
        })

        localStorage.setItem("tasks", JSON.stringify(taskData));
        count.innerText = tasks.length;
    })

}

if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));


    for (const col in data) {
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task => {
            //     const div = document.createElement("div")

            //     div.classList.add("task")
            //     div.setAttribute("draggable", "true")

            //     div.innerHTML = `
            // <h2>${task.title}</h2>
            // <p>${task.desc}</p>
            // <button>Delete</button>
            // `
            //     column.appendChild(div)
            //     div.addEventListener("drag", (e) => {
            //         dragElemet = div;
            //     })
            addTask(task.title, task.desc, column);
        })

        // const tasks = column.querySelectorAll(".task");
        // const count = column.querySelector(".right");
        // count.innerText = tasks.length;

    }
    updateTaskCount();
}

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

        updateTaskCount();

        // columns.forEach(col => {
        //     const tasks = col.querySelectorAll('.task');
        //     const count = col.querySelector('.right');

        //     taskData[col.id] = Array.from(tasks).map(t => {
        //         return {
        //             title: t.querySelector('h2').innerText,
        //             desc: t.querySelector('p').innerText
        //         }
        //     })

        //     localStorage.setItem("tasks", JSON.stringify(taskData));
        //     count.innerText = tasks.length;
        // })


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
    const taskTitle = document.querySelector("#task-title-input").value
    const taskDesc = document.querySelector("#task-desc-input").value



    // const div = document.createElement("div");
    // div.classList.add("task");
    // div.setAttribute("draggable", "true");

    // div.innerHTML = `
    // <h2>${taskTittele}</h2>
    // <p>${taskDesc}</p>
    // <button>Delete</button>
    // `
    // todo.appendChild(div);

    addTask(taskTitle, taskDesc, todo);


    columns.forEach(col => {
        const tasks = col.querySelectorAll('.task');
        const count = col.querySelector('.right');

        count.innerText = tasks.length;
    })

    updateTaskCount();

    // div.addEventListener("drag", (e) => {
    //     dragElemet = div;
    // })
    modal.classList.remove("active");

    document.querySelector("#task-title-input").value = "";
    document.querySelector("#task-desc-input").value = "";

})



/*Modal related logic*/