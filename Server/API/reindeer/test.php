<?php


header('Access-Control-Allow-Origin: *'); 
if(isset($_POST))
{
    $inputJSON = file_get_contents('php://input');
    $data = json_decode($inputJSON, true);
    echo $inputJSON;

}
?>