<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../connect.php';

if (!$conn->connect_error) {
  
        if(!$stmt=$conn->prepare("SELECT email FROM UserLogin")) {
            echo "Prepare failed: (". $conn->errno. ")". $conn->error; 
        } else {

          
            // execute query
            $stmt->execute();
            // store result to get prop.
            $stmt->store_result();
            // get of num of rows;
            $num_of_rows = $stmt->num_rows;
            // bind results to variables
            $stmt->bind_result($email);
            $email_array= array();

            while ($stmt->fetch()) {
                $email_array[] = $email;
            }
            // convert the array to json format
            $email_json = json_encode($email_array);
            $stmt->free_result();
            $stmt->close();

            echo $email_json;

        }
            $conn->close();


}




?>