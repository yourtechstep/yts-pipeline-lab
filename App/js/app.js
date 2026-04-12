// ==================== SHARED UTILITIES ====================

// Valid credentials (hardcoded for demo)
const VALID_EMAIL = 'demo@yts.com';
const VALID_PASSWORD = 'Password123';

// LocalStorage keys
const STORAGE_KEYS = {
    USER_EMAIL: 'yts_user_email',
    TASKS: 'yts_tasks'
};

// ==================== AUTHENTICATION ====================

/**
 * Validate login credentials
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {boolean} - True if credentials are valid
 */
function validateCredentials(email, password) {
    return email === VALID_EMAIL && password === VALID_PASSWORD;
}

/**
 * Set user as logged in
 * @param {string} email - User email to store
 */
function loginUser(email) {
    localStorage.setItem(STORAGE_KEYS.USER_EMAIL, email);
}

/**
 * Check if user is logged in
 * @returns {string|null} - User email if logged in, null otherwise
 */
function getLoggedInUser() {
    return localStorage.getItem(STORAGE_KEYS.USER_EMAIL);
}

/**
 * Log out the current user
 */
function logoutUser() {
    localStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
}

/**
 * Redirect to login page if not authenticated
 */
function requireLogin() {
    if (!getLoggedInUser()) {
        window.location.href = 'index.html';
    }
}

// ==================== TASKS ====================

/**
 * Get all tasks from localStorage
 * @returns {Array} - Array of task objects
 */
function getTasks() {
    const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    return tasks ? JSON.parse(tasks) : [];
}

/**
 * Save tasks to localStorage
 * @param {Array} tasks - Array of task objects to save
 */
function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
}

/**
 * Add a new task
 * @param {string} description - Task description
 * @returns {Object} - The created task object
 */
function addTask(description) {
    const tasks = getTasks();
    const newTask = {
        id: Date.now(),
        description: description,
        completed: false,
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
}

/**
 * Mark a task as complete/incomplete
 * @param {number} taskId - Task ID to toggle
 */
function toggleTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTasks(tasks);
}

/**
 * Delete a task
 * @param {number} taskId - Task ID to delete
 */
function deleteTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks(tasks);
}

/**
 * Clear all tasks (useful for logout)
 */
function clearAllTasks() {
    localStorage.removeItem(STORAGE_KEYS.TASKS);
}
