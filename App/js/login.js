// ==================== LOGIN PAGE ====================

document.addEventListener('DOMContentLoaded', function() {
    // If user is already logged in, redirect to dashboard
    if (getLoggedInUser()) {
        window.location.href = 'dashboard.html';
        return;
    }

    initializeLoginPage();
});

/**
 * Initialize the login page
 */
function initializeLoginPage() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');

    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Clear previous error message
        errorMessage.style.display = 'none';

        // Validate inputs
        if (!email || !password) {
            showError('Please enter both email and password.');
            return;
        }

        // Check credentials
        if (validateCredentials(email, password)) {
            // Credentials are valid
            loginUser(email);
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            // Credentials are invalid
            showError('Invalid email or password. Please try again.');
            // Clear password field for security
            passwordInput.value = '';
        }
    });

    /**
     * Display error message
     * @param {string} message - Error message to display
     */
    function showError(message) {
        errorText.textContent = message;
        errorMessage.style.display = 'block';
        errorMessage.setAttribute('data-testid', 'error-message');
    }

    // Clear error message when user starts typing
    emailInput.addEventListener('input', function() {
        if (errorMessage.style.display === 'block') {
            errorMessage.style.display = 'none';
        }
    });

    passwordInput.addEventListener('input', function() {
        if (errorMessage.style.display === 'block') {
            errorMessage.style.display = 'none';
        }
    });
}
