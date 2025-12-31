document.addEventListener("DOMContentLoaded",()=>{
    const todoinput = document.getElementById("todo-input");
    const addtaskbtn = document.getElementById("add task-btn");
    const todolist = document.getElementById("todo-list");
    const popSound = new Audio("pop.mp3");
   
    let tasks = JSON.parse(localStorage.getItem("tasks"))||[];

    tasks.forEach((task) => renderTasks(task));
   
    addtaskbtn.addEventListener('click',()=>{
       const tasktest = todoinput.value.trim();
       if(tasktest==="" )return ;
   
       const newTask = {
           id: Date.now(),
           Text: tasktest,
           completed: false
       }
       tasks.push(newTask);
       saveTasks();
       renderTasks(newTask);
       todoinput.value = "";
       console.log(tasks)
    })
   
   function renderTasks(task){
       const li = document.createElement('li')
        li.setAttribute('data-id',task.id)
        if(task.completed) li.classList.add("completed");
        li.innerHTML =`
         <span>${task.Text}</span>
        <button class="delete">🗑️</button>
`;
        li.addEventListener('click',(e)=>{
            if(e.target.tagName ==='BUTTON') return;
            task.completed = !task.completed
            li.classList.toggle("completed")
            saveTasks();
        })


        li.querySelector('button').addEventListener('click',(e)=>{
            e.stopPropagation()//prevent toggle from firing
            popSound.currentTime = 0;
            popSound.play();

            li.classList.add("pop");   // 👈 trigger animation

            setTimeout(() => {
             tasks = tasks.filter(t => t.id !== task.id);
             saveTasks();
            li.remove();             // 👈 remove AFTER animation
             }, 350); 
        })



        todolist.append(li);
       
   
   }
    function saveTasks(){
       localStorage.setItem('tasks',JSON.stringify(tasks));
    }
   
})