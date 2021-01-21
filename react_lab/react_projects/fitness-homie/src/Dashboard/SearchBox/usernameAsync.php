<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../../Register/connect.php';



if (!$conn-> connect_error) {

    $usernameLetter = file_get_contents('php://input');
    $decoded = json_decode($usernameLetter);
    $pattern = "%{$decoded}%";

  
    $temp = "%b%";
  
    $myArray = array();

    if(!$stmt = $conn->prepare("SELECT * FROM UserBasic WHERE username LIKE ?")) {
        echo "Prepare failed: (". $conn->errno. ")". $conn->error;
     } else {
        $stmt->bind_param('s',$pattern);
        $stmt->execute();
        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {
          
            $myArray[] = $row;
          
        }

        echo json_encode($myArray);
       
  
  
        $stmt->close();
        $conn->close();
     }


}