<?php
    include $_SERVER["DOCUMENT_ROOT"]."/Reindeertracker/API/db_login.php";
    $serialnumber = $_GET['serialnumber'];
    header('Access-Control-Allow-Origin: *'); 
    $query = "select * from devices where serialnumber = '$serialnumber'";
    
    $result = mysql_query($query);
    $json = array();
    if(mysql_num_rows($result) > 0)
    {
        while($row = mysql_fetch_assoc($result))
        {
            if($row['userId'] != "")
            {
                $array = array("exist"=>"true","added"=>"true");    
            }
            else
            {
                $array = array("exist"=>"true","added"=>"false");    
            }
        }
    }
    else
    {
        $array = array("exist"=>"false","added"=>"false");    
    }
    array_push($json, $array);
    echo json_encode($json);

?>