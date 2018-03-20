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
        $id = $row['id'];
        $serialnumber  = $row['serialnumber'];
        $name = $row['name'];
        $picture = $row['picture'];
        $birthDate = $row['birthDate'];
        $status = "";
        $time = "";
        $battery = "";
        $averageDistance = "";
        $previousLocationLat = "";
        $previousLocationLong = "";

        $query = "select * from data where serialnumber = '$serialnumber' order by time DESC LIMIT 1;";
        $result = mysql_query($query);
        while($row = mysql_fetch_assoc($result))
        {
            $status = $row['status'];
            $battery = $row['battery'];
            $time = $row['time'];
            $previousLocationLat = $row['lat'];
            $previousLocationLong = $row['long'];
        }

        $list = array();
        $data = array();
        $query = "select * from data where serialnumber = '$serialnumber' order by time DESC LIMIT $limit";
        $result = mysql_query($query);
        while($row = mysql_fetch_assoc($result))
        {
            $lat = $row['latitude'];
            $long = $row['longitude'];
            $tijd = $row['time'];
            if($lat != $previousLocationLat && $long != $previousLocationLong)
            {
                array_push($list, intval(distance($previousLocationLat, $previousLocationLong, $lat, $long, "K")));
            }
            $previousLocationLat = $lat;
            $previousLocationLong = $long;
            $array = array("lat"=>$lat,"long"=>$long,"time"=>$tijd);
            array_push($data,$array);
        }

        $pictures = array();
        $path =  $_SERVER["DOCUMENT_ROOT"]."/Reindeertracker/API/reindeer/img/$id/";
        $files = scandir($path);
        foreach($files as $file)
        {
            if($file != "." && $file != "..")
            {
            $array = array("pictureId"=>$file,"url"=>"https://".$_SERVER['SERVER_NAME']."/Reindeertracker/API/reindeer/img/$id/".$file);
            array_push($pictures,$array);
            }
        }
        
        $array = array("reindeerId"=>$id,"serialnumber"=>$serialnumber,"name"=>$name,"birthDate"=>$birthDate, "status"=>$status, "battery"=>$battery,"time"=>$time, "averageDistance"=>array_sum($list)/count($list),"locations"=>$data,"pictures"=>$pictures);
        array_push($json, $array);
    }
    echo json_encode($json);


    function distance($lat1, $lon1, $lat2, $lon2, $unit) {
        $theta = $lon1 - $lon2;
        $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
        $dist = acos($dist);
        $dist = rad2deg($dist);
        $miles = $dist * 60 * 1.1515;
        $unit = strtoupper($unit);
      
        if ($unit == "K") {
            return ($miles * 1.609344);
        } else if ($unit == "N") {
            return ($miles * 0.8684);
        } else {
            return $miles;
        }
      }

?>