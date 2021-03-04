<?php

//headers richiesti
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Hearder, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/ordine.php';

//crea l'istanza del database
$database = new Database();
$db = $database->getConnection();

//crea l'istanza dell'edificio
$ordine = new Ordine($db);

//prende i dati inviati con il metodo posto
$data = json_decode(file_get_contents("php://input"));

//controlla se i dati sono vuoti
if(!empty($data->oggetto) && !empty($data->modello)) {
    //set delle proprietà del piano
    $ordine->nome = $data->oggetto;
    $ordine->modello = $data->modello;

    $quantita = intval($data->quantita);

    $stato = true;

    for($i = 0; $i < $quantita; $i++) {
        //funzione che crea il piano
        if($ordine->create()) {

            if($ordine->getLastOrdine()) {
                if($ordine->createOggettoOrdine()) {
                    $stato = true;
                } else {
                    $stato = false;
                }
            } else {
                $stato = false;
            }
        } else {
            $stato = false;
        }
    }

    if($stato) {
        http_response_code(201); //response code - 201 created 

        echo json_encode(array("message" => "Ordine creato correttamente."));
    } else {
        http_response_code(503); //response code 

        echo json_encode(array("message" => "Impossibile aggiungere l'ordine."));
    }
} else {

    http_response_code(400); //response code - 400 bad request 

    echo json_encode(array("message" => "Impossibile aggiungere l'ordine. Dati incompleti"));
}

?>