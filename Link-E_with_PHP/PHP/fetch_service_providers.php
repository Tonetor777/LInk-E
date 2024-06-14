<?php
include_once 'classes/db_config.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$eventType = $_GET['eventType'] ?? '';

$sql = $conn->prepare("SELECT * FROM ServiceProvider WHERE ServiceType = ?");
$sql->bind_param("s", $eventType);
$sql->execute();

$result = $sql->get_result();
$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

$sql->close();
$conn->close();

echo json_encode($data);
