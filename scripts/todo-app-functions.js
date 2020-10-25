'use strict';
//Get saved Todos from localStorage
const getSavedTodos = (myTodos) => {
  const addTodo = localStorage.getItem('todos');
  try {
    return addTodo ? (myTodos = JSON.parse(addTodo)) : [];
  } catch (error) {
    return [];
  }
};

//Save todos to local storage
const saveTodos = (myTodos) => {
  localStorage.setItem('todos', JSON.stringify(myTodos));
};

//Render todos based on filters
const render = (todos, filter) => {
  const filtered = todos.filter(function (todo) {
    const searchTodos = todo.title
      .toLowerCase()
      .includes(filter.searchText.toLowerCase());
    const hideTodos = !filter.hideCompleted || !todo.completed;
    return searchTodos && hideTodos;
  });

  document.querySelector('#todos').innerHTML = '';
  const completas = filtered.filter(function (todo) {
    return !todo.completed;
  });

  document
    .querySelector('#todos')
    .appendChild(domElementsForListSummary(completas));

  if (filtered.length > 0) {
    filtered.forEach(function (todo) {
      document
        .querySelector('#todos')
        .appendChild(domElementsForIndividualTodo(todo));
    });
  } else {
    const noElements = document.createElement('p');
    noElements.textContent = 'No to-dos to show';
    noElements.classList.add('list-item');
    document.querySelector('#todos').appendChild(noElements);
  }
};

//Remove the individual todo by its ID

const removeTodos = (id) => {
  const todoIndex = myTodos.findIndex((todo) => todo.id === id);

  if (todoIndex > -1) {
    myTodos.splice(todoIndex, 1);
  }
};

//Get the dom elements for an individual todo

const domElementsForIndividualTodo = (todo) => {
  const todoEl = document.createElement('label');
  const container = document.createElement('div');
  const checkbox = document.createElement('input');
  const textEl = document.createElement('span');
  const button = document.createElement('button');

  //Set up our checkbox
  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = todo.completed;
  container.appendChild(checkbox);
  checkbox.addEventListener('click', function () {
    toggleCompleted(todo.id);
    saveTodos(myTodos);
    render(myTodos, filter);
  });

  //Set up our text

  textEl.textContent = todo.title;
  container.appendChild(textEl);

  //setup container
  todoEl.classList.add('list-item');
  container.classList.add('list-item__container');
  todoEl.appendChild(container);

  //Set up our button
  button.textContent = 'remove';
  button.classList.add('button', 'button--text');
  todoEl.appendChild(button);
  button.addEventListener('click', function () {
    removeTodos(todo.id);
    saveTodos(myTodos);
    render(myTodos, filter);
  });

  return todoEl;
};

//Toggle the checkbox and change the completed property
const toggleCompleted = (id) => {
  const todo = myTodos.find((todo) => todo.id === id);

  if (todo) {
    return (todo.completed = !todo.completed);
  }
};

//Get the dom elements for list summary
const domElementsForListSummary = (completas) => {
  const para = document.createElement('h2');
  if (completas.length === 1) {
    para.textContent = `You have ${completas.length} todo to complete`;
  } else {
    para.textContent = `You have ${completas.length} todos to complete`;
  }
  para.classList.add('list-item');
  return para;
};
