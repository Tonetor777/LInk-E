<?php
include_once 'classes/db_config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $userType = $data['type'];

    if ($userType === "customer") {
        $fullName = $data['fullName'];
        $email = $data['email'];
        $phone = $data['phoneNumber'];
        $password = password_hash($data['password'], PASSWORD_DEFAULT);

        $sql = "INSERT INTO Customer (FullName, Email, Phone, Password) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $fullName, $email, $phone, $password);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Customer registered successfully"]);
        } else {
            echo json_encode(["error" => "Error: " . $stmt->error]);
        }
        $stmt->close();
    } else {
        $companyName = $data['companyName'];
        $description = $data['description'];
        $email = $data['email'];
        $address = $data['address'];
        $phone = $data['phone'];
        $eventType = $data['eventType'];
        $specificService = $data['specificService'];
        $password = password_hash($data['password'], PASSWORD_DEFAULT);

        $sql = "INSERT INTO ServiceProvider (BusinessName, Description, Email, Address, Phone,  ServiceType, SpecificService, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssssss", $companyName, $description, $email, $address, $phone, $eventType, $specificService, $password);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Service provider registered successfully"]);
        } else {
            echo json_encode(["error" => "Error: " . $stmt->error]);
        }
        $stmt->close();
    }

    $conn->close();
} else {
    echo json_encode(["error" => "Invalid request"]);
}
