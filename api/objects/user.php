<?php

class User {

    private $conn;

    public $email;
    public $matricola;
    public $nome;
    public $cognome;
    public $password;

    //fornitore
    public $id_fornitore;
    public $nomeAzienda;

    public $ruolo;

    public function __construct($db) {
        $this->conn = $db;
    }

    function emailExists() {
        $email = htmlspecialchars(strip_tags($this->email));

        $sql = "SELECT studente.Matricola, studente.Nome, studente.Cognome, studente.Password FROM studente WHERE studente.Email = '$email'";

        $stmt = $this->conn->query($sql);

        if($stmt) {
            if($stmt->num_rows > 0) {
                $row = $stmt->fetch_assoc();
    
                $this->matricola = $row['Matricola'];
                $this->nome = $row['Nome'];
                $this->cognome = $row['Cognome'];
                $this->password = $row['Password'];
                $this->ruolo = "studente";
                return true;
            }
        }

        $sql = "SELECT direttore.Matricola, direttore.Nome, direttore.Cognome, direttore.Password FROM direttore WHERE direttore.Email = '$email'";

        $stmt = $this->conn->query($sql);

        if($stmt) {
            if($stmt->num_rows > 0) {
                $row = $stmt->fetch_assoc();

                $this->matricola = $row['Matricola'];
                $this->nome = $row['Nome'];
                $this->cognome = $row['Cognome'];
                $this->password = $row['Password'];
                $this->ruolo = "direttore";
                return true;
            }
        }

        $sql = "SELECT personale.Matricola, personale.Nome, personale.Cognome, personale.Password FROM personale WHERE personale.Email = '$email'";
        
        $stmt = $this->conn->query($sql);

        if($stmt) {
            if($stmt->num_rows > 0) {
                $row = $stmt->fetch_assoc();
    
                $this->matricola = $row['Matricola'];
                $this->nome = $row['Nome'];
                $this->cognome = $row['Cognome'];
                $this->password = $row['Password'];
                $this->ruolo = "personale";
                return true;
            }
        }

        $sql = "SELECT docente.Matricola, docente.Nome, docente.Cognome, docente.Password FROM docente WHERE docente.Email = '$email'";
        
        $stmt = $this->conn->query($sql);

        if($stmt) {
            if($stmt->num_rows > 0) {
                $row = $stmt->fetch_assoc();
    
                $this->matricola = $row['Matricola'];
                $this->nome = $row['Nome'];
                $this->cognome = $row['Cognome'];
                $this->password = $row['Password'];
                $this->ruolo = "docente";
                return true;
            }
        }
        
        $sql = "SELECT fornitore.ID_Fornitore, fornitore.Nome, fornitore.Password FROM fornitore WHERE fornitore.Email = '$email'";
        
        $stmt = $this->conn->query($sql);

        if($stmt) {
            if($stmt->num_rows > 0) {
                $row = $stmt->fetch_assoc();
    
                $this->matricola = $row['ID_Fornitore'];
                $this->nomeAzienda = $row['Nome'];
                $this->password = $row['Password'];
                $this->ruolo = "fornitore";
                return true;
            }
        }
    
        return false;
    }
}

?>