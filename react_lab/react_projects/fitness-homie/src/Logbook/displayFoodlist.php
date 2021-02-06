<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../Register/connect.php';


// some sort of inner join to get username and display related foodlist + details



if (!$conn-> connect_error) {


  
    if (!$stmt = $conn->prepare("SELECT foodname,calories,carbohydrates,protein,fat FROM UserFoodsList WHERE username = ? ORDER by foodname ASC")) {
        echo "Prepare failed: (". $conn->errno. ")". $conn->error;
    } else {
    
      $stmt->bind_param('s',$_GET['username']);
      $stmt->execute();
      $result = $stmt->get_result();

      $foodList = array();

      while ($row = $result->fetch_object()) {
            $foodList[] = $row;
      }
    //   turn the array of objects into json format
      echo json_encode($foodList);
      $stmt->close();
      $conn->close();

    }


} else { die("Connection error: ". $conn->connect_error);}









?>