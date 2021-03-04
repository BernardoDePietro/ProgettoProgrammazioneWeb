<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/locale.php';

$database = new Database();
$db = $database->getConnection();
  
$locale = new Locale($db);

$stmt = $locale->read();
$num = $stmt->num_rows;

if($num > 0) {
  
    $locale_arr = array();
    $locale_arr["records"] = array();

    while ($row = $stmt->fetch_assoc()) {
        extract($row);
  
        $locale_item = array(
            "id" => $ID_Locale,
            "nome" => $Nome,
            "tipologia" => $Tipo,
            "piano" => $NomePiano,
            "edificio" => $NomeEdificio,
            "dipartimento" => $NomeDipartimento,
        );
  
        array_push($locale_arr["records"], $locale_item);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    // visualizza i dati in formato json
    echo json_encode($locale_arr);
} else {
    // set response code - 404 Not found
    http_response_code(404);
  
    echo json_encode(array("message" => "Nessun locale trovato."));
}