<?php
    include $_SERVER["DOCUMENT_ROOT"]."/Reindeertracker/API/db_login.php";
    $reindeerId = $_GET['reindeerId'];
    $limit = $_GET['limit'];
    header('Access-Control-Allow-Origin: *'); 
    $query = "select * from reindeer where id = '$reindeerId'";
    $result = mysql_query($query);
    $json = array();
    while($row = mysql_fetch_assoc($result))
    {
        $serialnumber  = $row['serialnumber'];
        $name = $row['name'];
        $age = $row['age'];
        $status = "";
        $time = "";
        $battery = "";
        $lat = "";
        $long = "";

        $query = "select * from data where serialnumber = '$serialnumber' order by time DESC LIMIT 1;";
        $result = mysql_query($query);
        while($row = mysql_fetch_assoc($result))
        {
            $status = $row['status'];
            $battery = $row['battery'];
            $time = $row['time'];
            $lat = $row['latitude'];
            $long = $row['longitude'];
        }
        
        $data = array();
        $query = "select * from data where serialnumber = '$serialnumber' LIMIT $limit";
        $result = mysql_query($query);
        while($row = mysql_fetch_assoc($result))
        {
            $lat = $row['latitude'];
            $long = $row['longitude'];
            $array = array("lat"=>$lat,"long"=>$long);
            array_push($data,$array);
        }
        $array = array("serialnumber"=>$serialnumber,"name"=>$name,"age"=>$age, "status"=>$status, "battery"=>$battery,"time"=>$time,"lat"=>$lat,"long"=>$long,"locations"=>$data );
        array_push($json, $array);
    }
    echo json_encode($json);

?>