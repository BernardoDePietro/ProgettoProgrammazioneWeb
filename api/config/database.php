<?php
class Database {
  
    // specify your own database credentials
    private $servername = "localhost";
    private $username = "root";
    private $pass = "";
    private $dbname = "my_depietroprogetto";
    public $conn;
  
    // get the database connection
    public function getConnection() {
  
        // Create connection
        $this->conn = new mysqli($this->servername, $this->username, $this->pass, $this->dbname);
        // Check connection
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
  
        return $this->conn;
    }
}
?>