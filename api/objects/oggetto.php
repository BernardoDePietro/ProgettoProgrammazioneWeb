<?php
class Oggetto {
    private $conn;
    private $table_name = "oggetto";

    /*
    public $id_tipologia;
    public $tipo;
    public $id_piano;
    public $nome_piano;
    public $id_dipartimento;
    public $nome_dipartimento;
    public $id_edificio;
    public $nome_edificio;
    */

    public $id;
    public $nome;

    public function __construct($db) {
        $this->conn = $db;
    }

    function read() {
        $sql = "SELECT $this->table_name.ID_Oggetto, $this->table_name.Nome, modello.Modello, locale.Nome AS NomeLocale, piano.Nome AS NomePiano, edificio.Nome AS NomeEdificio, dipartimento.Nome AS NomeDipartimento
        FROM $this->table_name
        INNER JOIN modello ON $this->table_name.ID_Modello = modello.ID_Modello
        INNER JOIN locale ON $this->table_name.ID_Locale = locale.ID_Locale
        INNER JOIN piano ON locale.ID_Piano = piano.ID_Piano
        INNER JOIN edificio ON piano.ID_Edificio = edificio.ID_Edificio
        INNER JOIN dipartimento ON edificio.ID_Dip = dipartimento.ID_Dip
        WHERE $this->table_name.ID_Locale IS NOT NULL";

        $stmt = $this->conn->query($sql);

        return $stmt;
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

        $sql = "SELECT $this->table_name.ID_Oggetto, $this->table_name.Nome, modello.Modello, locale.Nome AS NomeLocale, piano.Nome AS NomePiano, edificio.Nome AS NomeEdificio, dipartimento.Nome AS NomeDipartimento
        FROM $this->table_name
        INNER JOIN modello ON $this->table_name.ID_Modello = modello.ID_Modello
        INNER JOIN locale ON $this->table_name.ID_Locale = locale.ID_Locale
        INNER JOIN piano ON locale.ID_Piano = piano.ID_Piano
        INNER JOIN edificio ON piano.ID_Edificio = edificio.ID_Edificio
        INNER JOIN dipartimento ON edificio.ID_Dip = dipartimento.ID_Dip
        WHERE $this->table_name.ID_Locale IS NOT NULL AND locale.Nome LIKE '$keywords'";

        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function searchOggettoMagazzino($keywords) {
        $keywords = htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";

        $sql = "SELECT $this->table_name.ID_Oggetto, $this->table_name.Nome, modello.Modello AS NomeModello, magazzino.Nome AS NomeMagazzino
        FROM $this->table_name
        INNER JOIN modello ON $this->table_name.ID_Modello = modello.ID_Modello
        INNER JOIN magazzino ON $this->table_name.ID_Magazzino = magazzino.ID_Magazzino
        WHERE $this->table_name.Nome LIKE '$keywords'";
    
        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function readModello() {
        $sql = "SELECT * FROM modello";

        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function readOggettiUfficio($matricola) {
        $sql = "SELECT $this->table_name.Nome, modello.Modello
        FROM docente
        INNER JOIN $this->table_name ON docente.ID_Locale = $this->table_name.ID_Locale
        INNER JOIN modello ON $this->table_name.ID_Modello = modello.ID_Modello
        WHERE docente.Matricola = '$matricola'";

        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function searchOggettiUfficio($keywords, $matricola) {
        $keywords = htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";

        $sql = "SELECT $this->table_name.Nome, modello.Modello
        FROM docente
        INNER JOIN $this->table_name ON docente.ID_Locale = $this->table_name.ID_Locale
        INNER JOIN modello ON $this->table_name.ID_Modello = modello.ID_Modello
        WHERE docente.Matricola = '$matricola' AND $this->table_name.Nome LIKE '$keywords'";

        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function readOggettiLocale($id_locale) {
        $sql = "SELECT $this->table_name.ID_Oggetto, $this->table_name.Nome, modello.Modello
        FROM $this->table_name
        INNER JOIN modello ON oggetto.ID_Modello = modello.ID_Modello 
        WHERE ID_Locale = '$id_locale'";

        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function deleteOggettoLocale($id_oggetto) {
        $sql = "DELETE FROM $this->table_name WHERE $this->table_name.ID_Oggetto = '$id_oggetto'";

        $stmt = $this->conn->query($sql);

        return $stmt;
    }
    
    function readOggettiMagazzino() {
        $sql = "SELECT oggetto.ID_Oggetto, oggetto.Nome, modello.Modello
        FROM oggetto
        INNER JOIN modello ON oggetto.ID_Modello = modello.ID_Modello
        WHERE oggetto.ID_Magazzino IS NOT NULL";

        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function createOggettoLocale($id_oggetto, $id_locale) {
        $sql = "UPDATE oggetto SET oggetto.ID_Locale = '$id_locale', oggetto.ID_Magazzino = NULL WHERE oggetto.ID_Oggetto = '$id_oggetto'";

        $stmt = $this->conn->query($sql);

        return $stmt;
    }
}
?>