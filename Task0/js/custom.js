const myShowHidden = document.querySelector('#showHidden button');
const myForm = document.querySelector('#myForm');
const taskHead = ['taskTitle', 'taskType', 'taskContent']
const myFormData = document.querySelector('#myForm form')
const taskWrap = document.querySelector('#tasksWrap .row')
const myTaskTitle = document.querySelector('#taskTitle')
const myTaskType = document.querySelector('#taskType')
const myTaskContent = document.querySelector('#taskContent')
const myaddTask = document.querySelector('#addTask')
const myBtnShowOrHide = document.querySelector('#btnShowOrHide')
let tasks = [];
let myTask = tasks.find(t => t.id === taskId);

let createNewElement = (elementTag, elementTxt, elementClasses,parent, attributes) =>{
    myNewEl = document.createElement(elementTag)
    if(elementTxt!='') myNewEl.innerText = elementTxt
    if(elementClasses!="") myNewEl.className =elementClasses
    parent.appendChild(myNewEl)  
    attributes.forEach(attr=>{
            myNewEl.setAttribute(attr.attrName, attr.attrVal)
        })
        return myNewEl  
}
showHideEvent = function(e){
    myForm.classList.toggle('d-none')
    if(e.target) this.innerText === "show form"?  this.innerText = "hide form" : this.innerText = "show form"
    else{ e.innerText="show form" }
}
getTasks = () => {
    return tasks = JSON.parse(localStorage.getItem('tasks')) || [];
}
setTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
addTask = function(e){
    e.preventDefault();
    let task = {id: new Date().getTime(), status: false}
    taskHead.forEach(head=> task[head] = this.elements[head].value);
    tasks = getTasks();
    if(!(task.taskTitle && task.taskType && task.taskContent)){
        alert("no empry fields")
    }else{
    tasks.push(task);
    setTasks(tasks);
    showTask(task);
    this.reset();
    showTasks();
    alert('Task Add Successfully')
    }

}
deleteTask = (task) => {
    i = tasks.findIndex(t => t.id == task.id)
    tasks.splice(i, 1);
    setTasks(tasks);
    showTasks();
    alert('Task Delete Successfully')
}

showTasks = () => {
    tasks = getTasks();
    taskWrap.innerText = '';
    if(tasks.length == 0 ) createNewElement('div', 'No tasks to shwo', 'alert alert-danger', taskWrap, [])
    else tasks.forEach((task, i) => {
        showTask(task)
    })
}
showTask = (task) => {
    col4Div = createNewElement('div', '', 'col-4', taskWrap, []);
    contentDiv = createNewElement('div', '', 'm-3 border border-priamry border-3 p-2 bg-danger text-white',col4Div, [])
    createNewElement('h2', task.taskTitle, '', contentDiv, [])
    createNewElement('p', task.taskContent, '', contentDiv, [])
    btnDel = createNewElement('button', 'Delete', 'btn btn-warning', contentDiv, [])
    btnEdit = createNewElement('button', 'Edit', 'btn btn-success', contentDiv, [])
    btnDel.addEventListener('click', function(e){deleteTask(task)})
    btnEdit.addEventListener('click', function(e){editTask(e, task)})
}
myShowHidden.addEventListener('click', showHideEvent)
myFormData.addEventListener('submit', addTask)

showTasks();