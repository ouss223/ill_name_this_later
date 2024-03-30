<?php
    include_once 'auth.php';
    include_once '../models/db.php';
    global $myDB;
    function emailExists($email){
        global $myDB;
        $query = "SELECT * FROM users WHERE email = '$email'";
        $result = $myDB->executeQuery($query);
        if($result->num_rows > 0){
            return true;
        }
        return false;
    }
    function createUser($password,$username,$email)
    {
        global $myDB;
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $query = "INSERT INTO users (username, password, email) VALUES ('$username', '$hash', '$email')";
        $myDB->executeQuery($query);
        $query = "SELECT id FROM users WHERE email = '$email'";
        $result = $myDB->executeQuery($query);
        $row = $result->fetch_assoc();
        $userId = $row['id'];
        $authToken = generateToken($userId);

        return $authToken;
    }
    function selectUserByEmail($email){
        global $myDB;
        $query = "SELECT id, password,role FROM users WHERE email = ?";
        $stmt = $myDB->prepare($query);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result;
    }
    function getUserInfos($user_id){
        global $myDB;
        $query = "SELECT username, email,avatar FROM users WHERE id = ?";
        $stmt = $myDB->prepare($query);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }
    function changeField($user_id,$field_name,$field_value){
        global $myDB;
        if($field_name=="password"){
            $field_value = password_hash($field_value, PASSWORD_DEFAULT);
        }
        $query = "UPDATE users SET $field_name = ? WHERE id = ?";
        $stmt = $myDB->prepare($query);
        $stmt->bind_param("si", $field_value, $user_id);
        $stmt->execute();
        return $stmt->affected_rows > 0;
    }
    /*function modifyRestriction($user_id,$state){
        global $myDB;
    $query = "SELECT restriction FROM users WHERE id = ?";
    $stmt = $myDB->prepare($query);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $stmt->bind_result($current_state);
    $stmt->fetch();
    $stmt->close();
    
    if ($current_state != $state) {
        $query = "UPDATE users SET restriction = ? WHERE id = ?";
        $stmt = $myDB->prepare($query);
        $stmt->bind_param("ii", $state, $user_id);
        $stmt->execute();
        
        return $stmt->affected_rows > 0;
    } 
    
    return true;
    }*/







?>