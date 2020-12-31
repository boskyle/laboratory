<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../Register/connect.php';

    if(!$conn->connect_error) {
        
        // Receive the RAW post json  data from the requester.
        $content = trim(file_get_contents("php://input"));
        $decoded = json_decode($content,true);

        $emailTrimmed = trim($decoded['email']);

        if(filter_var($emailTrimmed, FILTER_SANITIZE_EMAIL) != FALSE) {
            $_POST['email'] = $emailTrimmed;
            $_POST['password'] = $decoded['password'];
        }

        if (isset($_POST['email']) && $_POST['password']) {
            if(!$stmt=$conn->prepare("SELECT * FROM UserLogin WHERE email=?")) {
                echo "Prepare failed: (". $conn->errno. ")". $conn->error;
            } else {
                $stmt->bind_param("s",$_POST['email']);
                $stmt->execute();
                $result = $stmt->get_result();
                $user = $result->fetch_assoc();

                               
                if(password_verify($_POST['password'],$user['password'])) {
                    echo "pass";
                        // proceed with functionality
                        
                } else {echo "Incorrect password.";}
          


                $stmt->close();
                $conn->close();
            }
        }






    } else {echo "ERROR: connecting to db error";}






?>