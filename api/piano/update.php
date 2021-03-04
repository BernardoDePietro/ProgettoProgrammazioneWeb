<?php
// headers richiesti
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include il db e l'oggetto piano
include_once '../config/database.php';
include_once '../objects/piano.php';

//connessione al db
$database = new Database();
$db = $database->getConnection();

$piano = new Piano($db);

$data = json_decode(file_get_contents("php://input"));

$piano->id = $data->id;
$piano->nome = $data->nome;
$piano->id_edificio = $data->id_edificio;

if($piano->update()) {
    //set response code - 200 ok
    http_response_code(200);

    echo json_encode(array("message" => "Piano aggiornato."));
} else {
    //set response code - 503 service unavailable
    http_response_code(503);

    echo json_encode(array("message" => "Impossibile aggiornare piano."));
}

?>