<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require_once '/db.php';
class user{
    private $id;
    private $username;
    private $password;
    private $email;
    function __construct($id, $username, $password, $email){
        $this->id = $id;
        $this->username = $username;
        $this->password = $password;
        $this->email = $email;
        
    }
    function getId(){
        return $this->id;
    }
    function getUsername(){
        return $this->username;
    }
    function getPassword(){
        return $this->password;
    }
    function getEmail(){
        return $this->email;
    }
    function addToWatchLater($show_name) {
        global $myDB;
        $user_id = $this->id; 
        $query = "INSERT INTO watchlist (show_name, user_id) VALUES ('$show_name', '$user_id')";
        $myDB->executeQuery($query);
    }
    function addToFavorites($show_name) {
        global $myDB;
        $user_id = $this->id; 
        $query = "INSERT INTO favorites (show_name, user_id) VALUES ('$show_name', '$user_id')";
        $myDB->executeQuery($query);
    }
 

}

?>