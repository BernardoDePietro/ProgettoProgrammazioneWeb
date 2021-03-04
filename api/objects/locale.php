<?php
class Locale {
    private $conn;
    private $table_name = "locale";

    public $id_tipologia;
    public $tipo;
    public $id_piano;
    public $nome_piano;
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
        $sql = "SELECT $this->table_name.ID_Locale, $this->table_name.Nome, tipologia.Tipo, piano.Nome AS NomePiano, edificio.Nome AS NomeEdificio, dipartimento.Nome AS NomeDipartimento 
        FROM $this->table_name
        INNER JOIN tipologia ON $this->table_name.ID_Tipologia = tipologia.ID_Tipologia
        INNER JOIN piano ON $this->table_name.ID_Piano = piano.ID_Piano
        INNER JOIN edificio ON piano.ID_Edificio = edificio.ID_Edificio
        INNER JOIN dipartimento ON edificio.ID_Dip = dipartimento.ID_Dip
        ORDER BY ID_Locale ASC";

        //esegue la query
        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function create() {
        $this->id_piano = htmlspecialchars(strip_tags($this->id_piano));
        $this->nome = htmlspecialchars(strip_tags($this->nome));
        $this->id_tipologia = htmlspecialchars(strip_tags($this->id_tipologia));

        //query per inserire  un record
        $sql = "INSERT INTO $this->table_name (ID_Piano, ID_Tipologia, Nome) VALUES ('$this->id_piano', '$this->id_tipologia', '$this->nome')";

        $stmt = $this->conn->query($sql);

        if($stmt) {
            return true;
        } else {
            return false;
        }
    }

    function readOne() {
        //query per leggere un singolo record
        $sql = "SELECT $this->table_name.ID_Locale, $this->table_name.Nome, tipologia.ID_Tipologia, piano.ID_Piano, edificio.ID_Edificio, dipartimento.ID_Dip, tipologia.Tipo, piano.Nome AS NomePiano, edificio.Nome AS NomeEdificio, dipartimento.Nome AS NomeDipartimento 
        FROM $this->table_name
        INNER JOIN tipologia ON $this->table_name.ID_Tipologia = tipologia.ID_Tipologia
        INNER JOIN piano ON $this->table_name.ID_Piano = piano.ID_Piano
        INNER JOIN edificio ON piano.ID_Edificio = edificio.ID_Edificio
        INNER JOIN dipartimento ON edificio.ID_Dip = dipartimento.ID_Dip
        WHERE $this->table_name.ID_Locale = $this->id";

        //esegue la query
        $stmt = $this->conn->query($sql);

        if($stmt) {
            //prende una riga dai record recuperati
            while($row = $stmt->fetch_assoc()) {
                //imposta le proprietà dell'oggetto
                $this->id_dipartimento = $row['ID_Dip'];
                $this->id_edificio = $row['ID_Edificio'];
                $this->id_piano = $row['ID_Piano'];
                $this->id_tipologia = $row['ID_Tipologia'];
                $this->nome_dipartimento = $row['NomeDipartimento'];
                $this->nome_edificio = $row['NomeEdificio'];
                $this->nome_piano = $row['NomePiano'];
                $this->tipo = $row['Tipo'];
                $this->nome = $row["Nome"];
            }
        }
    }

    function update() {

        $this->nome = htmlspecialchars(strip_tags($this->nome));

        $sql = "UPDATE $this->table_name SET ID_Piano = '$this->id_piano', ID_Tipologia = '$this->id_tipologia', Nome = '$this->nome' WHERE ID_Locale = '$this->id'";

        $stmt = $this->conn->query($sql);

        if($stmt) {
            return true;
        } else {
            return false;
        }
    }

    function delete() {
        $sql = "DELETE FROM $this->table_name WHERE ID_Locale = '$this->id'";

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

        $sql = "SELECT $this->table_name.ID_Locale, $this->table_name.Nome, tipologia.Tipo AS NomeTipologia, piano.Nome AS NomePiano, edificio.Nome AS NomeEdificio, dipartimento.Nome AS NomeDipartimento 
        FROM $this->table_name
        INNER JOIN tipologia ON $this->table_name.ID_Tipologia = tipologia.ID_Tipologia
        INNER JOIN piano ON $this->table_name.ID_Piano = piano.ID_Piano
        INNER JOIN edificio ON piano.ID_Edificio = edificio.ID_Edificio
        INNER JOIN dipartimento ON edificio.ID_Dip = dipartimento.ID_Dip
        WHERE $this->table_name.Nome LIKE '$keywords'";
    
        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function readUfficio() {
        //query che seleziona tutti gli elementi
        $sql = "SELECT $this->table_name.ID_Locale, $this->table_name.Nome, piano.Nome AS NomePiano, edificio.Nome AS NomeEdificio, dipartimento.Nome AS NomeDipartimento, docente.Nome AS NomeDocente, docente.Cognome AS CognomeDocente
        FROM $this->table_name
        INNER JOIN docente ON $this->table_name.ID_Locale = docente.ID_Locale
        INNER JOIN piano ON $this->table_name.ID_Piano = piano.ID_Piano
        INNER JOIN edificio ON piano.ID_Edificio = edificio.ID_Edificio
        INNER JOIN dipartimento ON edificio.ID_Dip = dipartimento.ID_Dip
        ORDER BY $this->table_name.ID_Locale ASC";

        //esegue la query
        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function searchUfficio($keywords) {
        $keywords = htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";

        $sql = "SELECT $this->table_name.ID_Locale, $this->table_name.Nome, piano.Nome AS NomePiano, edificio.Nome AS NomeEdificio, dipartimento.Nome AS NomeDipartimento, docente.Nome AS NomeDocente, docente.Cognome AS CognomeDocente
        FROM $this->table_name
        INNER JOIN docente ON $this->table_name.ID_Locale = docente.ID_Locale
        INNER JOIN piano ON $this->table_name.ID_Piano = piano.ID_Piano
        INNER JOIN edificio ON piano.ID_Edificio = edificio.ID_Edificio
        INNER JOIN dipartimento ON edificio.ID_Dip = dipartimento.ID_Dip
        WHERE docente.Cognome LIKE '$keywords' OR docente.Nome LIKE '$keywords'";
    
        $stmt = $this->conn->query($sql);

        return $stmt;
    }
}
?>