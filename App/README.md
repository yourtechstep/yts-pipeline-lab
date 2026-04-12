# YTS Task Manager - Demo App

A simple, beginner-friendly front-end demo application for learning Playwright testing and CI/CD pipelines. Built with plain HTML, CSS, and JavaScript (no frameworks).

## 📁 Project Structure

```
App/
├── index.html              # Login page
├── dashboard.html          # Dashboard/task manager page
├── styles/
│   └── styles.css         # All styling (shared between pages)
└── js/
    ├── app.js             # Shared utilities (auth, tasks, storage)
    ├── login.js           # Login page logic
    └── dashboard.js       # Dashboard page logic
```

## 🚀 Getting Started

### Running the App

1. Open `index.html` in a web browser
2. Or use a local server:
   - Python 3: `python -m http.server 8000`
   - Node.js: `npx http-server`
3. Navigate to `localhost:8000` (or your server port)

## 📋 Features

### Login Page (`index.html`)
- Centered login card with email and password inputs
- Form validation and error messaging
- Demo credentials displayed for reference
- Redirect to dashboard on successful login
- LocalStorage-based authentication state
- Data-testid attributes for Playwright automation

**Demo Credentials:**
- Email: `demo@yts.com`
- Password: `Password123`

### Dashboard Page (`dashboard.html`)
- Welcome message showing logged-in user email
- Add tasks form
- Display list of all tasks
- Mark tasks as complete/incomplete
- Delete tasks
- Logout button that clears session and tasks
- Protected page (redirects to login if not authenticated)

## 💾 Data Storage

All data is stored in **localStorage** for persistence:
- `yts_user_email` - Logged-in user's email
- `yts_tasks` - Array of task objects

### Task Object Structure
```javascript
{
    id: 1234567890,                          // Timestamp-based unique ID
    description: "Buy groceries",            // Task text
    completed: false,                        // Completion state
    createdAt: "2024-01-01T12:00:00.000Z"   // ISO timestamp
}
```

## 🧪 Playwright Testing

All interactive elements have **data-testid** attributes for easy targeting:

### Login Page Selectors
- Email input: `[data-testid="email-input"]`
- Password input: `[data-testid="password-input"]`
- Sign in button: `[data-testid="sign-in-button"]`
- Error message: `[data-testid="error-message"]`

### Dashboard Page Selectors
- User email display: `[data-testid="user-email"]`
- Task input: `[data-testid="task-input"]`
- Add task button: `[data-testid="add-task-button"]`
- Tasks list: `[data-testid="tasks-list"]`
- Task item: `[data-testid="task-item-{id}"]` (e.g., `task-item-1234567890`)
- Complete button: `[data-testid="complete-task-button-{id}"]`
- Delete button: `[data-testid="delete-task-button-{id}"]`
- Logout button: `[data-testid="logout-button"]`

### Example Playwright Test
```javascript
import { test, expect } from '@playwright/test';

test('user can login and add a task', async ({ page }) => {
    // Navigate to login page
    await page.goto('http://localhost:8000');

    // Fill in credentials
    await page.fill('[data-testid="email-input"]', 'demo@yts.com');
    await page.fill('[data-testid="password-input"]', 'Password123');

    // Click sign in
    await page.click('[data-testid="sign-in-button"]');

    // Wait for navigation to dashboard
    await page.waitForURL('**/dashboard.html');

    // Add a task
    await page.fill('[data-testid="task-input"]', 'Learn Playwright');
    await page.click('[data-testid="add-task-button"]');

    // Verify task appears
    await expect(page.locator('[data-testid="tasks-list"]')).toContainText('Learn Playwright');
});
```

## 🔐 Security Notes

**This is a demo app for learning purposes only.**
- Credentials are hardcoded in the frontend (never do this in production)
- Passwords are stored in plain text in localStorage (use secure authentication in production)
- No actual authentication server or security measures
- Use only for testing and learning purposes

## 🎨 Styling

The app uses a modern, clean design with:
- Gradient background on login page
- Card-based layout
- Responsive design (mobile-friendly)
- Hover effects and transitions
- Color-coded buttons (primary, secondary, danger)
- Consistent spacing and typography

## 📱 Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 🛠 Customization

### Changing Demo Credentials
Edit `js/app.js`:
```javascript
const VALID_EMAIL = 'your-email@example.com';
const VALID_PASSWORD = 'YourPassword123';
```

### Styling Changes
All styles in `styles/styles.css` use CSS variables for easy customization:
```css
:root {
    --primary-color: #007bff;
    --primary-hover: #0056b3;
    /* ... more variables ... */
}
```

## 📚 Learning Guide

This project is structured to teach:

1. **HTML Structure** - Semantic HTML with clear organization
2. **CSS Styling** - Grid/flexbox layout, responsive design, CSS variables
3. **JavaScript Fundamentals** - DOM manipulation, event handling, local storage
4. **Form Handling** - Input validation, error messages, form submission
5. **State Management** - localStorage for persistence
6. **Testing Considerations** - data-testid attributes and predictable selectors

## 📝 Files Overview

| File | Purpose |
|------|---------|
| `index.html` | Login page markup |
| `dashboard.html` | Dashboard page markup |
| `styles/styles.css` | All page styling |
| `js/app.js` | Authentication, tasks, and storage utilities |
| `js/login.js` | Login page event handlers and logic |
| `js/dashboard.js` | Dashboard rendering and task management |

---

**Ready to test?** Use this app with Playwright or Selenium to learn automation testing!
