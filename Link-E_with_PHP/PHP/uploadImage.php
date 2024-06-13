<?php
include_once 'classes/db_config.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_FILES['image']) && isset($_POST['id'])) {
        $id = $_POST['id'];
        $targetDir = "uploads/profile/";
        $fileName = basename($_FILES['image']['name']);
        $targetFilePath = $targetDir . $fileName;
        $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0755, true);
        }

        $allowTypes = array('jpg', 'png', 'jpeg', 'gif');
        if (in_array($fileType, $allowTypes)) {
            if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFilePath)) {
                $imageURL = "../../PHP/" . $targetFilePath;
                $stmt = $conn->prepare("UPDATE serviceprovider SET ImageURL = ? WHERE ProviderID = ?");
                $stmt->bind_param('si', $imageURL, $id);

                if ($stmt->execute()) {
                    echo json_encode(['message' => 'File uploaded successfully', 'imageUrl' => $imageURL]);
                } else {
                    http_response_code(500);
                    echo json_encode(['message' => 'Database update failed', 'error' => $stmt->error]);
                }

                $stmt->close();
            } else {
                http_response_code(500);
                echo json_encode(['message' => 'File upload failed']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['message' => 'Invalid file type']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'No file or ID provided']);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Invalid request method']);
}

$conn->close();
