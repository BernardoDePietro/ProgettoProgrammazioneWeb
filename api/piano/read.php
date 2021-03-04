<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/piano.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
  
// initialize object
$piano = new Piano($db);

$stmt = $piano->read();
$num = $stmt->num_rows;

if($num > 0) {
  
    $piano_arr = array();
    $piano_arr["records"] = array();

    while ($row = $stmt->fetch_assoc()) {
        extract($row);
  
        $piano_item = array(
            "id" => $ID_Piano,
            "nome" => $Nome,
            "edificio" => $NomeEdificio,
            "dipartimento" => $NomeDipartimento,
        );
  
        array_push($piano_arr["records"], $piano_item);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    // visualizza i dati in formato json
    echo json_encode($piano_arr);
} else {
    // set response code - 404 Not found
    http_response_code(404);
  
    echo json_encode(array("message" => "Nessun piano trovato."));
}