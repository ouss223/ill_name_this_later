<?php

require_once '../models/db.php';
require_once '../Repositories/auth.php';
require_once "../Repositories/ProjectRepository.php";
require_once "../Repositories/UserRepository.php";
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    http_response_code(200);
    exit;
}
if ($_SERVER["REQUEST_METHOD"] != "POST" || $_SERVER["REQUEST_URI"] != "/api/login.php") {
    http_response_code(404);
    echo json_encode(array("error" => "Bad route or incorrect method"));
    exit; 
}

$body = json_decode(file_get_contents('php://input'), true);
$email = sanitizeInput($body["email"]);
$password = $body["password"];

$result = selectUserByEmail($email);

if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    $hashedPasswordFromDatabase = $row['password'];

    if (password_verify($password, $hashedPasswordFromDatabase)) {
        $authToken = generateToken($row['id']);
        if (isset($authToken)){
            echo json_encode(array("auth" => "Bearer " . $authToken, "message" => "User logged in successfully","role"=>$row['role']));
        } else {
            http_response_code(500);
            echo json_encode(array("error" => "An error occurred while storing authentication token"));
        }
    } else {
        http_response_code(401); 
        echo json_encode(array("error" => "Invalid  password"));
    }
} else {
    http_response_code(401); 
    echo json_encode(array("error" => "Invalid email"));
}



?>