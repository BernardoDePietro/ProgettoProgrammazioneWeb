<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
  
include_once '../config/database.php';
include_once '../objects/piano.php';

//get database connection
$database = new Database();
$db = $database->getConnection();

$piano = new Piano($db);

//set ID property of record to read
$piano->id = isset($_GET['id']) ? $_GET['id'] : die();

$piano->readOne();

if($piano->nome != null) {
    $piano_arr = array(
        "id" => $piano->id,
        "nome" => $piano->nome,
        "dipartimento" => $piano->nome_dipartimento,
        "id_dipartimento" => $piano->id_dipartimento,
        "edificio" => $piano->nome_edificio,
        "id_edificio" => $piano->id_edificio
    );

    //set response code - 200 OK
    http_response_code(200);

    //make it json format
    echo json_encode($piano_arr);
} else {
    //set response code - 404 Not Found
    http_response_code(404);

    echo json_encode(array("message" => "Il piano non esiste."));
}

?>