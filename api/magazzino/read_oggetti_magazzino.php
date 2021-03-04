<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/oggetto.php';

$database = new Database();
$db = $database->getConnection();
  
$oggetto = new Oggetto($db);

$stmt = $oggetto->readOggettiMagazzino();
$num = $stmt->num_rows;

if($num > 0) {
  
    $oggetto_arr = array();
    $oggetto_arr["records"] = array();

    while ($row = $stmt->fetch_assoc()) {
        extract($row);
  
        $oggetto_item = array(
            "id" => $ID_Oggetto,
            "oggetto" => $Nome,
            "modello" => $Modello
        );
  
        array_push($oggetto_arr["records"], $oggetto_item);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    // visualizza i dati in formato json
    echo json_encode($oggetto_arr);
} else {
    // set response code - 404 Not found
    http_response_code(404);
  
    echo json_encode(array("message" => "Nessun oggetto trovato."));
}