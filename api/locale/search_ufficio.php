<?php
// headers richiesti
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
include_once '../config/database.php';
include_once '../objects/locale.php';

$database = new Database();
$db = $database->getConnection();

$locale = new Locale($db);

$keywords = isset($_GET['s']) ? $_GET["s"] : "";

//query
$stmt = $locale->searchUfficio($keywords);
$num = $stmt->num_rows;

//verifica se ha trovato dei dati
if($num > 0) {
    //dipartimenti array
    $locale_arr = array();
    $locale_arr['records'] = array();

    while($row = $stmt->fetch_assoc()) {
        //estrae e trasforma il valore $row['Nome'] in $Nome
        extract($row);

        $locale_item = array(
            "id" => $ID_Locale,
            "ufficio" => $Nome,
            "dipartimento" => $NomeDipartimento,
            "edificio" => $NomeEdificio,
            "piano" => $NomePiano,
            "nome" => $NomeDocente,
            "cognome" => $CognomeDocente
        );

        array_push($locale_arr['records'], $locale_item);
    }

    http_response_code(200); //200 OK

    echo json_encode($locale_arr);
} else {
    http_response_code(404); //404 Not Found

    echo json_encode(array("messagge" => "Nessun locale trovato."));
}

?>