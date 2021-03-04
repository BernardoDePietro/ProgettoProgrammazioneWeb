<?php

// headers richiesti
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//include database e file oggetti
include_once '../config/core.php';
include_once '../shared/utilities.php';
include_once '../config/database.php';
include_once '../objects/dipartimento.php';

$utilities = new Utilities();

//istanzia il db e l'oggetto dipartimento
$database = new Database();
$db = $database->getConnection();

$dipartimento = new Dipartimento($db);

$stmt = $dipartimento->readPaging($from_record_num, $records_per_page);
$num = $stmt->num_rows;

//verifica se ci sono record
if($num > 0) {
    $dipartimento_arr = array();
    $dipartimento_arr['records'] = array();
    $dipartimento_arr['paging'] = array();

    while($row = $stmt->fetch_assoc()) {
        extract($row);

        $dipartimento_item = array(
            "id" => $ID_Dip,
            "nome" => $Nome,
            "via" => $Via,
            "cap" => $Cap,
            "civico" => $Civico
        );

        array_push($dipartimento_arr['records'], $dipartimento_item);
    }

    //paging
    $total_rows = $dipartimento->count();
    $page_url = "{$home_url}dipartimento/read_paging.php?";
    $paging = $utilities->getPaging($page, $total_rows, $records_per_page, $page_url);
    $dipartimento_arr['paging'] = $paging;

    http_response_code(200); //OK
    echo json_encode($dipartimento_arr);

} else {
    http_response_code(404); //Not Found
    echo json_encode(array("message" => "Nessun dipartimento trovato."));
}

?>