<?php
include_once 'classes/db_config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:  GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];


if ($method == "OPTIONS") {
    header("HTTP/1.1 200 OK");
    exit();
}
header('Content-Type: application/json');

switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM PreviousWork";
        $result = $conn->query($sql);
        $works = [];
        while ($row = $result->fetch_assoc()) {
            $works[] = $row;
        }
        echo json_encode($works);
        break;

    case 'POST':
        if (isset($_FILES['ImageFile'])) {
            $providerID = 1;
            $title = $_POST['Title'];
            $description = $_POST['Description'];
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
        $providerID = $data->ProviderID;
        $title = $data->Title;
        $description = $data->Description;
        $imageURL = $data->ImageURL;

        $sql = "UPDATE PreviousWork SET ProviderID='$providerID', Title='$title', Description='$description', ImageURL='$imageURL' WHERE WorkID='$workID'";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Work updated successfully"]);
        } else {
            echo json_encode(["message" => "Error: " . $sql . "<br>" . $conn->error]);
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $workID = $data->WorkID;

        $sql = "DELETE FROM PreviousWork WHERE WorkID='$workID'";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Work deleted successfully"]);
        } else {
            echo json_encode(["message" => "Error: " . $sql . "<br>" . $conn->error]);
        }
        break;

    default:
        echo json_encode(["message" => "Method not supported"]);
        break;
}

$conn->close();
