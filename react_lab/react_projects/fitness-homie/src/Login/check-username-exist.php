<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../Register/connect.php';

if (!$conn->connect_error) {
  
        if(!$stmt=$conn->prepare("SELECT username FROM UserBasic")) {
            echo "Prepare failed: (". $conn->errno. ")". $conn->error; 
        } else {

          
            // execute query
            $stmt->execute();
            // store result to get prop.
            $stmt->store_result();
            // get of num of rows;
            $num_of_rows = $stmt->num_rows;
            // bind results to variables
            $stmt->bind_result($username);
            $username_array= array();

            while ($stmt->fetch()) {
                $username_array[] = $username;
            }
            // convert the array to json format
            $username_json = json_encode($username_array);
            $stmt->free_result();
            $stmt->close();

            echo $username_json;

        }
            $conn->close();


}




?>