<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../Register/connect.php';


// some sort of inner join to get username and display related foodlist + details



if (!$conn-> connect_error) {


  
    if (!$stmt = $conn->prepare("SELECT food_name,food_log_date_simple,food_log_date,calories,carbohydrates,protein,fat FROM UserFoodsLog WHERE username = ? AND food_log_date_simple = ? ORDER by food_name ASC")) {
        echo "Prepare failed: (". $conn->errno. ")". $conn->error;
    } else {
    
      $stmt->bind_param('ss',$_GET['username'],$_GET['dateSelected']);
      $stmt->execute();
      $result = $stmt->get_result();

      $foodLogsList = array();

      while ($row = $result->fetch_object()) {
            $foodLogsList[] = $row;

      }
    //   turn the array of objects into json format
      
    // echo $_GET['dateSelected'];
      echo json_encode($foodLogsList);
      $stmt->close();
      $conn->close();

    }



} else { die("Connection error: ". $conn->connect_error);}

?>