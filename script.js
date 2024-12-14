document.addEventListener('DOMContentLoaded', () => {
    const inventoryTable = document.querySelector('#inventory tbody');
    const requestTable = document.querySelector('#requests tbody');

    // Fetch and display inventory
    fetch('api.php?action=getInventory')
        .then(response => response.json())
        .then(data => {
            inventoryTable.innerHTML = data.map(item => `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td><button onclick="deleteItem(${item.id})">Delete</button></td>
                </tr>
            `).join('');
        });

    // Add item
    document.querySelector('#add-item').addEventListener('click', () => {
        const name = prompt('Item name:');
        const quantity = prompt('Quantity:');
        fetch('api.php?action=addItem', {
            method: 'POST',
            body: new URLSearchParams({ name, quantity })
        }).then(() => location.reload());
    });

    // Fetch and display requests
    fetch('api.php?action=getRequests')
        .then(response => response.json())
        .then(data => {
            requestTable.innerHTML = data.map(request => `
                <tr>
                    <td>${request.id}</td>
                    <td>${request.description}</td>
                    <td>${request.status}</td>
                    <td><button onclick="markComplete(${request.id})">Complete</button></td>
                </tr>
            `).join('');
        });

    // Add request
    document.querySelector('#add-request').addEventListener('click', () => {
        const description = prompt('Request description:');
        fetch('api.php?action=addRequest', {
            method: 'POST',
            body: new URLSearchParams({ description })
        }).then(() => location.reload());
    });
});
