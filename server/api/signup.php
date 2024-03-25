<?php



if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    http_response_code(200);
    exit;
}
require_once '../models/db.php';
require_once "../Repositories/UserRepository.php";
require_once "../Repositories/ProjectRepository.php";
require_once '../Repositories/auth.php';

global $myDB;

if ($_SERVER["REQUEST_METHOD"] == "POST" && $_SERVER["REQUEST_URI"] == "/api/signup.php") {
    $body = $requestData = json_decode(file_get_contents('php://input'), true);
    $username = $body["username"];
    $password = $body["password"];
    $email = $body["email"];
    
    if (emailExists($email)) {
        echo "Email already exists";
        return;
    } else {
        $auth = createUser($password, $username, $email);
        if (isset($auth)) {
            echo json_encode(array("auth" =>"Bearer " . $auth,
        "message"=>"User created successfully"));
        } else {
            http_response_code(500); 
            echo json_encode(array("error" => "An error occurred"));
        }
    }
}
else
{
    http_response_code(404);
    echo json_encode(array("error" => "Bad route or incorrect method"));
}

?>