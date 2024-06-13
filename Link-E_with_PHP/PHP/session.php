<?php
include_once 'classes/db_config.php';

header("Access-Control-Allow-Origin: http://localhost:8001");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

session_start();
ob_start();

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

if (isset($_COOKIE['id']) && isset($_COOKIE['userType'])) {
    $id = $_COOKIE['id'];
    $userType = $_COOKIE['userType'];

    if (!isset($_SESSION['user'])) {
        if ($userType === 'customer') {
            $sql = "SELECT CustomerID, FullName, Email, Phone FROM Customer WHERE CustomerID = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $stmt->store_result();
            $stmt->bind_result($customerId, $fullName, $email, $phone);
            $stmt->fetch();

            if ($stmt->num_rows > 0) {
                $_SESSION['user'] = [
                    'type' => $userType,
                    'id' => $customerId,
                    'name' => $fullName,
                    'email' => $email,
                    'phone' => $phone
                ];
            }
        } else {
            $sql = "SELECT ProviderID, BusinessName, Email, Address, ServiceType, SpecificService FROM ServiceProvider WHERE ProviderID = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $stmt->store_result();
            $stmt->bind_result($providerId, $businessName, $email, $address, $serviceType, $specificService);
            $stmt->fetch();

            if ($stmt->num_rows > 0) {
                $_SESSION['user'] = [
                    'type' => $userType,
                    'id' => $providerId,
                    'name' => $businessName,
                    'email' => $email,
                    'address' => $address,
                    'serviceType' => $serviceType,
                    'specificService' => $specificService
                ];
            }
        }
        $stmt->close();
    }

    if (isset($_SESSION['user'])) {
        echo json_encode(['user' => $_SESSION['user']]);
    } else {
        echo json_encode(['error' => 'User not found']);
    }
} else {
    echo json_encode(['error' => 'User not authenticated']);
}

$conn->close();
ob_end_flush();
