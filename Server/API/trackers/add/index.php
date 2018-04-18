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
    $userId = 0;
    $query = "select userId from users where hash = '$hash';";
    $result = mysql_query($query);
    while($row = mysql_fetch_assoc($result))
    {
        $userId = $row['userId'];
    }

    $sql = "update  devices set userId = $userId where serialnumber =$serialnumber;";
    
    if(!mysql_query($sql,$con))
    {
        die('Error : ' . mysql_error());
    }
    else
    {
        echo "true";
    }


    
    

}
?>