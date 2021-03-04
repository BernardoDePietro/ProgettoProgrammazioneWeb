<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
  
// include database and object files
include_once '../config/database.php';
include_once '../objects/dipartimento.php';

//get database connection
$database = new Database();
$db = $database->getConnection();

//prepare dipartimento object
$dipartimento = new Dipartimento($db);

//set ID property of record to read
$dipartimento->id = isset($_GET['id']) ? $_GET['id'] : die();

$dipartimento->readOne();

if($dipartimento->nome != null) {
    $dipartimento_arr = array(
        "id" => $dipartimento->id,
        "nome" => $dipartimento->nome,
        "via" => $dipartimento->via,
        "cap" => $dipartimento->cap,
        "civico" => $dipartimento->civico
    );

    //set response code - 200 OK
    http_response_code(200);

    //make it json format
    echo json_encode($dipartimento_arr);
} else {
    //set response code - 404 Not Found
    http_response_code(404);

    echo json_encode(array("message" => "Il dipartimento non esiste."));
}

?>