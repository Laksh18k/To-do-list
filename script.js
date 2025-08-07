const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

taskInput.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
        addTask()
    }
});

function addTask() {
    const tasktext = taskInput.value.trim();
    if (tasktext === "") return;

    const li = document.createElement("li")
    li.textContent = tasktext;

    li.addEventListener("dblclick", () => {
        li.classList.toggle("completed")
        sortTasksByPriority()
    });

    const starContainer = document.createElement("div")
    starContainer.classList.add("star")

    let currentPriority = 0

    for (let i = 1; i <= 3; i++) {
        const star = document.createElement("span")
        star.textContent = "☆"
        star.dataset.value = i

        star.addEventListener("click", () => {
            currentPriority = i
            UpdateStars()
            li.classList.remove("priority-1", "priority-2", "priority-3")
            li.classList.add(`priority-${i}`)
            li.dataset.priority = i;
            sortTasksByPriority();
        })
        starContainer.appendChild(star);
    }
    function UpdateStars() {
        const stars = starContainer.querySelectorAll("span");
        stars.forEach((s, idx) => {
            s.textContent = idx < currentPriority ? "★" : "☆";
        })

    }




    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = (e) => {
        e.stopPropagation();
        li.remove();
    };


    li.appendChild(starContainer);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

/////////////######## ChatGpt############### can also use render
  function sortTasksByPriority() {
    const tasks = Array.from(taskList.children);

    tasks.sort((a, b) => {
        const priorityA = parseInt(a.dataset.priority) || 4;
        const priorityB = parseInt(b.dataset.priority) || 4;


        const isCompletedA = a.classList.contains("completed") ? 1 : 0;
        const isCompletedB = b.classList.contains("completed") ? 1 : 0;

        return isCompletedA - isCompletedB || priorityB - priorityA;
    });
////////////////////////////////////////////////////////////////////////
    taskList.innerHTML = "";
    tasks.forEach(task => taskList.appendChild(task));
}




    taskInput.value = "";
}