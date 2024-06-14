<?php
include_once 'classes/db_config.php';

header("Access-Control-Allow-Origin: http://localhost:8001");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Content-Type: application/json');



$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    header("HTTP/1.1 200 OK");
    exit();
}


switch ($method) {
    case 'GET':
        $providerID = isset($_GET['id']) ? $_GET['id'] : null;
        $sql = "SELECT * FROM PreviousWork WHERE ProviderID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $providerID);
        $stmt->execute();
        $result = $stmt->get_result();
        $works = [];
        while ($row = $result->fetch_assoc()) {
            $works[] = $row;
        }
        echo json_encode($works);
        break;

    case 'POST':
        if (isset($_FILES['ImageFile']) && isset($_POST['Title']) && isset($_POST['Description'])) {
            $title = $_POST['Title'];
            $description = $_POST['Description'];
            $providerID = $_POST['ProviderID'];
            $targetDir = "gallery/";
            $fileName = basename($_FILES['ImageFile']['name']);
            $targetFilePath = $targetDir . $fileName;
            $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

            if (!is_dir($targetDir)) {
                mkdir($targetDir, 0755, true);
            }

            $allowTypes = array('jpg', 'png', 'jpeg', 'gif');
            if (in_array($fileType, $allowTypes)) {
                if (move_uploaded_file($_FILES['ImageFile']['tmp_name'], $targetFilePath)) {
                    $imageURL = "../../PHP/" . $targetFilePath;
                    $stmt = $conn->prepare("INSERT INTO PreviousWork (ProviderID, Title, Description, ImageURL) VALUES (?, ?, ?, ?)");
                    $stmt->bind_param('isss', $providerID, $title, $description, $imageURL);

                    if ($stmt->execute()) {
                        echo json_encode(['message' => 'New work created successfully', 'imageUrl' => $imageURL]);
                    } else {
                        http_response_code(500);
                        echo json_encode(['message' => 'Database insertion failed', 'error' => $stmt->error]);
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
            echo json_encode(['message' => 'Missing required fields']);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $workID = $data->WorkID;
        $title = $data->Title;
        $description = $data->Description;
        $imageURL = $data->ImageURL;

        $sql = "UPDATE PreviousWork SET Title=?, Description=?, ImageURL=? WHERE WorkID=? AND ProviderID=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('sssii', $title, $description, $imageURL, $workID, $providerID);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Work updated successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Error updating work", "error" => $stmt->error]);
        }

        $stmt->close();
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $workID = $data->WorkID;
        $providerID = isset($_GET['id']) ? $_GET['id'] : null;
        $sql = "DELETE FROM PreviousWork WHERE WorkID=? AND ProviderID=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ii', $workID, $providerID);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Work deleted successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Error deleting work", "error" => $stmt->error]);
        }

        $stmt->close();
        break;

    default:
        http_response_code(405); // Method Not Allowed
        echo json_encode(["message" => "Method not supported"]);
        break;
}

$conn->close();
