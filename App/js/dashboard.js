// ==================== DASHBOARD PAGE ====================

document.addEventListener('DOMContentLoaded', function() {
    // Require login - redirect if not authenticated
    requireLogin();

    initializeDashboard();
});

/**
 * Initialize the dashboard
 */
function initializeDashboard() {
    const userEmail = getLoggedInUser();
    const userEmailElement = document.getElementById('userEmail');
    const logoutBtn = document.getElementById('logoutBtn');
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const tasksList = document.getElementById('tasksList');

    // Display logged-in user's email
    userEmailElement.textContent = userEmail;

    // Handle logout
    logoutBtn.addEventListener('click', function() {
        // Clear login state and all tasks
        logoutUser();
        clearAllTasks();
        // Redirect to login page
        window.location.href = 'index.html';
    });

    // Handle adding a new task
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const description = taskInput.value.trim();

        if (!description) {
            alert('Please enter a task description.');
            return;
        }

        // Add task and clear input
        addTask(description);
        taskInput.value = '';

        // Refresh task list
        renderTasks();

        // Focus back on input for better UX
        taskInput.focus();
    });

    // Initial render of tasks
    renderTasks();
}

/**
 * Render all tasks to the DOM
 */
function renderTasks() {
    const tasksList = document.getElementById('tasksList');
    const tasks = getTasks();

    // Clear current list
    tasksList.innerHTML = '';

    if (tasks.length === 0) {
        // Show empty state
        const emptyItem = document.createElement('li');
        emptyItem.className = 'empty-state';
        emptyItem.textContent = 'No tasks yet. Add one to get started!';
        tasksList.appendChild(emptyItem);
        return;
    }

    // Render each task
    tasks.forEach(task => {
        const taskItem = createTaskElement(task);
        tasksList.appendChild(taskItem);
    });
}

/**
 * Create a task element
 * @param {Object} task - Task object to render
 * @returns {HTMLElement} - Task list item element
 */
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.completed) {
        li.classList.add('completed');
    }
    li.setAttribute('data-testid', `task-item-${task.id}`);

    // Task text
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.description;

    // Task actions container
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'task-actions';

    // Complete/Incomplete button
    const completeBtn = document.createElement('button');
    completeBtn.className = 'btn btn-success btn-small';
    completeBtn.setAttribute('data-testid', `complete-task-button-${task.id}`);
    completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
    completeBtn.addEventListener('click', function() {
        toggleTask(task.id);
        renderTasks();
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-small';
    deleteBtn.setAttribute('data-testid', `delete-task-button-${task.id}`);
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
        deleteTask(task.id);
        renderTasks();
    });

    actionsDiv.appendChild(completeBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(actionsDiv);

    return li;
}
