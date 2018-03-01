<?php

include $_SERVER["DOCUMENT_ROOT"]."/Reindeertracker/API/db_login.php";

if(isset($_POST))
{
    $inputJSON = file_get_contents('php://input');
    $data = json_decode($inputJSON, true);
    $serialnumber = $data['serialnumber'];
    $lat = $data['lat'];
    $long = $data['long'];
    $status = $data['status'];
    $battery = $data['battery'];

    $sql = "INSERT INTO data (serialnumber,latitude, longitude,status,battery)
    VALUES($serialnumber,'$lat','$long','$status',$battery)";
    echo $sql;
  
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