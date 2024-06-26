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
global $myDB;

if ($_SERVER["REQUEST_METHOD"] == "GET" && $_SERVER["REQUEST_URI"] == "/api/getblogpost.php") {

    if (!isset($_SERVER["HTTP_AUTHORIZATION"])) {
        http_response_code(400);
        echo json_encode(array("error" => "Missing authentication token"));
        exit;
    }
    
    $auth = $_SERVER['HTTP_AUTHORIZATION'];
    $user_id = verifyToken(tokenExtractor($auth));   
    
    if ($user_id!== false) {
        $blogpost = getBlogPost();
        
        echo json_encode($blogpost);
    } else {
        http_response_code(401); 
        echo json_encode(array("error" => "Invalid auth token"));
    }
}
else{
    
        http_response_code(404);
        echo json_encode(array("error" => "Bad route or incorrect method"));
}
?>
