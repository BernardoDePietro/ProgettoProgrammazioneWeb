<?php

//equired headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Hearder, Authorization, X-Requested-With");

//get database connection
include_once '../config/database.php';
include_once '../objects/dipartimento.php';

$database = new Database();
$db = $database->getConnection();

$dipartimento = new Dipartimento($db);

//get posted data
$data = json_decode(file_get_contents("php://input"));

//make sure data is not empty
if(!empty($data->nome) && !empty($data->via) && !empty($data->cap) && !empty($data->civico)) {
    //set dipartimento property values
    $dipartimento->nome = $data->nome;
    $dipartimento->via = $data->via;
    $dipartimento->cap = $data->cap;
    $dipartimento->civico = $data->civico;

    //create the dipartimento
    if($dipartimento->create()) {
        //set response code - 201 created
        http_response_code(201);

        //tell the user
        echo json_encode(array("message" => "Dipartimento create."));
    }

    //if unable to create the dipartimento, tell the user
    else {
        //set response code - 503 service unavailable
        http_response_code(503);

        //tell the user
        echo json_encode(array("message" => "Impossibile creare il dipartimento"));
    }
} else {
    //set response code - 400 bad request
    http_response_code(400);

    //tell the user
    echo json_encode(array("message" => "Dati incompleti."));
}

?>