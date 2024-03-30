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

if ($_SERVER["REQUEST_METHOD"] == "POST" && $_SERVER["REQUEST_URI"] == "/api/modifyComment.php") {
    $body = json_decode(file_get_contents("php://input"), true);

    if (!isset($_SERVER["HTTP_AUTHORIZATION"]) || !isset($body["show_id"])  || !isset($body["comment_id"]) || !isset($body["operation"]) || !isset($body["new_comment"]) )  {
        http_response_code(400);
        echo json_encode(array("error" => "Missing authentication token"));
        exit;
    }

    $auth = $_SERVER['HTTP_AUTHORIZATION'];
    $user_id = verifyToken(tokenExtractor($auth));  
    $show_id = $body["show_id"]; 
    $comment_id = $body["comment_id"];
    $operation = $body["operation"];
    $new_comment = $body["new_comment"];
    
    if ($user_id!== false) {
        if($operation=="delete")
        {
            $success = deleteComment($comment_id,$user_id);
            
        }
        else if($operation=="edit")
        {
            $success = modifyComment($comment_id,$new_comment,$user_id);
        }
        else{
            http_response_code(400);
            echo json_encode(array("error" => "Invalid operation"));
            exit;
        }
        if(!$success){
            http_response_code(500);
            echo json_encode(array("error" => "An error occurred while modifying comment"));
            exit;
        }
        else{
            echo json_encode(array("message" => "comment modified successfully"));
        }
        
        
        
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
