'use strict'

let tasks = [];
let taskId = 0;


// ----- search task
const searchInput = document.querySelector('.search-for-task-bar');
const searchResults = document.querySelector('.search-results');

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  if (searchTerm === '') {
    // If the input field is empty, clear the search results
    searchResults.innerHTML = '';
  } else {
    const filteredTasks = tasks.filter((task) => {
      const taskText = task.text.toLowerCase();
      return taskText.includes(searchTerm);
    });

    console.log('Filtered tasks:', filteredTasks);

    searchResults.innerHTML = '';
    filteredTasks.forEach((task) => {
      const taskElement = document.createElement('div');
      taskElement.textContent = task.text;
      searchResults.appendChild(taskElement);
    });
  }
});
// ----- search task





const btns = document.querySelectorAll('.btn');
const modalOverlay = document.querySelector('.modal-overlay ');
const modals = document.querySelectorAll('.modal');


const tasksBox = document.querySelector('.tasks-box');
const input = document.getElementById('task-input');
const applyButton = document.querySelector('.apply-btn');
const cancelButton = document.querySelector('.cancel-btn');



// Return tasks from localStorage
if (localStorage.getItem('tasks')){
  tasks = JSON.parse(localStorage.getItem('tasks'));
}


// function loadTasksFromLocalStorage() {
//   tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//   tasks.forEach((task) => {
//     const taskElement = document.getElementById(`task-${task.id}`); // getting the task element
//     const taskText = taskElement.querySelector('.task-text'); // getting task text
//     if (task.completed) {
//       taskText.style.textDecoration = 'line-through';
//       taskText.style.color = '#CDCDCD';
//     } else {
//       taskText.style.textDecoration = 'none';
//       taskText.style.color = 'black';
//     }
//   });
// }


// loadTasksFromLocalStorage();





// modal / Add an event listener to the (ADD NEW TASK) button
btns.forEach((el) => {
  el.addEventListener('click', (e) => {
    let path = e.currentTarget.getAttribute('data-path');

    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });

    document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
    modalOverlay.classList.add('modal-overlay--visible');
  });
});




// Add an event listener to the CANCEL
cancelButton.addEventListener('click', (e) => {
  e.preventDefault(); // prevent default behavior of opening the modal window
  modalOverlay.classList.remove('modal-overlay--visible');
  modals.forEach((el) => {
    el.classList.remove('modal--visible');
  });
  input.value = ''; // clear the input field
})




// function for crating new task element
function createTaskElement(task) {
  const newTask = document.createElement('div');
  newTask.className = 'task';

  const taskCheckbox = document.createElement('input');
  taskCheckbox.type = 'checkbox';
  taskCheckbox.className = 'task-condition';
  taskCheckbox.checked = task.completed;

  const taskText = document.createElement('p');
  taskText.className = 'task-text';
  taskText.innerText = task.text;

  const taskButtonsBox = document.createElement('div');
  taskButtonsBox.className = 'task-buttons-box';

  const modifyButton = document.createElement('button');
  modifyButton.className = 'modify-btn';
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-btn';

  const correctorIcon = document.createElement('img');
  correctorIcon.src = 'svgs/corrector.svg';
  correctorIcon.alt = '';
  modifyButton.appendChild(correctorIcon);

  const deletenoteIcon = document.createElement('img');
  deletenoteIcon.src = 'svgs/deletenote.svg';
  deletenoteIcon.alt = '';
  deleteButton.appendChild(deletenoteIcon);

  taskButtonsBox.appendChild(modifyButton);
  taskButtonsBox.appendChild(deleteButton);

  newTask.appendChild(taskCheckbox);
  newTask.appendChild(taskText);
  newTask.appendChild(taskButtonsBox);

  return newTask;
}







// Function for adding event listeners to the checkbox, modify button and delete button
function addEventListeners(task, taskElement, taskCheckbox, taskText, modifyButton, deleteButton) {

  taskCheckbox.addEventListener('change', () => {
    if (taskCheckbox.checked) {
      taskText.style.textDecoration = 'line-through';
      taskText.style.color = '#CDCDCD';
    } 
    else {
      taskText.style.textDecoration = 'none';
      taskText.style.color = 'black';
    }
    task.completed = taskCheckbox.checked;
    saveToLocalStorage(tasks);
  });

  modifyButton.addEventListener('click', () => {
    const newText = prompt('MODIFY YOUR NOTE');
    if (newText !== null) {
      taskText.innerText = newText;
      task.text = newText;
      saveToLocalStorage(tasks);
    }
  });

  deleteButton.addEventListener('click', () => {
    const taskIndex = tasks.findIndex((t) => t.id === task.id);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      taskElement.remove();
      saveToLocalStorage(tasks);
    }
  });
}




// Rendering tasks from localStorage
if (tasks !== ''){
  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    tasksBox.appendChild(taskElement);
  
    const taskCheckbox = taskElement.querySelector('.task-condition');
    const taskText = taskElement.querySelector('.task-text');
    const modifyButton = taskElement.querySelector('.modify-btn');
    const deleteButton = taskElement.querySelector('.delete-btn');

    addEventListeners(task, taskElement, taskCheckbox, taskText, modifyButton, deleteButton);
  });
}




// Adding an event listener to the "APPLY" button
applyButton.addEventListener('click', () => {
  const inputValue = input.value.trim();

  if (inputValue !== '') {
    const newTaskObject = {
      id: taskId++,
      text: inputValue,
      completed: false
    };

    const newTaskElement = createTaskElement(newTaskObject);
    tasksBox.appendChild(newTaskElement);

    const taskCheckbox = newTaskElement.querySelector('.task-condition');
    const taskText = newTaskElement.querySelector('.task-text');
    const modifyButton = newTaskElement.querySelector('.modify-btn');
    const deleteButton = newTaskElement.querySelector('.delete-btn');

    addEventListeners(newTaskObject, newTaskElement, taskCheckbox, taskText, modifyButton, deleteButton);

    tasks.push(newTaskObject);
    saveToLocalStorage(tasks);

    input.value = '';

    modalOverlay.classList.remove('modal-overlay--visible');
    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });
  } else {
    alert('NOTE CAN NOT BE EMPTY');
  }
  
});




// Saving tasks to local storage start -------------
function saveToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}



// Theme changer start -------------
const changeThemeBtn = document.getElementsByClassName('change-theme')[0];

// Check if theme is already saved in localStorage
if (localStorage.getItem('theme') === 'night') {
  document.body.classList.add('night');
}

changeThemeBtn.addEventListener('click', function(){
  document.body.classList.toggle('night');
  // Save the theme preference to localStorage
  if (document.body.classList.contains('night')) {
    localStorage.setItem('theme', 'night');
  } else {
    localStorage.removeItem('theme');
  }
})




// close the modal window when clicking on an empty area
document.addEventListener('click', (e) => {
  if (e.target === modalOverlay || e.target.classList.contains('modal-overlay')) {
    modalOverlay.classList.remove('modal-overlay--visible');
    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });
  }
});


