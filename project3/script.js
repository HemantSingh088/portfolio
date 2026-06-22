let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){

    let input = document.getElementById("taskInput");

    if(input.value === "") return;

    tasks.push({
        text: input.value,
        completed: false
    });

    input.value = "";

    saveTasks();
    showTasks("all");
}

function showTasks(filter){

    let list = document.getElementById("taskList");

    list.innerHTML = "";

    tasks.forEach((task,index)=>{

        if(filter==="active" && task.completed) return;

        if(filter==="completed" && !task.completed) return;

        let li = document.createElement("li");

        li.innerHTML = `
        <span class="${task.completed ? 'completed' : ''}">
            ${task.text}
        </span>

        <button onclick="completeTask(${index})">Done</button>

        <button onclick="editTask(${index})">Edit</button>

        <button onclick="deleteTask(${index})">Delete</button>
        `;

        list.appendChild(li);
    });
}

function completeTask(index){

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    showTasks("all");
}

function editTask(index){

    let newTask = prompt("Edit Task", tasks[index].text);

    if(newTask){
        tasks[index].text = newTask;
    }

    saveTasks();

    showTasks("all");
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    showTasks("all");
}

showTasks("all");