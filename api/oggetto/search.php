<?php
// headers richiesti
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
include_once '../config/database.php';
include_once '../objects/oggetto.php';

$database = new Database();
$db = $database->getConnection();

$oggetto = new Oggetto($db);

$keywords = isset($_GET['s']) ? $_GET["s"] : "";

//query dipartimenti
$stmt = $oggetto->search($keywords);
$num = $stmt->num_rows;

//verifica se ha trovato dei dati
if($num > 0) {
    //dipartimenti array
    $oggetto_arr = array();
    $oggetto_arr['records'] = array();

    while($row = $stmt->fetch_assoc()) {
        //estrae e trasforma il valore $row['Nome'] in $Nome
        extract($row);

        $oggetto_item = array(
            "id" => $ID_Oggetto,
            "nome" => $Nome,
            "modello" => $Modello,
            "locale" => $NomeLocale,
            "piano" => $NomePiano,
            "edificio" => $NomeEdificio,
            "dipartimento" => $NomeDipartimento
        );

        array_push($oggetto_arr['records'], $oggetto_item);
    }

    http_response_code(200); //200 OK

    echo json_encode($oggetto_arr);
} else {
    http_response_code(404); //404 Not Found

    echo json_encode(array("messagge" => "Nessun oggetto trovato."));
}

?>