// auth.js
const API_URL = 'http://localhost:5000/api/users';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data));
            alert('Login Successful!');
            redirectUser(data.role);
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Could not connect to server');
    }
}

async function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data));
            alert('Account created successfully!');
            redirectUser(data.role);
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('Could not connect to server');
    }
}

function redirectUser(role) {
    if (role === 'admin') {
        window.location.href = 'admin_dashboard.html';
    } else {
        window.location.href = 'student_dashboard.html';
    }
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}
