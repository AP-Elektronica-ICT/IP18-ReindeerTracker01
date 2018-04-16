<?php

include $_SERVER["DOCUMENT_ROOT"]."/Reindeertracker/API/db_login.php";
header('Access-Control-Allow-Origin: *');

if(isset($_POST))
{
    $inputJSON = file_get_contents('php://input');
    $test = json_decode($inputJSON, true);
    $data = json_decode($test, true);
    
    $reindeerId = $data['reindeerId'];
    $userId = $data['userId'];
    $query = "delete from reindeer where id = $reindeerId";
  
    if(!mysql_query($query,$con))
    {
        die('Error : ' . mysql_error());
    }
    else
    {
        echo "true";
    }


    
    

}
?>