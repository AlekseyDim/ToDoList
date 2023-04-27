let addMessage = document.querySelector('.message');
let addButton = document.querySelector('.add');
let todo = document.querySelector('.todo');


let todoList = [];

if(localStorage.getItem('todo')){  //получаем данные с localStorage и выводим на страницу
    todoList = JSON.parse(localStorage.getItem('todo'))
    displayMessages();
}

addButton.addEventListener('click', function(){ //отслеживаем клик по кнопке добавить
    if(!addMessage.value) return;                
    let newTodo = {
        todo:addMessage.value,                  //значение дела
        checked: false,                         //дело выполнено или нет
        important: false                        // важность дела
    }

    todoList.push(newTodo);
    displayMessages()

    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';

});

function displayMessages(){  //выводим список дел
    let displayMessage = '';
    todoList.forEach(function(item, i){
        displayMessage += `
            <li>
                <input type='checkbox' id ='item_${i}' ${item.checked ? 'checked':''}>
                <label for='item_${i}' class = "${item.important ? 'important' : ''}">${item.todo}</label>
                <button class="btnDelete" data-action="delete">удалить</button>    
                                   
            </li>
        `
        
        todo.innerHTML = displayMessage;
    })

}
   
todo.addEventListener('change', function(event){ // ставим прослушку на изменения списка(ставим галочку и сохраняем в localStorage)
    let idInput = event.target.getAttribute('id');// элемент который вызвал событие
    let forLabel = todo.querySelector('[for='+ idInput +']')// ищем label с необходимым id  
    let valueLabel = forLabel.innerHTML;

    todoList.forEach(function(item){
        if(item.todo === valueLabel){
            item.checked = !item.checked;//меняем значение на противоположный
            localStorage.setItem('todo', JSON.stringify(todoList));//сохраняем новые изменеия в localStorage
        }
    })
})

todo.addEventListener('contextmenu', function(event){ //добавляем выделение выжных дел(выделяем красным)
    event.preventDefault();// отменяем стадартное поведение браузера
    todoList.forEach(function(item){
        if(item.todo === event.target.innerHTML){
            item.important = !item.important;
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
})

// delete

todo.addEventListener('click', deleteTask) // ставим прослушку на клик по списку

function deleteTask(event){
    if(event.target.dataset.action === 'delete')  {//если нажали по кнопке 'удалить', удаляем  задачу
        let parentNode = event.target.closest('li');//ищем родительский 'li'

        let label = parentNode.querySelector('li > label')//вытаскиваем  label 

        let labelValue = label.innerHTML; // получаем значение нашей задачи(которую надо удалить)

        todoList.forEach(function(item, i){

            if(item.todo === labelValue){
                todoList.splice(i,1);//удаляем задачу из нашего списка
                localStorage.setItem('todo', JSON.stringify(todoList));//перезаписываем в localStorage оставшиеся задачи 
            }
        })
      
        parentNode.remove();
    }
}



