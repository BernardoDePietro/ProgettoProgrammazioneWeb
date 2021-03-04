<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/tipologia.php';

$database = new Database();
$db = $database->getConnection();
  
$tipologia = new Tipologia($db);

$stmt = $tipologia->read();
$num = $stmt->num_rows;

if($num > 0) {
  
    $tipologia_arr = array();
    $tipologia_arr["records"] = array();

    while ($row = $stmt->fetch_assoc()) {
        extract($row);
  
        $tipologia_item = array(
            "id" => $ID_Tipologia,
            "tipologia" => $Tipo
        );
  
        array_push($tipologia_arr["records"], $tipologia_item);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    // visualizza i dati in formato json
    echo json_encode($tipologia_arr);
} else {
    // set response code - 404 Not found
    http_response_code(404);
  
    echo json_encode(array("message" => "Nessun tipologia trovata."));
}