<?php
ini_set('display_errors',1);
error_reporting(E_ALL);

$username   = "boskyle";
$servername = "localhost";
$password   = "hotsauce42";
$dbname     = "test";

$conn = new mysqli($servername, $username, $password,$dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
// echo 'Connection Succesful';
echo '<br>';

$sql = 'SELECT * FROM registration';
$result=$conn->query($sql);

if ($result->num_rows > 0) {

  while ($row = $result->fetch_assoc()) {
    echo 'email: '. $row['email'].'<br>'.'password: '.$row['password'].'<br>';
  }

} else { echo '0 results';}

$conn->close();


?>