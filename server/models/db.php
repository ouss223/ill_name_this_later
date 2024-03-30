<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
class DB {
    private $host;
    private $dbName;
    private $username;
    private $password;
    private $conn;

    public function __construct($host, $dbName, $username, $password) {
        $this->host = $host;
        $this->dbName = $dbName;
        $this->username = $username;
        $this->password = $password;
    }

    public function connect() {
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->dbName);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function executeQuery($query) {
        $result = $this->conn->query($query);
        if (!$result) {
            die("Query execution failed: " . $this->conn->error);
        }
        return $result;
    }
    public function prepare($query) {
        return $this->conn->prepare($query);
    }


    public function disconnect() {
        $this->conn->close();
    }
}
$myDB = new DB("127.0.0.1","project_123","root","");
$myDB->connect();
$query1 = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    role ENUM('admin', 'watcher') DEFAULT 'watcher',
    avatar VARCHAR(50) NOT NULL DEFAULT '1',
    email VARCHAR(50) NOT NULL
)";
$query2 = "CREATE TABLE IF NOT EXISTS admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
)";
$query3 = "CREATE TABLE IF NOT EXISTS favorites(
    id INT AUTO_INCREMENT PRIMARY KEY,
    show_name VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
   
)";
$query4 = "CREATE TABLE IF NOT EXISTS watchlist(
    id INT AUTO_INCREMENT PRIMARY KEY,
    show_name VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
   
)";
$query5 = "CREATE TABLE IF NOT EXISTS blog_post (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    content VARCHAR(10000) NOT NULL,
    admin_id INT NOT NULL,
    image VARCHAR(250) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admin(id)
)";

$query6 = "CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(10000) NOT NULL,
    user_id INT NOT NULL,
    episode INTEGER DEFAULT 1,
    season INTEGER DEFAULT 1,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    show_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
)";



$myDB->executeQuery($query1);
$myDB->executeQuery($query2);
$myDB->executeQuery($query3);
$myDB->executeQuery($query4);
$myDB->executeQuery($query5);
$myDB->executeQuery($query6);




?>
