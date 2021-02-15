<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../Register/connect.php';

if (!$conn->connect_error) {

    $username = trim(file_get_contents("php://input"));
    $decoded = json_decode($username, true);
     

    if (!$stmt = $conn->prepare("SELECT userlogin_id FROM UserBasic WHERE username = ?")) {
        echo "Prepare failed: (". $conn->errno. ")". $conn->error;
    } else {
    
      $stmt->bind_param('s',$decoded['username']);
      $stmt->execute();
      $result = $stmt->get_result();
      echo json_encode(($result->fetch_assoc()));

      $stmt->close();
      $conn->close();

    }
   


} else {echo "Connecting Error!";}