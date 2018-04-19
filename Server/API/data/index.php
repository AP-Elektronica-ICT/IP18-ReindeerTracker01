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
    $reindeerId = "";
    $sql = "select id from reindeer where serialnumber='$serialnumber';";
    $result = mysql_query($sql);
    while($row = mysql_fetch_assoc($result))
    {
        $reindeerId = $row['id'];
    }
    if($reindeerId == null)
    {
		$reindeerId = 0;    
    }

    $sql = "INSERT INTO data (serialnumber,reindeerId,latitude, longitude,status,battery)
    VALUES($serialnumber,$reindeerId,'$lat','$long','$status',$battery)";
    
    
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