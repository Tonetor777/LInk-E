<?php
include_once 'classes/db_config.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        getProvider($conn, $_GET['id']);
        break;
        /* case 'POST':
        // Create a new provider
        createProvider($conn);
        break;
    case 'PUT':
        // Update an existing provider
        if (isset($_GET['id'])) {
            updateProvider($conn, $_GET['id']);
        } else {
            http_response_code(400);
            echo json_encode(['message' => 'Provider ID is required']);
        }
        break;
    case 'DELETE':
        // Delete an existing provider
        if (isset($_GET['id'])) {
            deleteProvider($conn, $_GET['id']);
        } else {
            http_response_code(400);
            echo json_encode(['message' => 'Provider ID is required']);
        }
        break; */
    default:
        http_response_code(405);
        echo json_encode(['message' => 'Method not allowed']);
        break;
}

function getProvider($conn, $id)
{
    $stmt = $conn->prepare("SELECT * FROM ServiceProvider WHERE ProviderID = ?");
    $stmt->bind_param('i', $id);

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            echo json_encode($result->fetch_assoc());
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Provider not found']);
        }
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Failed to fetch provider', 'error' => $stmt->error]);
    }

    $stmt->close();
}
