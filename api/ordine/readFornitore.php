<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/ordine.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
  
// initialize object
$ordine = new Ordine($db);

$stmt = $ordine->readFornitore();
$num = $stmt->num_rows;

if($num > 0) {
  
    $ordine_arr = array();
    $ordine_arr["records"] = array();

    while ($row = $stmt->fetch_assoc()) {
        extract($row);
  
        $ordine_item = array(
            "id" => $ID_Ordine,
            "oggetto" => $Oggetto,
            "modello" => $Modello,
            "dipartimento" => $Nome
        );
  
        array_push($ordine_arr["records"], $ordine_item);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    echo json_encode($ordine_arr);
} else {
    // set response code - 404 Not found
    http_response_code(404);
  
    echo json_encode(array("message" => "Nessun ordine trovato."));
}