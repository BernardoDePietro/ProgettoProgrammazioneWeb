<?php
class Piano {
    private $conn;
    private $table_name = "piano";

    public $id_dipartimento;
    public $nome_dipartimento;
    public $id_edificio;
    public $nome_edificio;
    public $id;
    public $nome;

    public function __construct($db) {
        $this->conn = $db;
    }

    function read() {
        //query che seleziona tutti gli elementi
        $sql = "SELECT $this->table_name.ID_Piano, $this->table_name.Nome, edificio.Nome AS NomeEdificio, dipartimento.Nome AS NomeDipartimento 
        FROM $this->table_name
        INNER JOIN edificio ON $this->table_name.ID_Edificio = edificio.ID_Edificio
        INNER JOIN dipartimento ON edificio.ID_Dip = dipartimento.ID_Dip
        ORDER BY ID_Piano ASC";

        //esegue la query
        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function create() {
        $this->id_edificio = htmlspecialchars(strip_tags($this->id_edificio));
        $this->nome = htmlspecialchars(strip_tags($this->nome));

        //query per inserire  un record
        $sql = "INSERT INTO $this->table_name (ID_Edificio, Nome) VALUES ('$this->id_edificio', '$this->nome')";

        $stmt = $this->conn->query($sql);

        if($stmt) {
            return true;
        } else {
            return false;
        }
    }

    function readOne() {
        //query per leggere un singolo record
        $sql = "SELECT $this->table_name.ID_Piano, $this->table_name.Nome, edificio.ID_Edificio, dipartimento.ID_Dip, edificio.Nome AS NomeEdificio, dipartimento.Nome AS NomeDipartimento 
        FROM $this->table_name
        INNER JOIN edificio ON $this->table_name.ID_Edificio = edificio.ID_Edificio
        INNER JOIN dipartimento ON edificio.ID_Dip = dipartimento.ID_Dip
        WHERE $this->table_name.ID_Piano = $this->id";

        //esegue la query
        $stmt = $this->conn->query($sql);

        if($stmt) {
            //prende una riga dai record recuperati
            while($row = $stmt->fetch_assoc()) {
                //imposta le proprietà dell'oggetto
                $this->id_dipartimento = $row['ID_Dip'];
                $this->id_edificio = $row['ID_Edificio'];
                $this->nome_dipartimento = $row['NomeDipartimento'];
                $this->nome_edificio = $row['NomeEdificio'];
                $this->nome = $row["Nome"];
            }
        }
    }

    function update() {

        $this->nome = htmlspecialchars(strip_tags($this->nome));

        $sql = "UPDATE $this->table_name SET ID_Edificio = '$this->id_edificio', Nome = '$this->nome'  WHERE ID_Piano = '$this->id'";

        $stmt = $this->conn->query($sql);

        if($stmt) {
            return true;
        } else {
            return false;
        }
    }

    function delete() {
        $sql = "DELETE FROM $this->table_name WHERE ID_Piano = '$this->id'";

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

        $sql = "SELECT $this->table_name.ID_Piano, $this->table_name.Nome, dipartimento.Nome AS NomeDipartimento, edificio.Nome AS NomeEdificio
        FROM $this->table_name
        INNER JOIN edificio ON $this->table_name.ID_Edificio = edificio.ID_Edificio
        INNER JOIN dipartimento ON edificio.ID_Dip = dipartimento.ID_Dip
        WHERE $this->table_name.Nome LIKE '$keywords'";
    
        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function searchEdi($id_edificio) {
        $sql = "SELECT * FROM $this->table_name WHERE ID_Edificio = $id_edificio";

        $stmt = $this->conn->query($sql);

        return $stmt;
    }
}
?>