<?php
// headers richiesti
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
// include i file del db e dipartimento
include_once '../config/database.php';
include_once '../objects/edificio.php';
  
// istanzia il database e l'oggetto dipartimento
$database = new Database();
$db = $database->getConnection();

$edificio = new Edificio($db);

$keywords = isset($_GET['s']) ? $_GET["s"] : "";

//query dipartimenti
$stmt = $edificio->search($keywords);
$num = $stmt->num_rows;

//verifica se ha trovato dei dati
if($num > 0) {
    //dipartimenti array
    $edificio_arr = array();
    $edificio_arr['records'] = array();

    while($row = $stmt->fetch_assoc()) {
        //estrae e trasforma il valore $row['Nome'] in $Nome
        extract($row);

        $edificio_item = array(
            "id" => $ID_Edificio,
            "nome" => $Nome,
            "dipartimento" => $NomeDipartimento,
        );

        array_push($edificio_arr['records'], $edificio_item);
    }

    http_response_code(200); //200 OK

    echo json_encode($edificio_arr);
} else {
    http_response_code(404); //404 Not Found

    echo json_encode(array("messagge" => "Nessun edificio trovato."));
}

?>