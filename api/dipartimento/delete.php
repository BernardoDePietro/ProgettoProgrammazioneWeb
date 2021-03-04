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

if($dipartimento->delete()) {
    http_response_code(200);

    echo json_encode(array("messaggio" => "Dipartimento eliminato."));
} else {
    http_response_code(503);

    echo json_encode(array("messaggio" => "Impossibile eliminare questo dipartimento."));
}

?>