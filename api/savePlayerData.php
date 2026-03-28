<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = $data["username"] ?? null;
$dob = $data["dob"] ?? null;
$gender = $data["gender"] ?? null;
$role = $data["role"] ?? null;
$avatar = $data["avatar"] ?? null;

if (!$username) {
    echo json_encode(["success" => false, "error" => "Username is required"]);
    exit;
}

$stmt = $pdo->prepare("
    INSERT INTO users (name, dob, gender, role, avatar)
    VALUES (?, ?, ?, ?, ?)
");

$stmt->execute([$username, $dob, $gender, $role, $avatar]);

echo json_encode([
    "success" => true,
    "id" => $pdo->lastInsertId()
]);
?>