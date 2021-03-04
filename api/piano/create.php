<?php

//headers richiesti
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Hearder, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/piano.php';

//crea l'istanza del database
$database = new Database();
$db = $database->getConnection();

//crea l'istanza del piano
$piano = new Piano($db);

//prende i dati inviati con il metodo posto
$data = json_decode(file_get_contents("php://input"));

//controlla se i dati sono vuoti
if(!empty($data->nome) && !empty($data->id_edificio)) {
    //set delle proprietà del piano
    $piano->nome = $data->nome;
    $piano->id_edificio = $data->id_edificio;

    //funzione che crea il piano
    if($piano->create()) {
        
        http_response_code(201); //set response code - 201 created

        echo json_encode(array("message" => "Il piano è stato aggiunto correttamente."));
    }

    else {

        http_response_code(503); //set response code - 503 service unavailable

        echo json_encode(array("message" => "Impossibile aggiungere il piano."));
    }
} else {

    http_response_code(400); //response code - 400 bad request 

    echo json_encode(array("message" => "Impossibile aggiungere il piano. Dati incompleti"));
}

?>