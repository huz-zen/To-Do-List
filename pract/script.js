// Get references to DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Add a task
addTaskButton.addEventListener('click', () => {
  const task = taskInput.value.trim();
  if (task) {
    const li = document.createElement('li');
    li.textContent = task;

    // Add a delete button to the task
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => li.remove());

    li.appendChild(deleteButton);
    taskList.appendChild(li);
    taskInput.value = '';
  }
});
