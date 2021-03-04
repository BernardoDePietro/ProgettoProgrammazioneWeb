<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/magazzino.php';

$database = new Database();
$db = $database->getConnection();
  
$magazzino = new Magazzino($db);

$stmt = $magazzino->read();
$num = $stmt->num_rows;

if($num > 0) {
  
    $magazzino_arr = array();
    $magazzino_arr["records"] = array();

    while ($row = $stmt->fetch_assoc()) {
        extract($row);
  
        $magazzino_item = array(
            "id" => $ID_Magazzino,
            "nome" => $Nome,
            "modello" => $Modello,
        );
  
        array_push($magazzino_arr["records"], $magazzino_item);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    // visualizza i dati in formato json
    echo json_encode($magazzino_arr);
} else {
    // set response code - 404 Not found
    http_response_code(404);
  
    echo json_encode(array("message" => "Nessun oggetto trovato."));
}