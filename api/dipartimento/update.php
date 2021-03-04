<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/dipartimento.php';

//get database connection
$database = new Database();
$db = $database->getConnection();

$dipartimento = new Dipartimento($db);

//get id of dipartimento to be edited
$data = json_decode(file_get_contents("php://input"));

$dipartimento->id = $data->id;
$dipartimento->nome = $data->nome;
$dipartimento->via = $data->via;
$dipartimento->cap = $data->cap;
$dipartimento->civico = $data->civico;

//update the dipartimento
if($dipartimento->update()) {
    //set response code - 200 ok
    http_response_code(200);

    echo json_encode(array("message" => "Dipartimento aggiornato."));
} else {
    //set response code - 503 service unavailable
    http_response_code(503);

    echo json_encode(array("message" => "Impossibile aggiornare dipartimento."));
}

?>