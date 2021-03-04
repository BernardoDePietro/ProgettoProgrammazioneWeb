<?php
class Tipologia {
    private $conn;
    private $table_name = "tipologia";

    public $tipologia;
    public $id;

    public function __construct($db) {
        $this->conn = $db;
    }

    function read() {
        //query che seleziona tutti gli elementi
        $sql = "SELECT * FROM $this->table_name ORDER BY Tipo ASC";

        //esegue la query
        $stmt = $this->conn->query($sql);

        return $stmt;
    }
}
?>