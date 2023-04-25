let addMessage = document.querySelector('.message');
let addButton = document.querySelector('.add');
let todo = document.querySelector('.todo');


let todoList = [];

if(localStorage.getItem('todo')){  //получаем данные с localStorage и выводим на страницу
    todoList = JSON.parse(localStorage.getItem('todo'))
    displayMessages();
}

addButton.addEventListener('click', function(){ //отслеживаем клик по кнопке добавить
    let newTodo = {
        todo:addMessage.value, //значение дела
        checked: false,         //дело выполнено или нет
        important: false
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
                <button class="btnDelete" onclick = 'deleteButton(item_${i})'>удалить</button>    
                                   
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

function deleteButton(i){

    let del = document.querySelector('#i')
   localStorage.clear();

}





// let del =  document.querySelector('.btnDelete');

// del.addEventListener('click',function(event){
//     console.log(del)

//     todoList.forEach(function(item,i){
//         if(item.todo === event.target){
//             todoList.splice(i,1)
//             displayMessages();
//             localStorage.setItem('todo', JSON.stringify(todoList));
//         }
//     })
// })
// ______________________________


