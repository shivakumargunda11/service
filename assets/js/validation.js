// validation.js

document.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    const form = document.getElementById('requestForm');
    const studentNameInput = document.getElementById('studentName');
    const studentIdInput = document.getElementById('studentId');
    const emailInput = document.getElementById('email');

    // Auto-fill logged in user info
    studentNameInput.value = user.name;
    emailInput.value = user.email;
    // Note: If you don't have studentId in user, maybe they can still type it or add it to user model.
    // For now, let's keep it as is if not available.

    form.addEventListener('submit', function (event) {
        let isValid = true;

        // Reset custom validities first to let browser check standard constraints
        studentNameInput.setCustomValidity("");
        studentIdInput.setCustomValidity("");
        emailInput.setCustomValidity("");

        if (!form.checkValidity()) {
            isValid = false;
        }

        // Custom Validations
        if (!validateName(studentNameInput.value)) {
            studentNameInput.setCustomValidity("Please enter a valid name (letters only, min 2 chars).");
            isValid = false;
        }

        if (!validateStudentId(studentIdInput.value)) {
            studentIdInput.setCustomValidity("Invalid ID format (e.g., S123456).");
            isValid = false;
        }

        if (!validateEmail(emailInput.value)) {
            emailInput.setCustomValidity("Please enter a valid email address.");
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            // Success - Send to Backend
            const formData = {
                studentName: studentNameInput.value,
                studentId: studentIdInput.value,
                email: emailInput.value,
                category: document.getElementById('category').value,
                priority: document.getElementById('priority').value,
                location: document.getElementById('location').value,
                description: document.getElementById('description').value
            };

            submitRequest(formData);
            return;
        }

        form.classList.add('was-validated');
    }, false);

    // Real-time validation
    studentNameInput.addEventListener('input', function () {
        if (validateName(this.value)) {
            this.setCustomValidity("");
        } else {
            this.setCustomValidity("Invalid name");
        }
    });

    studentIdInput.addEventListener('input', function () {
        if (validateStudentId(this.value)) {
            this.setCustomValidity("");
        } else {
            this.setCustomValidity("Invalid ID");
        }
    });

    emailInput.addEventListener('input', function () {
        if (validateEmail(this.value)) {
            this.setCustomValidity("");
        } else {
            this.setCustomValidity("Invalid Email");
        }
    });
});

function validateName(name) {
    // Letters and spaces only, min 2 chars
    const regex = /^[a-zA-Z\s]{2,}$/;
    return regex.test(name);
}

function validateStudentId(id) {
    // Example format: Starts with S or F followed by 6 digits
    const regex = /^[SF]\d{6}$/i;
    return regex.test(id);
}

function validateEmail(email) {
    // Basic email regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

async function submitRequest(data) {
    const user = JSON.parse(localStorage.getItem('user'));
    
    try {
        const response = await fetch('/api/requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(data),
        });

        if (response.status === 401) {
            alert('Your session has expired. Please login again.');
            localStorage.removeItem('user');
            window.location.href = 'login.html';
            return;
        }

        const result = await response.json();

        if (response.ok) {
            alert('Service Request Submitted Successfully to MongoDB!');
            document.getElementById('requestForm').reset();
            document.getElementById('requestForm').classList.remove('was-validated');
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to connect to the server. Make sure the backend is running.');
    }
}
