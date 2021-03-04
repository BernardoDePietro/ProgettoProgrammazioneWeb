<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
  
include_once '../config/database.php';
include_once '../objects/edificio.php';

//get database connection
$database = new Database();
$db = $database->getConnection();

$edificio = new Edificio($db);

//set ID property of record to read
$edificio->id = isset($_GET['id']) ? $_GET['id'] : die();

$edificio->readOne();

if($edificio->nome != null) {
    $edificio_arr = array(
        "id" => $edificio->id,
        "nome" => $edificio->nome,
        "dipartimento" => $edificio->nome_dipartimento,
        "id_dipartimento" => $edificio->id_dipartimento
    );

    //set response code - 200 OK
    http_response_code(200);

    //make it json format
    echo json_encode($edificio_arr);
} else {
    //set response code - 404 Not Found
    http_response_code(404);

    echo json_encode(array("message" => "Dipartimento does not exist."));
}

?>