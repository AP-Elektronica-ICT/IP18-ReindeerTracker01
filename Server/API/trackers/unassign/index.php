<?php

include $_SERVER["DOCUMENT_ROOT"]."/Reindeertracker/API/db_login.php";
header('Access-Control-Allow-Origin: *');
if(isset($_POST))
{
    $inputJSON = file_get_contents('php://input');
    $test = json_decode($inputJSON, true);
    $data = json_decode($test, true);
    
    $serialnumber = $data['serialnumber'];
    
    $sql = "update  reindeer set serialnumber = '' where serialnumber ='$serialnumber';";
    
  
    if(!mysql_query($sql,$con))
    {
        echo "false";
    }
    else
    {
        echo "true";
    }
    

}
?>