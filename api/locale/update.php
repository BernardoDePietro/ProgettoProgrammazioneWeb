<?php
// headers richiesti
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include il db e l'oggetto piano
include_once '../config/database.php';
include_once '../objects/locale.php';

//connessione al db
$database = new Database();
$db = $database->getConnection();

$locale = new Locale($db);

$data = json_decode(file_get_contents("php://input"));

$locale->id = $data->id;
$locale->nome = $data->nome;
$locale->id_piano = $data->id_piano;
$locale->id_tipologia = $data->id_tipologia;

if($locale->update()) {
    //set response code - 200 ok
    http_response_code(200);

    echo json_encode(array("message" => "Locale aggiornato."));
} else {
    //set response code - 503 service unavailable
    http_response_code(503);

    echo json_encode(array("message" => "Impossibile aggiornare locale."));
}

?>