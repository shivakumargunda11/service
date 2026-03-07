// dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Add user name to dashboard title if exists
    const titleElement = document.querySelector('h2.fw-bold');
    if (titleElement) {
        titleElement.innerText = `Welcome, ${user.name}`;
    }

    fetchRequests(user.token);
});

async function fetchRequests(token) {
    try {
        const response = await fetch('/api/requests', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.status === 401) {
            localStorage.removeItem('user');
            window.location.href = 'login.html';
            return;
        }

        const requests = await response.json();

        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = ''; // Clear static data

        requests.forEach(request => {
            const row = document.createElement('tr');

            const date = new Date(request.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            row.innerHTML = `
                <td class="ps-4 fw-bold">#${request._id.substring(request._id.length - 8).toUpperCase()}</td>
                <td><span class="badge bg-info bg-opacity-10 text-info border border-info rounded-pill px-3">${request.category}</span></td>
                <td>${request.description}</td>
                <td class="text-muted">${date}</td>
                <td><span class="badge ${getStatusBadgeClass(request.status)}">${request.status}</span></td>
                <td class="text-end pe-4"><button class="btn btn-sm btn-outline-secondary">View</button></td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching requests:', error);
    }
}

function getStatusBadgeClass(status) {
    switch (status) {
        case 'Pending': return 'bg-warning text-dark';
        case 'In Progress': return 'bg-primary';
        case 'Resolved': return 'bg-success';
        case 'Rejected': return 'bg-danger';
        default: return 'bg-secondary';
    }
}
