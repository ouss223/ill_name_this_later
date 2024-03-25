<?php
require '../vendor/autoload.php';

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;
$key = "285b0cf2096483c17daa060a778278d91f0856378faa08b2188f692dceca4d5b";

function generateToken($userId, $expiration = 3600000, $algorithm = 'HS256') {
    global $key;
    $payload = array(
        "user_id" => $userId,
        "exp" => time() + $expiration
    );

    return JWT::encode($payload, $key, $algorithm);
}
function verifyToken($token) {
    global $key;
    try {
        $decoded = JWT::decode($token, new Key($key, 'HS256')); // Pass $headers directly
        return $decoded->user_id;
    } catch (Exception $e) {
        return false;
    }
}


function tokenExtractor($authorizationHeader){
    $parts = explode(" ", $authorizationHeader);
    if (count($parts) === 2 && strtolower($parts[0]) === 'bearer') {
        return $parts[1];
    } else {
        return false; 
    }
}



?>


