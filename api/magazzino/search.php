<?php
// headers richiesti
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
include_once '../config/database.php';
include_once '../objects/magazzino.php';

$database = new Database();
$db = $database->getConnection();

$magazzino = new Magazzino($db);

$keywords = isset($_GET['s']) ? $_GET["s"] : "";

//query dipartimenti
$stmt = $magazzino->search($keywords);
$num = $stmt->num_rows;

//verifica se ha trovato dei dati
if($num > 0) {
    //dipartimenti array
    $magazzino_arr = array();
    $magazzino_arr['records'] = array();

    while($row = $stmt->fetch_assoc()) {
        //estrae e trasforma il valore $row['Nome'] in $Nome
        extract($row);

        $magazzino_item = array(
            "id" => $ID_Magazzino,
            "nome" => $Nome,
            "modello" => $Modello
        );

        array_push($magazzino_arr['records'], $magazzino_item);
    }

    http_response_code(200); //200 OK

    echo json_encode($magazzino_arr);
} else {
    http_response_code(404); //404 Not Found

    echo json_encode(array("messagge" => "Nessun oggetto trovato."));
}

?>