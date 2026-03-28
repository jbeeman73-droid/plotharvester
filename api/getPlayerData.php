<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require "db.php";

$stmt = $pdo->query("
    SELECT id, name AS username, dob, gender, role, avatar
    FROM users
    ORDER BY created_at DESC
");

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>