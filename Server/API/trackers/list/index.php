<?php
    include $_SERVER["DOCUMENT_ROOT"]."/Reindeertracker/API/db_login.php";
    $userId = $_GET['userId'];
    header('Access-Control-Allow-Origin: *'); 
    $query = "select * from devices where userId = '$userId'";
    $result = mysql_query($query);
    $json = array();
    while($row = mysql_fetch_assoc($result))
    {
        $name = "";
        $serialnumber = $row['serialnumber'];
        $assigned = "";
        $query2 = "select * from reindeer where serialnumber = '$serialnumber';";
        $result2 = mysql_query($query2);
        if(mysql_num_rows($result2) > 0)
        {
            $assigned = "true";
        }
        else
        {
            $assigned = "false";
        }
        while($row2 = mysql_fetch_assoc($result2))
        {
            $name = $row2['name'];
        }
        $array = array("serialnumber"=>$serialnumber,"assigned"=>$assigned,"name"=>$name);
        array_push($json, $array);
    }
    echo json_encode($json);

?>