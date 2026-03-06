const testDriver = async () => {
    const baseUrl = 'http://localhost:5000/api/requests';

    console.log('1. Testing POST /api/requests');
    const newRequest = {
        studentName: 'John Doe',
        studentId: 'S123456',
        email: 'john@example.edu',
        category: 'Maintenance',
        priority: 'High',
        location: 'Building A, Room 101',
        description: 'AC not working'
    };

    try {
        const createRes = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRequest)
        });
        const createData = await createRes.json();
        console.log('Create Response:', createRes.status, createData);

        if (createRes.status === 201) {
            console.log('2. Testing GET /api/requests');
            const getRes = await fetch(baseUrl);
            const getData = await getRes.json();
            console.log('Get All Response:', getRes.status, getData.length + ' requests found');
        } else {
            console.log('Create failed');
        }

    } catch (e) {
        console.error('Test Failed:', e.message);
    }
};

// Wait for server to boot
setTimeout(testDriver, 3000);
