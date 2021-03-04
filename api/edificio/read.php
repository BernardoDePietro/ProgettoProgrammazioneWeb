<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/edificio.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
  
// initialize object
$edificio = new Edificio($db);

$stmt = $edificio->read();
$num = $stmt->num_rows;

if($num > 0) {
  
    $edificio_arr = array();
    $edificio_arr["records"] = array();

    while ($row = $stmt->fetch_assoc()) {
        extract($row);
  
        $edificio_item = array(
            "id" => $ID_Edificio,
            "nome" => $Nome,
            "dipartimento" => $NomeDipartimento,
        );
  
        array_push($edificio_arr["records"], $edificio_item);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    // show products data in json format
    echo json_encode($edificio_arr);
} else {
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user no products found
    echo json_encode(array("message" => "Nessun edificio trovato."));
}