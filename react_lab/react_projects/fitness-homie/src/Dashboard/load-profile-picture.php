<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../connect.php';



// get uid from Dashboard.js and respond with a json object to be destructured back on Dashboard.js

// success db connection
if (!$conn-> connect_error) {

   $user_id = file_get_contents('php://input');
     
   // echo ('hello');
   
   if(!$stmt = $conn->prepare("SELECT profile_picture FROM UserBasic WHERE userlogin_id = ?")) {
      echo "Prepare failed: (". $conn->errno. ")". $conn->error;
   } else {
      $stmt->bind_param('i',$user_id);
      $stmt->execute();
      $result = $stmt->get_result();
      // echo json_encode($result->fetch_assoc());

      $rows = array();
      while ($r = mysqli_fetch_array($result)) {
        
        echo $r['profile_picture'];
      }





     

    

     

      
     
  


      

      $stmt->close();
      $conn->close();
   }


}



?>