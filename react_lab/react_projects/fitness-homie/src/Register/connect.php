<?php
// database connection

$servername = 'sql300.main-hosting.eu';
$username='u329390654_boskyle';
$password='Quickscope22!';
$db='u329390654_fitnesshomie';

$conn = new mysqli($servername,$username,$password,$db);
if($conn->connect_error) {
    die('Connection failed: '. $conn->connect_error);
}

?>