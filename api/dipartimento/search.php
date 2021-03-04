<?php
// headers richiesti
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
// include i file del db e dipartimento
include_once '../config/core.php';
include_once '../config/database.php';
include_once '../objects/dipartimento.php';
  
// istanzia il database e l'oggetto dipartimento
$database = new Database();
$db = $database->getConnection();

$dipartimento = new Dipartimento($db);

$keywords = isset($_GET['s']) ? $_GET["s"] : "";

//query dipartimenti
$stmt = $dipartimento->search($keywords);
$num = $stmt->num_rows;

//verifica se ha trovato dei dati
if($num > 0) {
    //dipartimenti array
    $dipartimenti_arr = array();
    $dipartimenti_arr['records'] = array();

    while($row = $stmt->fetch_assoc()) {
        //estrae e trasforma il valore $row['Nome'] in $Nome
        extract($row);

        $dipartimenti_item = array(
            "id" => $ID_Dip,
            "nome" => $Nome,
            "via" => $Via,
            "cap" => $Cap,
            "civico" => $Civico
        );

        array_push($dipartimenti_arr['records'], $dipartimenti_item);
    }

    http_response_code(200); //200 OK

    echo json_encode($dipartimenti_arr);
} else {
    http_response_code(404); //404 Not Found

    echo json_encode(array("messagge" => "Nessun dipartimento trovato."));
}

?>