<?php 
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS,PATCH');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    http_response_code(200);
    exit;
}
require_once "../Repositories/ProjectRepository.php";
require_once '../models/db.php';
require_once '../Repositories/auth.php';
require_once "../Repositories/UserRepository.php";
global $myDB;
if ($_SERVER["REQUEST_METHOD"] == "PATCH" && $_SERVER["REQUEST_URI"] == "/api/changeField.php") {
    $body = json_decode(file_get_contents("php://input"), true);
    if (!isset($_SERVER['HTTP_AUTHORIZATION']) || !isset($body["field_name"]) || !isset($body["field_value"])) {
        http_response_code(400);
        echo json_encode(array("error" => "Missing parameters"));
        exit;
    }
    $auth = $_SERVER['HTTP_AUTHORIZATION'];
    $field_name = sanitizeInput($body["field_name"]);
    $field_value = sanitizeInput($body["field_value"]);
    $user_id = verifyToken(tokenExtractor($auth));   
    if ($user_id !== false) {
        $result = changeField($user_id, $field_name, $field_value);
        if (!$result['success']) {
            http_response_code(500);
            echo json_encode(array("error" => $result['message']));
            exit;
        } else {
            echo json_encode(array("message" => $result['message']));
        }
    }else {
        http_response_code(401);
        echo json_encode(array("error" => "Invalid auth token"));
    }
}
else {
    http_response_code(404);
    echo json_encode(array("error" => "Bad route or incorrect method"));
}


?>