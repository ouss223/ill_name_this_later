<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require_once 'db.php';
class admin{
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
   function addBlogPost($title , $content)
   {
         global $myDB;
         $query = "INSERT INTO blog_post (title, content,admin_id) VALUES ('$title', '$content', '$this->id')";
         $myDB->executeQuery($query);
   }
 

}

?>