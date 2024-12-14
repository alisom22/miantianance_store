<?php
header('Content-Type: application/json');
$conn = new mysqli('localhost', 'root', '', 'maintenance_store');

if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed']));
}

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'getInventory':
        $result = $conn->query('SELECT * FROM inventory');
        echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        break;

    case 'addItem':
        $name = $_POST['name'];
        $quantity = $_POST['quantity'];
        $conn->query("INSERT INTO inventory (name, quantity) VALUES ('$name', $quantity)");
        echo json_encode(['success' => true]);
        break;

    case 'getRequests':
        $result = $conn->query('SELECT * FROM requests');
        echo json_encode($result->fetch_all(MYSQLI_ASSOC));
        break;

    case 'addRequest':
        $description = $_POST['description'];
        $conn->query("INSERT INTO requests (description) VALUES ('$description')");
        echo json_encode(['success' => true]);
        break;

    default:
        echo json_encode(['error' => 'Invalid action']);
}
?>
