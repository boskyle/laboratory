<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../Register/connect.php';

if (!$conn->connect_error) {

    $user_id = trim(file_get_contents("php://input"));

    if (!$stmt = $conn->prepare("SELECT username FROM UserBasic WHERE userlogin_id = ?")) {
        echo "Prepare failed: (". $conn->errno. ")". $conn->error;
    } else {
    
      $stmt->bind_param('i',$user_id);
      $stmt->execute();
      $result = $stmt->get_result();
      echo json_encode(($result->fetch_assoc()));

      $stmt->close();
      $conn->close();

    }
   


} else {echo "Connecting Error!";}