<?php
class Dipartimento {
    private $conn;
    private $table_name = "dipartimento";

    public $id;
    public $nome;
    public $via;
    public $cap;
    public $civico;

    public function __construct($db) {
        $this->conn = $db;
    }

    function read() {
        //query che seleziona tutti gli elementi
        $sql = "SELECT * FROM $this->table_name";

        // esegue la query
        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function create() {
        //query per inserire un record
        $sql = "INSERT INTO $this->table_name (ID_Uni, Nome, Via, Cap, Civico) VALUES ('2', '$this->nome', '$this->via', '$this->cap', '$this->civico')";

        $this->nome = htmlspecialchars(strip_tags($this->nome));
        $this->via = htmlspecialchars(strip_tags($this->via));
        $this->cap = htmlspecialchars(strip_tags($this->cap));
        $this->civico = htmlspecialchars(strip_tags($this->civico));

        $stmt = $this->conn->query($sql);

        if($stmt) {
            return true;
        } else {
            return false;
        }
    }

    function readOne() {
        //query per leggere un singolo record
        $sql = "SELECT * FROM $this->table_name WHERE ID_Dip = $this->id";

        //execute query
        $stmt = $this->conn->query($sql);

        if($stmt) {
            //prende una riga dai record recuperati 
            while($row = $stmt->fetch_assoc()) {
                //imposta le proprietà dell'oggetto
                $this->nome = $row['Nome'];
                $this->via = $row['Via'];
                $this->cap = $row['Cap'];
                $this->civico = $row['Civico'];
            }
        }
    }

    function update() {
        $sql = "UPDATE $this->table_name SET Nome = '$this->nome', Via = '$this->via', Cap = '$this->cap', Civico = '$this->civico' WHERE ID_Dip = '$this->id'";

        $this->nome = htmlspecialchars(strip_tags($this->nome));
        $this->via = htmlspecialchars(strip_tags($this->via));
        $this->cap = htmlspecialchars(strip_tags($this->cap));
        $this->civico = htmlspecialchars(strip_tags($this->civico));

        $stmt = $this->conn->query($sql);

        if($stmt) {
            return true;
        } else {
            return false;
        }
    }

    function delete() {
        $sql = "DELETE FROM $this->table_name WHERE ID_Dip = '$this->id'";

        $stmt = $this->conn->query($sql);

        if($stmt) {
            return true;
        } else {
            return false;
        }
    }

    function search($keywords) {
        $keywords = htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";

        $sql = "SELECT * FROM $this->table_name WHERE Nome LIKE '$keywords' OR Via LIKE '$keywords' OR Cap LIKE '$keywords' OR Civico LIKE '$keywords' ORDER BY Nome DESC";

        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    public function readPaging($from_record_num, $records_per_page) {
        $sql = "SELECT * FROM $this->table_name ORDER BY $this->table_name.Nome DESC LIMIT $from_record_num, $records_per_page";

        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    public function count() {
        $sql = "SELECT COUNT(*) AS total_rows FROM $this->table_name";

        $stmt = $this->conn->query($sql);

        $row = $stmt->fetch_assoc();

        return $row['total_rows'];
    }
}
?>