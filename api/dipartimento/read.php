<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/dipartimento.php';
  
$database = new Database();
$db = $database->getConnection();
  
$dipartimento = new Dipartimento($db);

$stmt = $dipartimento->read();
$num = $stmt->num_rows;

if($num > 0) {
  
    $dipartimento_arr = array();
    $dipartimento_arr["records"] = array();

    while ($row = $stmt->fetch_assoc()) {
        extract($row);
  
        $dipartimento_item = array(
            "id" => $ID_Dip,
            "nome" => $Nome,
            "via" => $Via,
            "cap" => $Cap,
            "civico" => $Civico,
        );
  
        array_push($dipartimento_arr["records"], $dipartimento_item);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    echo json_encode($dipartimento_arr);
} else {
    // set response code - 404 Not found
    http_response_code(404);
  
    echo json_encode(array("message" => "Nessun dipartimento trovato."));
}