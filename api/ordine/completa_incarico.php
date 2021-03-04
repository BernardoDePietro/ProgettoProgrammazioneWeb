<?php
// headers richiesti
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include il db e l'oggetto piano
include_once '../config/database.php';
include_once '../objects/ordine.php';

//connessione al db
$database = new Database();
$db = $database->getConnection();

$ordine = new Ordine($db);

$data = json_decode(file_get_contents("php://input"));

$nome_oggetto = $ordine->getDatiOggettoOrdine($data->id);

if($ordine->aggiungiOggettoMagazzino($nome_oggetto)) {
    $id_magazzino = $ordine->getLastMagazzino();
    if($ordine->updateOggettoOrdine($id_magazzino, $data->id)) {
        if($ordine->completaOrdine($data->id)) {
            //set response code - 200 ok
            http_response_code(200);

            echo json_encode(array("message" => "Incarico completato."));
        } else {
            //set response code - 503 service unavailable
            http_response_code(503);

            echo json_encode(array("message" => "Impossibile completare ordine."));
        }
    } else {
        //set response code - 503 service unavailable
        http_response_code(503);

        echo json_encode(array("message" => "Impossibile aggiornare ordine."));
    }
} else {
    //set response code - 503 service unavailable
    http_response_code(503);

    echo json_encode(array("message" => "Impossibile aggiungere al magazzino."));
}

?>