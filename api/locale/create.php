<?php

//headers richiesti
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Hearder, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/locale.php';

//crea l'istanza del database
$database = new Database();
$db = $database->getConnection();

//crea l'istanza del piano
$locale = new Locale($db);

//prende i dati inviati con il metodo posto
$data = json_decode(file_get_contents("php://input"));

//controlla se i dati sono vuoti
if(!empty($data->nome) && !empty($data->id_piano) && !empty($data->id_tipologia)) {
    //set delle proprietà del piano
    $locale->nome = $data->nome;
    $locale->id_piano = $data->id_piano;
    $locale->id_tipologia = $data->id_tipologia;

    //funzione che crea il piano
    if($locale->create()) {
        
        http_response_code(201); //set response code - 201 created

        echo json_encode(array("message" => "Il locale è stato aggiunto correttamente."));
    }

    else {

        http_response_code(503); //set response code - 503 service unavailable

        echo json_encode(array("message" => "Impossibile aggiungere il locale."));
    }
} else {

    http_response_code(400); //response code - 400 bad request 

    echo json_encode(array("message" => "Impossibile aggiungere il locale. Dati incompleti"));
}

?>