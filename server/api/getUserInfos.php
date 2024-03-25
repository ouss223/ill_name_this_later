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
    require_once "../Repositories/UserRepository.php";
    global $myDB;

    if ($_SERVER["REQUEST_METHOD"] == "GET" && $_SERVER["REQUEST_URI"] == "/api/getUserInfos.php") {
        if (!isset($_SERVER['HTTP_AUTHORIZATION']) ) {
            http_response_code(400);
            echo json_encode(array("error" => "Missing parameters"));
            exit;
        }
        $auth = $_SERVER['HTTP_AUTHORIZATION'];

        $user_id = verifyToken(tokenExtractor($auth));   
        if($user_id !== false){
            $userInfos = getUserInfos($user_id);
            if(!$userInfos){
                http_response_code(500);
                echo json_encode(array("error" => "An error occurred while getting user infos"));
                exit;
            }
            else{
                echo json_encode($userInfos);
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