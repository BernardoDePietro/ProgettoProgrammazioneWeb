<?php
class Magazzino {
    private $conn;
    private $table_name = "magazzino";

    public $id;
    public $nome;

    public function __construct($db) {
        $this->conn = $db;
    }

    function read() {
        $sql = "SELECT $this->table_name.ID_Magazzino, $this->table_name.Nome, modello.Modello FROM oggetto
        INNER JOIN $this->table_name ON $this->table_name.ID_Magazzino = oggetto.ID_Magazzino
        INNER JOIN modello ON oggetto.ID_Modello = modello.ID_Modello";

        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function delete() {
        $sql = "DELETE FROM $this->table_name WHERE ID_Magazzino = '$this->id'";

        $stmt = $this->conn->query($sql);

        if($stmt) {
            $sql = "DELETE FROM oggetto WHERE ID_Magazzino = '$this->id'";
            $stmt = $this->conn->query($sql);
            if($stmt) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function search($keywords) {
        $keywords = htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";

        $sql = "SELECT $this->table_name.ID_Magazzino, $this->table_name.Nome, modello.Modello
        FROM oggetto
        INNER JOIN modello ON oggetto.ID_Modello = modello.ID_Modello
        INNER JOIN $this->table_name ON $this->table_name.ID_Magazzino = oggetto.ID_Magazzino
        WHERE $this->table_name.Nome LIKE '$keywords'";
    
        $stmt = $this->conn->query($sql);

        return $stmt;
    }
}
?>