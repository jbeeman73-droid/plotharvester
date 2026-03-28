<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$name = $data["name"] ?? null;
$avatar = $data["avatar"] ?? null;

if (!$name) {
    echo json_encode(["success" => false, "error" => "Name is required"]);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO users (name, avatar) VALUES (?, ?)");
$stmt->execute([$name, $avatar]);

echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
?>