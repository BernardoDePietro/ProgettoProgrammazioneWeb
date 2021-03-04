<?php

//headers richiesti
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Hearder, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/edificio.php';

//crea l'istanza del database
$database = new Database();
$db = $database->getConnection();

//crea l'istanza dell'edificio
$edificio = new Edificio($db);

//prende i dati inviati con il metodo posto
$data = json_decode(file_get_contents("php://input"));

//controlla se i dati sono vuoti
if(!empty($data->nome) && !empty($data->id_dipartimento)) {
    //set delle proprietà del piano
    $edificio->nome = $data->nome;
    $edificio->id_dipartimento = $data->id_dipartimento;

    //funzione che crea il piano
    if($edificio->create()) {
        
        http_response_code(201); //set response code - 201 created

        echo json_encode(array("message" => "L'edificio è stato aggiunto correttamente."));
    }

    else {

        http_response_code(503); //set response code - 503 service unavailable

        echo json_encode(array("message" => "Impossibile aggiungere l'edificio."));
    }
} else {

    http_response_code(400); //response code - 400 bad request 

    echo json_encode(array("message" => "Impossibile aggiungere l'edificio. Dati incompleti"));
}

?>