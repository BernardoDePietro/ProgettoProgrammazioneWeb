<?php
// headers richiesti
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
include_once '../config/database.php';
include_once '../objects/piano.php';

$database = new Database();
$db = $database->getConnection();

$piano = new Piano($db);

$keywords = isset($_GET['s']) ? $_GET["s"] : "";

//query dipartimenti
$stmt = $piano->search($keywords);
$num = $stmt->num_rows;

//verifica se ha trovato dei dati
if($num > 0) {
    //dipartimenti array
    $piano_arr = array();
    $piano_arr['records'] = array();

    while($row = $stmt->fetch_assoc()) {
        //estrae e trasforma il valore $row['Nome'] in $Nome
        extract($row);

        $piano_item = array(
            "id" => $ID_Piano,
            "nome" => $Nome,
            "dipartimento" => $NomeDipartimento,
            "edificio" => $NomeEdificio,
        );

        array_push($piano_arr['records'], $piano_item);
    }

    http_response_code(200); //200 OK

    echo json_encode($piano_arr);
} else {
    http_response_code(404); //404 Not Found

    echo json_encode(array("messagge" => "Nessun piano trovato."));
}

?>