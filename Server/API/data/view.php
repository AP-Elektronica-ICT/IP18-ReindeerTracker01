<?php


include $_SERVER["DOCUMENT_ROOT"]."/Reindeertracker/API/db_login.php";


$query = "select * from data";
$result = mysql_query($query);

echo 
"<table><thead>
<th>Serial Number</th>
<th>Latitude</th>
<th>Longitude</th>
<th>Status</th>
<th>Battery</th>
<th>Time</th></thead><tbody>";
while($row = mysql_fetch_assoc($result))
{
    $serialnumber = $row['serialnumber'];
    $lat = $row['latitude'];
    $long = $row['longitude'];
    $status = $row['status'];
    $battery = $row['battery'];
    $time = $row['time'];
    echo "<tr><td>$serialnumber</td><td>$lat</td><td>$long</td><td>$status</td><td>$battery</td><td>$time</td></tr>";
}
echo "</tbody></table>";


?>