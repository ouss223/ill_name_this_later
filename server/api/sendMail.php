<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    http_response_code(200);
    exit;
}
require_once "../Repositories/ProjectRepository.php";
require_once '../models/db.php';
require_once '../Repositories/auth.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && $_SERVER["REQUEST_URI"] == "/api/sendMail.php") {
    $body = json_decode(file_get_contents("php://input"), true);
    if ( !isset($body["name"]) || !isset($body["email"]) || !isset($body["subject"]) || !isset($body["message"])  ) {
        http_response_code(400);
        echo json_encode(array("error" => "Missing parameters"));
        exit;
    }
    $name = $body["name"];
    $email = $body["email"];
    $subject = $body["subject"];
    $message = $body["message"];
    $success = sendMail($name, $email, $subject, $message);


    if ($success) {
        http_response_code(200);
        echo json_encode(array("message" => "Email sent successfully"));
    } else {
        http_response_code(500);
        echo json_encode(array("error" => "An error occurred while sending the email"));
    }
} else {
    http_response_code(404);
    echo json_encode(array("error" => "Bad route or incorrect method"));
}
?>
