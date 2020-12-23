<?php
// database connection

$servername = 'localhost';
$username='boskyle';
$password='hotsauce42';
$db='fitnesshomie_local';

$conn = new mysqli($servername,$username,$password,$db);
if($conn->connect_error) {
    die('Connection failed: '. $conn->connect_error);
}
   



?>