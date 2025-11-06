const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task').forEach(taskEl => {
        tasks.push({
            text: taskEl.querySelector('span').textContent,
            completed: taskEl.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task to DOM
function addTaskToDOM(text, completed = false) {
    const li = document.createElement('li');
    li.className = 'task';
    if (completed) li.classList.add('completed');

    li.innerHTML = `
    <input type="checkbox" ${completed ? 'checked' : ''}>
    <span>${text}</span>
    <button>&times;</button>
  `;

    // Toggle complete
    li.querySelector('input').addEventListener('change', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    // Delete task
    li.querySelector('button').addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    taskList.appendChild(li);
}

// Add new task
function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    addTaskToDOM(text);
    saveTasks();
    taskInput.value = '';
}

// Event Listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Init
loadTasks();
taskInput.focus();