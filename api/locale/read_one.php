<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
  
include_once '../config/database.php';
include_once '../objects/locale.php';

//get database connection
$database = new Database();
$db = $database->getConnection();

$locale = new Locale($db);

//set ID property of record to read
$locale->id = isset($_GET['id']) ? $_GET['id'] : die();

$locale->readOne();

if($locale->nome != null) {
    $locale_arr = array(
        "id" => $locale->id,
        "nome" => $locale->nome,
        "id_tipologia" => $locale->id_tipologia,
        "tipologia" => $locale->tipo, 
        "dipartimento" => $locale->nome_dipartimento,
        "id_dipartimento" => $locale->id_dipartimento,
        "edificio" => $locale->nome_edificio,
        "id_edificio" => $locale->id_edificio,
        "piano" => $locale->nome_piano,
        "id_piano" => $locale->id_piano
    );

    //set response code - 200 OK
    http_response_code(200);

    //make it json format
    echo json_encode($locale_arr);
} else {
    //set response code - 404 Not Found
    http_response_code(404);

    echo json_encode(array("message" => "Il piano non esiste."));
}

?>