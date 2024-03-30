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

if ($_SERVER["REQUEST_METHOD"] == "POST" && $_SERVER["REQUEST_URI"] == "/api/addComment.php") {
    $body = json_decode(file_get_contents("php://input"), true);
    if (!isset($body["show_id"]) || !isset($body["comment"]) || !isset($_SERVER['HTTP_AUTHORIZATION']) || !isset($body["episode"]) || !isset($body["season"]) ) {
        http_response_code(400);
        echo json_encode(array("error" => "Missing parameters"));
        exit;
    }
    $auth = $_SERVER['HTTP_AUTHORIZATION'];
    $show_id = $body["show_id"];
    $comment = $body["comment"];

    $episode = $body["episode"];
    $season = $body["season"];

    $user_id = verifyToken(tokenExtractor($auth));   
    if($user_id !== false){
        $success = addComment($show_id, $comment, $user_id, $episode, $season);
        if(!$success){
            http_response_code(500);
            echo json_encode(array("error" => "An error occurred while adding favorite"));
            exit;
        }
        else{
            echo json_encode(array("message" => "comment added successfully"));
        }

        
    } else {
        http_response_code(401);
        echo json_encode(array("error" => "Invalid auth token"));
    }
}
else {
    http_response_code(404);
    echo json_encode(array("error" => "Bad route or incorrect method"));
}

?>
