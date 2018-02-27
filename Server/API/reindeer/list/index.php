<?php
    include $_SERVER["DOCUMENT_ROOT"]."/Reindeertracker/API/db_login.php";
    $userId = $_GET['userId'];
    header('Access-Control-Allow-Origin: *'); 
    $query = "select * from reindeer where userId = '$userId'";
    $result = mysql_query($query);
    $json = array();
    while($row = mysql_fetch_assoc($result))
    {
        $id = $row['id'];
        $serialnumber = $row['serialnumber'];
        $battery = "";
        $status = "";
        $time = "";
        $lat = "";
        $long = "";
        $query2 = "select * from data where serialnumber = '$serialnumber' ORDER by time DESC LIMIT 1";
       
        $result2 = mysql_query($query2);
        while($row2 = mysql_fetch_array($result2))
        {
            $battery  = $row2['battery'];
            $status = $row2['status'];
            $time = $row2['time'];
            $lat = $row2['latitude'];
            $long = $row2['longitude'];
        }
        $array = array("reindeerId"=>$id,"serialnumber"=>$serialnumber, "battery"=>$battery,"status"=>$status,"time"=>$time,"lat"=>$lat,"long"=>$long);
        array_push($json, $array);
    }
    echo json_encode($json);

?>