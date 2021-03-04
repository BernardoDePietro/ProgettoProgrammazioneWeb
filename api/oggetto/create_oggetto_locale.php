<?php

//equired headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Hearder, Authorization, X-Requested-With");

//get database connection
include_once '../config/database.php';
include_once '../objects/oggetto.php';

$database = new Database();
$db = $database->getConnection();

$oggetto = new Oggetto($db);

//get posted data
$data = json_decode(file_get_contents("php://input"));

$id_locale = $data->id_locale;
$id_oggetto = $data->id_oggetto;

if($oggetto->createOggettoLocale($id_oggetto, $id_locale)) {
    //set response code - 201 created
    http_response_code(201);

    //tell the user
    echo json_encode(array("message" => "Oggetto aggiunto."));
} else {
    //set response code - 503 service unavailable
    http_response_code(503);

    //tell the user
    echo json_encode(array("message" => "Impossibile aggiungere oggetto."));
}

?>