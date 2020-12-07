//var todo
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const items = document.querySelector('.items');
const reset = document.querySelector('#reset');
const select = document.querySelector('#select');

//Extra var
let list = [];
let id = 0;

//Event handlers
allEvents();

function allEvents() {
  document.addEventListener('DOMContentLoaded', getTodos);
  form.addEventListener('submit', addTodo);
  items.addEventListener('click', removeTodo);
  items.addEventListener('click', completeTodo);
  reset.addEventListener('click', resetAllTodo);
  select.addEventListener('change', selectTodo);
}

// Print todo in screen
function printTodo(todo) {
  let innerContext;
  todo.forEach((element) => {
    innerContext = `<li class="item">${element.name.substring(0, 30)}
                            <span class="icons">
                            <i class="fas fa-check modify-icon" id="done"></i>
                            <i class="fas fa-times modify-icon" id="delete"></i>
                            </span>
                         </li>`;
  });
  items.innerHTML += innerContext;
}

//get all todos
function getTodos() {
  let todosList;
  if (localStorage.getItem('todos') == null) {
    todosList = [];
  } else {
    todosList = JSON.parse(localStorage.getItem('todos'));
  }

  let innerContext;
  if (todosList.length > 0) {
    todosList.forEach((todo) => {
      innerContext = `<li class="item ${todo.status}">${todo.name.substring(
        0,
        30
      )}
                              <span class="icons">
                              <i class="fas fa-check modify-icon" id="done"></i>
                              <i class="fas fa-times modify-icon" id="delete"></i>
                              </span>
                           </li>`;
      items.innerHTML += innerContext;
    });
  }
}

// Add a new todo
function addTodo(e) {
  e.preventDefault();
  //input value with html validations
  const plusItem = input.value.replace(/<[^>]*>/g, '');
  if (plusItem.length > 0) {
    const objItem = {
      id: id,
      name: plusItem,
      status: 'notdone',
    };
    list.push(objItem);
    printTodo(list);
    input.value = '';
    id++;

    storeTodo(objItem);
  } else {
  }
}

//Complete todo
function completeTodo(e) {
  const todos = document.querySelectorAll('.items li');
  const todoItem = e.target.parentNode.parentNode;

  todos.forEach(function (todo, index) {
    if (todoItem == todo) {
      if (e.target.getAttribute('id') == 'done') {
        todoItem.classList.add('done');
        list[index].status = 'done';
        completeTodoLocalStorage(index);
      }
    }
  });
}

//Remove Todo
function removeTodo(e) {
  const todos = document.querySelectorAll('.items li');
  const todoItem = e.target.parentNode.parentNode;
  var indexTodo;

  todos.forEach(function (todo, index) {
    if (todoItem == todo) {
      if (e.target.getAttribute('id') == 'delete') {
        todoItem.remove();
        list.splice(index, 1);
        deleteTodoLocalStorage(index);
      }
    }
  });

  e.preventDefault();
}

//Clear all todo
function resetAllTodo(e) {
  const todos = document.querySelectorAll('.items li');
  if (items.firstChild) {
    todos.forEach((todo) => {
      todo.remove();
    });
  }
  localStorage.clear();
}

//selectTodo
function selectTodo(e) {
  const todos = document.querySelectorAll('.items li');
  console.log(e.target.value.toLowerCase());
  // option done
  if (e.target.value.toLowerCase() == 'done') {
    todos.forEach((todo) => {
      if (todo.classList.contains('done')) {
        todo.style.display = 'flex';
      } else {
        todo.style.display = 'none';
      }
    });
  }

  // option not done
  if (e.target.value.toLowerCase() == 'not done') {
    todos.forEach((todo) => {
      if (todo.classList.contains('done')) {
        todo.style.display = 'none';
      } else {
        todo.style.display = 'flex';
      }
    });
  }

  // option not done
  if (e.target.value.toLowerCase() == 'all') {
    todos.forEach((todo) => {
      todo.style.display = 'flex';
    });
  }
}

//Store todo in localStorage
function storeTodo(todo) {
  let todosList;
  if (localStorage.getItem('todos') === null) {
    todosList = [];
  } else {
    todosList = JSON.parse(localStorage.getItem('todos'));
  }

  todosList.push(todo);
  localStorage.setItem('todos', JSON.stringify(todosList));
}

//Delete todo from localStorage
function deleteTodoLocalStorage(index) {
  let todosList;
  if (localStorage.getItem('todos') === null) {
    todosList = [];
  } else {
    todosList = JSON.parse(localStorage.getItem('todos'));
  }

  todosList.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todosList));
}

//Complete todo in localStorage
function completeTodoLocalStorage(index) {
  let todosList;
  if (localStorage.getItem('todos') === null) {
    todosList = [];
  } else {
    todosList = JSON.parse(localStorage.getItem('todos'));
  }

  todosList[index].status = 'done';
  localStorage.setItem('todos', JSON.stringify(todosList));
}
