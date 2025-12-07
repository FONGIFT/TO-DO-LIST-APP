const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDateInput');
const dueTimeInput = document.getElementById('dueTimeInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const historyList = document.getElementById('historyList');

// Calendar DOM Elements
const calendarView = document.getElementById('calendarView');
const currentMonthYear = document.getElementById('currentMonthYear');
const calendarGrid = document.getElementById('calendarGrid');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

// Global State
let deletedTasks = JSON.parse(localStorage.getItem('deletedTasks') || '[]');
let currentCalendarDate = new Date();

// --- DATA MANAGEMENT ---

// Save tasks (now includes dueDate, dueTime, dateCreated)
function saveTasks(tasksToSave = document.querySelectorAll('.task')) {
    const tasks = [];
    tasksToSave.forEach(taskEl => {
        tasks.push({
            id: taskEl.dataset.id || Date.now(), // Use existing ID or generate new
            text: taskEl.querySelector('span').textContent,
            completed: taskEl.classList.contains('completed'),
            dueDate: taskEl.dataset.dueDate || '',
            dueTime: taskEl.dataset.dueTime || '',
            dateCreated: taskEl.dataset.dateCreated || new Date().toISOString()
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderCalendar(); // Rerender calendar to update task dates
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(task => addTaskToDOM(task));
}

function saveDeletedTask(taskData) {
    deletedTasks.push({
        ...taskData,
        dateDeleted: new Date().toISOString()
    });
    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
}

// --- TASK LIST RENDERING ---

// Add task to DOM (accepts a full task object now)
function addTaskToDOM(task) {
    const { id, text, completed, dueDate, dueTime, dateCreated } = task;

    const li = document.createElement('li');
    li.className = 'task';
    li.dataset.id = id || Date.now();
    li.dataset.dueDate = dueDate || '';
    li.dataset.dueTime = dueTime || '';
    li.dataset.dateCreated = dateCreated || new Date().toISOString();

    if (completed) li.classList.add('completed');

    // Display due date and time if available
    const dueInfo = (dueDate || dueTime) ? 
        `<small>Due: ${dueDate} ${dueTime}</small>` : '';

    li.innerHTML = `
        <input type="checkbox" ${completed ? 'checked' : ''}>
        <span>${text}</span>
        ${dueInfo}
        <button class="delete-btn">&times;</button>
    `;

    // Toggle complete
    li.querySelector('input').addEventListener('change', (e) => {
        li.classList.toggle('completed');
        // If completed, update dateCreated/dueDate in storage to mark it as completed task
        saveTasks(); 
    });

    // Delete task
    li.querySelector('.delete-btn').addEventListener('click', () => {
        // Save to history before removing
        const taskData = {
            id: li.dataset.id,
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed'),
            dueDate: li.dataset.dueDate,
            dueTime: li.dataset.dueTime,
            dateCreated: li.dataset.dateCreated
        };
        saveDeletedTask(taskData);
        
        li.remove();
        saveTasks();
    });

    taskList.appendChild(li);
}

// Add new task
function addTask() {
    const text = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const dueTime = dueTimeInput.value;

    if (!text) return;

    const newTask = {
        id: Date.now().toString(),
        text: text,
        completed: false,
        dueDate: dueDate,
        dueTime: dueTime,
        dateCreated: new Date().toISOString()
    };

    addTaskToDOM(newTask);
    saveTasks();
    
    // Clear inputs
    taskInput.value = '';
    dueDateInput.value = '';
    dueTimeInput.value = '';
}

// --- CALENDAR LOGIC ---

function renderCalendar() {
    calendarGrid.innerHTML = '';
    const date = new Date(currentCalendarDate);
    const year = date.getFullYear();
    const month = date.getMonth();

    currentMonthYear.textContent = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 for Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        const dayLabel = document.createElement('div');
        dayLabel.textContent = day;
        dayLabel.classList.add('day-label');
        calendarGrid.appendChild(dayLabel);
    });

    // Add empty cells for previous month's days
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarGrid.appendChild(document.createElement('div'));
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.textContent = day;
        dayEl.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // Check for tasks on this date
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const tasksOnDate = tasks.filter(task => task.dueDate === dayEl.dataset.date);

        if (tasksOnDate.length > 0) {
            dayEl.classList.add('has-task');
        }

        calendarGrid.appendChild(dayEl);
    }
}

function changeMonth(delta) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + delta);
    renderCalendar();
}

// --- HISTORY LOGIC ---

function renderHistory(filter = 'pending') {
    historyList.innerHTML = '';
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    let itemsToShow = [];

    if (filter === 'pending') {
        itemsToShow = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
        itemsToShow = tasks.filter(task => task.completed);
    } else if (filter === 'deleted') {
        itemsToShow = deletedTasks;
    }
    
    if (itemsToShow.length === 0) {
        historyList.innerHTML = `<li class="task">No ${filter} tasks found.</li>`;
        return;
    }

    itemsToShow.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task history-item';
        
        let status = '';
        if (task.dateDeleted) {
            status = `<span style="color: red;">[DELETED]</span>`;
        } else if (task.completed) {
            status = `<span style="color: green;">[COMPLETED]</span>`;
        } else {
            status = `<span style="color: orange;">[PENDING]</span>`;
        }

        li.innerHTML = `
            <span>${task.text}</span>
            ${status}
            <small>Created: ${new Date(task.dateCreated).toLocaleDateString()}</small>
            <small>Due: ${task.dueDate} ${task.dueTime}</small>
        `;
        historyList.appendChild(li);
    });
}

// --- REMINDER LOGIC (Basic implementation) ---

function checkReminders() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const now = new Date();
    const todayDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM

    tasks.forEach(task => {
        // Simple reminder check: If due today and current time is past due time
        if (task.dueDate === todayDate && task.dueTime === currentTime && !task.completed) {
            alert(`REMINDER: Your task "${task.text}" is due now!`);
        }
    });
    // For a real app, this would run periodically (e.g., every minute) using a server or background worker.
    // Here, we just check on load.
}


// --- EVENT LISTENERS ---

// Add Task Listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Tab Switching Logic
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.dataset.tab;
        
        // Deactivate all
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Activate selected
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');

        // Special render functions for specific tabs
        if (tabId === 'calendar') renderCalendar();
        if (tabId === 'history') renderHistory(document.querySelector('.history-filters .active').dataset.filter);
    });
});

// Calendar Listeners
prevMonthBtn.addEventListener('click', () => changeMonth(-1));
nextMonthBtn.addEventListener('click', () => changeMonth(1));

// History Filter Listeners
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderHistory(button.dataset.filter);
    });
});


// --- INITIALIZATION ---
loadTasks();
checkReminders(); // Run reminder check on app load
taskInput.focus();
renderCalendar(); // Render calendar on initial load (hidden until the tab is clicked)
