'use strict'

const btns = document.querySelectorAll('.btn');
const modalOverlay = document.querySelector('.modal-overlay ');
const modals = document.querySelectorAll('.modal');

let tasks = [];

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

modalOverlay.addEventListener('click', (e) => {
  console.log(e.target);

  if (e.target == modalOverlay) {
    modalOverlay.classList.remove('modal-overlay--visible');
    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });
  }
});






// Get an input, a container for new tasks, an "APPLY" button and a "CANCEL" button
const input = document.getElementById('task-input');
const tasksBox = document.querySelector('.tasks-box');
const applyButton = document.querySelector('.apply-btn');
const cancelButton = document.querySelector('.cancel-btn');




// Adding an event listener to the button "CANCEL"
cancelButton.addEventListener('click', (e) => {
  e.preventDefault(); // prevent default behavior of opening the modal window
  modalOverlay.classList.remove('modal-overlay--visible');
  modals.forEach((el) => {
    el.classList.remove('modal--visible');
  });
  input.value = ''; // clear the input field
})





// Adding an event listener to the button "APPLY"
applyButton.addEventListener('click', () => {
  // Get the current input value
  const inputValue = input.value;

  // Checking if the input value is empty
  if (inputValue.trim()!== '') {
    // Create a new task element
    const newTask = document.createElement('div');
    newTask.className = 'task';

    // Create a checkbox
    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.className = 'task-condition';

    // Create a task text element
    const taskText = document.createElement('p');
    taskText.className = 'task-text';
    taskText.innerText = inputValue;

    // Create a container for buttons
    const taskButtonsBox = document.createElement('div');
    taskButtonsBox.className = 'task-buttons-box';

    // Creating buttons
    const modifyButton = document.createElement('button');
    modifyButton.className = 'modify-button';
    const deleteButton = document.createElement('button');
    deleteButton.className = 'modify-button';

    // Adding icons to buttons
    const correctorIcon = document.createElement('img');
    correctorIcon.src = 'svgs/corrector.svg';
    correctorIcon.alt = '';
    modifyButton.appendChild(correctorIcon);

    const deletenoteIcon = document.createElement('img');
    deletenoteIcon.src = 'svgs/deletenote.svg';
    deletenoteIcon.alt = '';
    deleteButton.appendChild(deletenoteIcon);

    // Adding Buttons to a Button Container
    taskButtonsBox.appendChild(modifyButton);
    taskButtonsBox.appendChild(deleteButton);

    // Add a checkbox, task text and button container to
    //  the new task element

    newTask.appendChild(taskCheckbox);
    newTask.appendChild(taskText);
    newTask.appendChild(taskButtonsBox);

    // Adding a new task item to the task container
    tasksBox.appendChild(newTask);

    // Clearing the input
    input.value = '';

    // Adding a new task item to the task container
    taskCheckbox.addEventListener('change', () => {
      if (taskCheckbox.checked) {
        taskText.style.textDecoration = 'line-through';
      } else {
        taskText.style.textDecoration = 'none';
      }
    });

    // Adding an event listener to the button modify
    modifyButton.addEventListener('click', () => {
      const newText = prompt('MODIFY YOUR NOTE');
      if (newText !== null) {
        taskText.innerText = newText;
        // Update task text in tasks array
        const taskIndex = tasks.findIndex((task) => task.text === inputValue);
        if (taskIndex !== -1) {
          tasks[taskIndex].text = newText; // Update task text in tasks array
        }
      }
    });

    // Adding an event listener to the button delete
    deleteButton.addEventListener('click', () => {
      const currentText = taskText.innerText;
      const taskIndex = tasks.findIndex((task) => task.text === currentText);
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1); // Remove task from array
        newTask.remove(); // Remove task element from DOM
      }
    });

    // Add task to array
    tasks.push({ text: inputValue, completed: false });
  } else {
    alert('NOTE CANT BE EMPTY');
  }

});