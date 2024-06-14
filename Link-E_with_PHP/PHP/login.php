<?php
include_once 'classes/db_config.php';

$allowed_origin = "http://localhost:8001";

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Origin: $allowed_origin");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
    exit(0);
}

header("Access-Control-Allow-Origin: $allowed_origin");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

session_start();

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $userType = $data['type'];
    $email = $data['email'];
    $password = $data['password'];

    if ($userType === "customer") {
        $sql = "SELECT CustomerID, FullName, Email, Phone, Password FROM Customer WHERE Email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($id, $fullName, $email, $phone, $hashed_password);
        $stmt->fetch();
    } else {
        $sql = "SELECT ProviderID, BusinessName, Email, Address, ServiceType, SpecificService, password FROM ServiceProvider WHERE Email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($id, $businessName, $email, $address, $serviceType, $specificservice, $hashed_password);
        $stmt->fetch();
    }

    if ($stmt->num_rows > 0 && password_verify($password, $hashed_password)) {
        echo json_encode(["message" => "Login successful"]);
        setcookie("id", $id, time() + (86400 * 3), "/");
        $_SESSION['user'] = [
            'type' => $userType,
            'id' => $id,
            'email' => $email,
            'name' => $userType === "customer" ? $fullName : $businessName
        ];
    } else {
        echo json_encode(["error" => "Invalid email or password"]);
    }

    $stmt->close();
    $conn->close();
}
