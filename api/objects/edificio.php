<?php
class Edificio {
    private $conn;
    private $table_name = "edificio";

    public $nome;
    public $id;
    public $id_dipartimento;
    public $nome_dipartimento;

    public function __construct($db) {
        $this->conn = $db;
    }

    function read() {
        //query che seleziona tutti gli elementi
        $sql = "SELECT $this->table_name.ID_Edificio, $this->table_name.Nome, dipartimento.Nome AS NomeDipartimento 
        FROM $this->table_name
        INNER JOIN dipartimento ON $this->table_name.ID_Dip = dipartimento.ID_Dip
        ORDER BY ID_Edificio ASC";

        //esegue la query
        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function create() {
        //query per inserire  un record
        $sql = "INSERT INTO edificio (ID_Dip, Nome) VALUES ('$this->id_dipartimento','$this->nome')";

        $this->nome = htmlspecialchars(strip_tags($this->nome));

        $stmt = $this->conn->query($sql);

        if($stmt) {
            return true;
        } else {
            return false;
        }
    }

    function readOne() {
        //query per leggere un singolo record
        $sql = "SELECT $this->table_name.ID_Edificio, $this->table_name.ID_Dip, $this->table_name.Nome, dipartimento.Nome AS NomeDipartimento 
        FROM $this->table_name 
        INNER JOIN dipartimento ON $this->table_name.ID_Dip = dipartimento.ID_Dip
        WHERE ID_Edificio = '$this->id'";

        //esegue la query
        $stmt = $this->conn->query($sql);

        if($stmt) {
            //prende una riga dai record recuperati
            while($row = $stmt->fetch_assoc()) {
                //imposta le proprietà dell'oggetto
                $this->id_dipartimento = $row['ID_Dip'];
                $this->nome_dipartimento = $row['NomeDipartimento'];
                $this->nome = $row['Nome'];
            }
        }
    }

    function update() {
        $sql = "UPDATE $this->table_name SET ID_Dip = '$this->id_dipartimento', Nome = '$this->nome' WHERE ID_Edificio = '$this->id'";
    
        $this->nome = htmlspecialchars(strip_tags($this->nome));

        $stmt = $this->conn->query($sql);

        if($stmt) {
            return true;
        } else {
            return false;
        }
    }

    function delete() {
        $sql = "DELETE FROM $this->table_name WHERE ID_Edificio = '$this->id'";

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

        $sql = "SELECT $this->table_name.ID_Edificio, $this->table_name.Nome, dipartimento.Nome AS NomeDipartimento 
        FROM $this->table_name INNER JOIN dipartimento ON $this->table_name.ID_Dip = dipartimento.ID_Dip 
        WHERE $this->table_name.Nome LIKE '$keywords' 
        ORDER BY $this->table_name.Nome DESC";
    
        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function searchDip($id_dipartimento) {
        $sql = "SELECT * FROM $this->table_name WHERE ID_Dip = $id_dipartimento";

        $stmt = $this->conn->query($sql);

        return $stmt;
    }
}
?>