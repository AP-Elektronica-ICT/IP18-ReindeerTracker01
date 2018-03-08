<?php

include $_SERVER["DOCUMENT_ROOT"]."/Reindeertracker/API/db_login.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

if(isset($_POST))
{
    $inputJSON = file_get_contents('php://input');
    $test = json_decode($inputJSON, true);
    $data = json_decode($test, true);

    
    $serialnumber = $data['serialnumber'];
    $userId = $data['userId'];

    $sql1 = "update  devices set userId = 0 where serialnumber =$serialnumber;";
    $sql2 = "update  reindeer set serialnumber = '' where serialnumber ='$serialnumber';";
    if(!mysql_query($sql1,$con) && !mysql_query($sql2,$con))
    {
        die('Error : ' . mysql_error());
    }
    else
    {
        echo "true";
    }


    
    

}
?>