<?php
    include $_SERVER["DOCUMENT_ROOT"]."/Reindeertracker/API/db_login.php";
    $reindeerId = $_GET['reindeerId'];
    $limit = $_GET['limit'];
    header('Access-Control-Allow-Origin: *'); 
    $hash = $_GET['hash'];
    $userId = 0;
    $query = "select id from users where hash = '$hash';";
    $result = mysql_query($query);
    while($row = mysql_fetch_assoc($result))
    {
        $userId = $row['id'];
    }

    $query = "select * from reindeer where id = '$reindeerId'";
    $result = mysql_query($query);
    $json = array();
    while($row = mysql_fetch_assoc($result))
    {
        $id = $row['id'];
        $serialnumber  = $row['serialnumber'];
        $name = $row['name'];
        $picture = $row['picture'];
        $birthDate = $row['birthDate'];
        $status = "";
        $time = "";
        $battery = "";
       

        $query = "select * from data where serialnumber = '$serialnumber' order by time ASC LIMIT 1;";
       
        $result = mysql_query($query);
        while($row = mysql_fetch_assoc($result))
        {
            
            $firstLocationLat = $row['latitude'];
            $firstLocationLong = $row['longitude'];
            $time = $row['time'];
        }

        $query = "select * from data where serialnumber = '$serialnumber' order by time DESC LIMIT 1;";
        $result = mysql_query($query);
        while($row = mysql_fetch_assoc($result))
        {
            $status = $row['status'];
            $battery = $row['battery'];
            //$time = $row['time'];
            $previousLocationLat = $row['latitude'];
            $previousLocationLong = $row['longitude'];
        }

        $data = array();
        $query = "select * from data where serialnumber = '$serialnumber' order by time DESC LIMIT $limit";
        $result = mysql_query($query);
        while($row = mysql_fetch_assoc($result))
        {
            $lat = $row['latitude'];
            $long = $row['longitude'];
            $tijd = $row['time'];
           
            $array = array("lat"=>$lat,"long"=>$long,"time"=>$tijd);
            array_push($data,$array);
        } 
        
        
        $array = array("reindeerId"=>$id,"serialnumber"=>$serialnumber,"name"=>$name,"birthDate"=>$birthDate,"firstLocationLat"=>$firstLocationLat, "firstLocationLong"=>$firstLocationLong, "status"=>$status, "battery"=>$battery,"time"=>$time, "locations"=>$data);
        array_push($json, $array);
    }
    echo json_encode($json);


    
?>