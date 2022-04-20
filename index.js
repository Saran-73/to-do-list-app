
let arrOfTasks=[]

const input=document.querySelector('.getInput')
const enter=document.getElementById('button')
enter.addEventListener('click',data) 
const taskList=document.querySelector('.displayTasks')

const taskInLocalStorage=JSON.parse(localStorage.getItem('tasks'))
if(taskInLocalStorage){
arrOfTasks=taskInLocalStorage;
renderStored(arrOfTasks)
}

//new object of data is created in the array
function data(){ 
 arrOfTasks.push({
    id:arrOfTasks.length,
    content:input.value,
    isClicked:false
    })

 arrOfTasks=arrOfTasks.filter(x=>x.content!='')
 setLocalStorage()
 render()
 input.value='';
}

//new element is created in DOM
function render(){
   if(input.value==='') return;
   const cardElem=document.createElement('div')
   cardElem.setAttribute('data-id',arrOfTasks.length-1)
   cardElem.setAttribute('class','card')
    const newElem=document.createElement('p')
   const delElem=document.createElement('img')
   delElem.setAttribute('src','images/delete-77-32.png')
   delElem.setAttribute('data-id',arrOfTasks.length-1)
   delElem.addEventListener('click',deleteCard)
    newElem.setAttribute('data-id',arrOfTasks.length-1)
   newElem.setAttribute('data-clicked','false')
    newElem.textContent=arrOfTasks[arrOfTasks.length-1].content
   const contentDiv=document.createElement('div')
   contentDiv.setAttribute('class','seconddiv')
   const checkBoxDiv=document.createElement('div')
   checkBoxDiv.setAttribute('class','firstdiv')
   const checkBoxContainer=document.createElement('div')
   checkBoxContainer.setAttribute('class','checkmark')
   checkBoxContainer.setAttribute('data-clicked','false')
   checkBoxContainer.addEventListener('click',markComplete)
   checkBoxContainer.setAttribute('data-id',arrOfTasks.length-1)

   checkBoxDiv.append(checkBoxContainer)
   cardElem.append(checkBoxDiv) 
   contentDiv.append(newElem)
   contentDiv.append(delElem) 
   cardElem.append(contentDiv) 
   taskList.append(cardElem) 
}


//updating attribute and data of the choosen element
function markComplete(){
const id= this.getAttribute('data-id')
const pElem=document.querySelectorAll('p')

if(pElem[id].getAttribute('data-clicked')==='false'){
   pElem[id].setAttribute('data-clicked','true')
}else{
   pElem[id].setAttribute('data-clicked','false')
}

 arrOfTasks[id]={
    id: arrOfTasks[id].id,
   content: arrOfTasks[id].content,
    isClicked:!arrOfTasks[id].isClicked
 }
if(this.getAttribute('data-clicked')==='false'){
    this.setAttribute('data-clicked','true')
}else{
    this.setAttribute('data-clicked','false')
}
setLocalStorage()
}

//clicking bin image will delete the elem from local storage & document
function deleteCard(){
   const id= this.getAttribute('data-id')
   arrOfTasks=arrOfTasks.filter(x=>x.id!=id).map((y,j)=>{
      return { 
       id:j,
       content:y.content,
       isClicked:y.isClicked
      }
       })
   setLocalStorage()

   const taskCard=document.querySelectorAll('.card')
   for(let i=0;i<taskCard.length;i++){
    if(taskCard[i].getAttribute('data-id') === id){
        taskList.removeChild(taskCard[i])
   }}
changeId()
}

//update id in dom elements
function changeId(){
   const allCard=document.querySelectorAll(".card")
   const pEl=document.getElementsByTagName('p')
   const imgEl=document.getElementsByTagName('img')
   const allCheckmark=document.querySelectorAll(".checkmark")
   
   for(let i=0;i<allCard.length;i++){
      allCard[i].setAttribute("data-id",i)
      pEl[i].setAttribute("data-id",i)
      imgEl[i].setAttribute("data-id",i)
      allCheckmark[i].setAttribute("data-id",i)
   }
   }

// loops occurs only on the page load to display the previously stored tasks
function renderStored(tasks){

for(let i=0;i<tasks.length;i++){
   const cardElem=document.createElement('div')
   cardElem.setAttribute('data-id',tasks[i].id)
   cardElem.setAttribute('class','card')
   const newElem=document.createElement('p')
   const delElem=document.createElement('img')
   delElem.setAttribute('src','images/delete-77-32.png')
   delElem.setAttribute('data-id',tasks[i].id)
   delElem.addEventListener('click',deleteCard)
   newElem.setAttribute('data-clicked',tasks[i].isClicked)
   newElem.setAttribute('data-id',tasks[i].id)
    newElem.textContent=tasks[i].content
    const contentDiv=document.createElement('div')
    contentDiv.setAttribute('class','seconddiv')
    const checkBoxDiv=document.createElement('div')
    checkBoxDiv.setAttribute('class','firstdiv')
    const checkBoxContainer=document.createElement('div')
    checkBoxContainer.setAttribute('class','checkmark')
    checkBoxContainer.setAttribute('data-clicked',tasks[i].isClicked)
    checkBoxContainer.addEventListener('click',markComplete)
    checkBoxContainer.setAttribute('data-id',tasks[i].id)

   checkBoxDiv.append(checkBoxContainer)
   cardElem.append(checkBoxDiv) 
   contentDiv.append(newElem)
   contentDiv.append(delElem) 
   cardElem.append(contentDiv) 
   taskList.append(cardElem) 
}
}

const setLocalStorage=()=>localStorage.setItem('tasks',JSON.stringify(arrOfTasks))

