<?php

include $_SERVER["DOCUMENT_ROOT"]."/Reindeertracker/API/db_login.php";
header('Access-Control-Allow-Origin: *');
$json = array();
if(isset($_POST))
{
    $inputJSON = file_get_contents('php://input');
    $test = json_decode($inputJSON, true);
    $data = json_decode($test, true);
    
    $email = $data['email'];
    $password = $data['password'];

    
    
    $query = "select hash from users where email = '$email' AND password = '$password'";

    $result = mysql_query($query);

    if(mysql_num_rows($result) > 0)
    {
         while($row = mysql_fetch_assoc($result))
         {
             
             $array = array("status"=>$row['hash']);
             array_push($json, $array);
         }
    }
    else
    {
        
        $array = array("status"=>'false');
        array_push($json, $array);
    }

   
}
echo json_encode($json);
?>