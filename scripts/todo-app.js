'use strict';

let myTodos = getSavedTodos();

const filter = {
  searchText: '',
  hideCompleted: false,
};

render(myTodos, filter);
document.querySelector('#filter-todos').addEventListener('input', (e) => {
  filter.searchText = e.target.value;
  render(myTodos, filter);
});

document.querySelector('#checking').addEventListener('change', (e) => {
  e.preventDefault();
  filter.hideCompleted = e.target.checked;
  render(myTodos, filter);
});

document.querySelector('#new-todo').addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.elements.newTodo.value.trim()) {
    myTodos.push({
      id: uuidv4(),
      title: e.target.elements.newTodo.value,
      completed: false,
    });
  }
  e.target.elements.newTodo.value = '';
  saveTodos(myTodos);
  render(myTodos, filter);
});

document.querySelector('#selection').addEventListener('change', (e) => {
  console.log(e.target.value);
});

// localStorage.setItem('location', 'Nairobi');
// console.log(localStorage.getItem('location'));

// for (let todo = 0; todo < myTodos.length; todo++) {
//   const p = document.createElement('p');
//   p.textContent = myTodos[todo].title;
//   document.querySelector('body').appendChild(p);
// }
// myTodos.forEach(function (todo) {
//   const p = document.createElement('p');
//   p.textContent = todo.title;
//   document.querySelector('body').appendChild(p);
// });

// document.querySelector('#add-todo').addEventListener('click', function () {
//   console.log('This button has been clicked');
// });
