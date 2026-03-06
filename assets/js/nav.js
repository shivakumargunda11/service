// nav.js - Central Navbar and Auth state management

document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
});

function updateNavbar() {
    const navList = document.querySelector('.navbar-nav');
    if (!navList) return;

    const user = JSON.parse(localStorage.getItem('user'));
    
    // Remove existing login/signup/logout items to avoid duplicates
    const authItems = navList.querySelectorAll('.auth-item');
    authItems.forEach(item => item.remove());

    if (user) {
        // User is logged in
        const logoutLi = document.createElement('li');
        logoutLi.className = 'nav-item auth-item';
        logoutLi.innerHTML = `
            <div class="dropdown">
                <a class="nav-link dropdown-toggle fw-bold text-white" href="#" data-bs-toggle="dropdown">
                    <i class="bi bi-person-circle me-1"></i> ${user.name}
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#" onclick="handleLogout(event)">Logout</a></li>
                </ul>
            </div>
        `;
        navList.appendChild(logoutLi);
    } else {
        // User is not logged in
        const loginLi = document.createElement('li');
        loginLi.className = 'nav-item auth-item';
        loginLi.innerHTML = `<a class="nav-link" href="login.html">Login</a>`;
        
        const signupLi = document.createElement('li');
        signupLi.className = 'nav-item auth-item';
        signupLi.innerHTML = `<a class="nav-link btn btn-light text-primary btn-sm ms-2 rounded-pill px-3" href="signup.html">Join Free</a>`;
        
        navList.appendChild(loginLi);
        navList.appendChild(signupLi);
    }
}

function handleLogout(e) {
    if (e) e.preventDefault();
    localStorage.removeItem('user');
    alert('Logged out successfully');
    window.location.href = 'login.html';
}
