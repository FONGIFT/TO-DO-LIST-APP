let currentUserEmail = null;

// --- Page Navigation ---
function showPage(page) {
  document.getElementById('auth-container').classList.add('hidden');
  document.getElementById('app-container').classList.remove('hidden');
  document.getElementById('user-email-display').textContent = currentUserEmail || 'Guest';

  document.querySelectorAll('.app-section').forEach(s => s.classList.add('hidden-section'));
  document.getElementById(page + '-page').classList.remove('hidden-section');
}

// --- Auth ---
function showLogin() {
  document.getElementById('login-page').classList.remove('hidden');
  document.getElementById('login-page').classList.add('visible');
  document.getElementById('signup-page').classList.add('hidden');
}

function showSignup() {
  document.getElementById('signup-page').classList.remove('hidden');
  document.getElementById('signup-page').classList.add('visible');
  document.getElementById('login-page').classList.add('hidden');
}

function handleLogin() {
  const email = document.getElementById('login-email').value;
  currentUserEmail = email;
  showPage('home');
}

function handleSignup() {
  const email = document.getElementById('signup-email').value;
  currentUserEmail = email;
  showPage('home');
}

function logout() {
  currentUserEmail = null;
  document.getElementById('auth-container').classList.remove('hidden');
  document.getElementById('app-container').classList.add('hidden');
}

// --- Task Management ---
let tasks = [];
let taskIdCounter = 1;

function renderTasks() {
  const inProgressList = document.getElementById('in-progress-list');
  const completedList = document.getElementById('completed-list');
  const deletedList = document.getElementById('deleted-list');

  inProgressList.innerHTML = '';
  completedList.innerHTML = '';
  deletedList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.title;

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('task-actions');

    if (!task.completed && !task.deleted) {
      const completeBtn = document.createElement('button');
      completeBtn.textContent = 'Complete';
      completeBtn.classList.add('complete-btn');
      completeBtn.onclick = () => completeTask(task.id);
      actionsDiv.appendChild(completeBtn);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.onclick = () => deleteTask(task.id);
      actionsDiv.appendChild(deleteBtn);

      li.appendChild(actionsDiv);
      inProgressList.appendChild(li);
    } else if (task.completed && !task.deleted) {
      li.classList.add('completed-task');
      li.appendChild(actionsDiv);
      completedList.appendChild(li);
    } else if (task.deleted) {
      li.appendChild(actionsDiv);
      deletedList.appendChild(li);
    }
  });
}

function addTask() {
  const input = document.getElementById('new-task-input');
  const title = input.value.trim();
  if (!title) return;

  tasks.push({ id: taskIdCounter++, title, completed: false, deleted: false });
  input.value = '';
  renderTasks();
}

function completeTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) task.completed = !task.completed;
  renderTasks();
}

function deleteTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) task.deleted = true;
  renderTasks();
}

function restoreTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) { task.deleted = false; task.completed = false; }
  renderTasks();
}

// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
  showLogin();
});
