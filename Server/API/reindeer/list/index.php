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
        $name = $row['name'];
        $battery = "";
        $status = "";
        $time = "";
        $lat = "";
        $long = "";
        $query2 = "select * from data where serialnumber = '$serialnumber' ORDER by time DESC LIMIT 1";
       
        $result2 = mysql_query($query2);
        if(mysql_num_rows($result2) > 0)
        {
            while($row2 = mysql_fetch_array($result2))
            {
                $battery  = $row2['battery'];
                $status = $row2['status'];
                $lat = $row2['latitude'];
                $long = $row2['longitude'];
            }
        }
        else
        {
            $status = "true";
        }
        $array = array("reindeerId"=>$id,"name"=>$name,"serialnumber"=>$serialnumber, "battery"=>$battery,"status"=>$status,"lat"=>$lat,"long"=>$long);
        array_push($json, $array);
    }
    echo json_encode($json);

?>