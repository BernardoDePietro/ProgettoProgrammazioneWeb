<?php
class Ordine {
    private $conn;
    private $table_name = "ordine";

    public $id;
    public $nome;
    public $matricola = "467546";
    public $modello;
    public $ultimo_ordine;

    public function __construct($db) {
        $this->conn = $db;
    }

    function readFornitore() {
        //query che seleziona tutti gli elementi
        $sql = "SELECT ordine.ID_Ordine, ordine.Oggetto, modello.Modello, dipartimento.Nome
        FROM ordine
        INNER JOIN oggetto ON ordine.ID_Ordine = oggetto.ID_Ordine
        INNER JOIN modello ON oggetto.ID_Modello = modello.ID_Modello
        INNER JOIN direttore ON ordine.Mat_Direttore = direttore.Matricola
        INNER JOIN dipartimento ON direttore.ID_Dip = dipartimento.ID_Dip
        WHERE ordine.Stato = '0'";

        //esegue la query
        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function readIncaricoFornitore($id_fornitore) {
        //query che seleziona tutti gli elementi
        $sql = "SELECT ordine.ID_Ordine, ordine.Oggetto, modello.Modello, dipartimento.Nome
        FROM ordine
        INNER JOIN oggetto ON ordine.ID_Ordine = oggetto.ID_Ordine
        INNER JOIN modello ON oggetto.ID_Modello = modello.ID_Modello
        INNER JOIN direttore ON ordine.Mat_Direttore = direttore.Matricola
        INNER JOIN dipartimento ON direttore.ID_Dip = dipartimento.ID_Dip
        WHERE ordine.ID_Fornitore = '$id_fornitore'";

        //esegue la query
        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function readDirettore() {
        $sql = "SELECT ordine.ID_Ordine, ordine.Oggetto, ordine.Stato, modello.Modello, dipartimento.Nome
        FROM ordine
        INNER JOIN oggetto ON ordine.ID_Ordine = oggetto.ID_Ordine
        INNER JOIN modello ON oggetto.ID_Modello = modello.ID_Modello
        INNER JOIN direttore ON ordine.Mat_Direttore = direttore.Matricola
        INNER JOIN dipartimento ON direttore.ID_Dip = dipartimento.ID_Dip";

        //esegue la query
        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function searchDirettore($keywords) {
        $keywords = htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";

        $sql = "SELECT ordine.ID_Ordine, ordine.Oggetto, ordine.Stato, modello.Modello, dipartimento.Nome
        FROM ordine
        INNER JOIN oggetto ON ordine.ID_Ordine = oggetto.ID_Ordine
        INNER JOIN modello ON oggetto.ID_Modello = modello.ID_Modello
        INNER JOIN direttore ON ordine.Mat_Direttore = direttore.Matricola
        INNER JOIN dipartimento ON direttore.ID_Dip = dipartimento.ID_Dip
        WHERE ordine.Oggetto LIKE '$keywords'";

        //esegue la query
        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function create() {
        $this->matricola = htmlspecialchars(strip_tags($this->matricola));
        $this->nome = htmlspecialchars(strip_tags($this->nome));

        $sql = "INSERT INTO $this->table_name (Oggetto, Mat_Direttore, Stato) VALUES ('$this->nome', '$this->matricola', '0')";

        $stmt = $this->conn->query($sql);
        
        return $stmt;
    }

    function createOggettoOrdine() {
        $sql = "INSERT INTO oggetto (ID_Modello, ID_Ordine, Nome) VALUES ('$this->modello', '$this->ultimo_ordine', '$this->nome')";
        $stmt = $this->conn->query($sql);
        if($stmt) {
            return true;
        }
    }

    function getLastOrdine() {
        $sql = "SELECT ID_Ordine FROM ordine ORDER BY ID_Ordine DESC LIMIT 1";

        $stmt = $this->conn->query($sql);

        if($stmt) {
            $row = $stmt->fetch_assoc();
            $this->ultimo_ordine = $row['ID_Ordine'];
            return true;
        }
        
        return false;
    }

    function accettaIncarico($id, $id_fornitore) {
        $sql = "UPDATE ordine SET Stato = '1', ID_Fornitore = '$id_fornitore' WHERE ID_Ordine = '$id'";

        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function completaOrdine($id) {
        $sql = "DELETE FROM ordine WHERE ID_Ordine = '$id'";

        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function aggiungiOggettoMagazzino($oggetto) {
        $sql = "INSERT INTO magazzino (Nome) VALUES ('$oggetto')";

        $stmt = $this->conn->query($sql);

        return $stmt;
    }

    function getLastMagazzino() {
        $sql = "SELECT ID_Magazzino FROM magazzino ORDER BY ID_Magazzino DESC LIMIT 1";

        $stmt = $this->conn->query($sql);

        if($stmt) {
            $row = $stmt->fetch_assoc();
            return $row['ID_Magazzino'];
        }
        
        return false;
    }

    function updateOggettoOrdine($id_magazzino, $id_ordine) {
        $sql = "UPDATE oggetto SET ID_Magazzino = '$id_magazzino', ID_Ordine = NULL WHERE ID_Ordine = '$id_ordine'";
        $stmt = $this->conn->query($sql);
        if($stmt) {
            return true;
        }
    }

    function getDatiOggettoOrdine($id) {
        $sql = "SELECT Oggetto FROM ordine WHERE ID_Ordine = '$id'";

        $stmt = $this->conn->query($sql);
        
        if($stmt) {
            $row = $stmt->fetch_assoc();
            return $row['Oggetto'];
        }

        return $stmt;
    }
}
?>