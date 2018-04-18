<?php

include $_SERVER["DOCUMENT_ROOT"]."/Reindeertracker/API/db_login.php";
header('Access-Control-Allow-Origin: *');

if(isset($_POST))
{
    $inputJSON = file_get_contents('php://input');
    $test = json_decode($inputJSON, true);
    $data = json_decode($test, true);
    
    $name = $data['name'];
    $gender = $data['gender'];
    $birthDate = $data['birthDate'];
    $hash = $data['hash'];
    
    $userId = 0;
    $query = "select userId from users where hash = '$hash';";
    $result = mysql_query($query);
    while($row = mysql_fetch_assoc($result))
    {
        $userId = $row['userId'];
    }
    
    
    

    $query = "insert into reindeer (name, gender, birthDate, userId) values ('$name','$gender','$birthDate',$userId);";
   // echo $query;
    if(!mysql_query($query,$con))
    {
        die('Error : ' . mysql_error());
    }
    else
    {
        echo "true";
    }


    
    

}
?>