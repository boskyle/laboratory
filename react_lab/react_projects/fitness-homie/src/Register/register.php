<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');


require_once 'connect.php';

    if (!$conn->connect_error) {
        echo 'Connected to server succesfully.';
    }
    

    
        // Receive the RAW post json data.
        $content = trim(file_get_contents("php://input"));
        $decoded = json_decode($content, true);

        // post it into superglobal, sanitize email to remove illegal characters (security),hash password
        $email = trim($decoded['email']);
            if(filter_var($email, FILTER_SANITIZE_EMAIL) != FALSE) {
                $_POST['email'] = $email;
            }

                $_POST['password'] = password_hash($decoded['password'],PASSWORD_DEFAULT);

        
     
    if (isset($_POST['email']) && isset($_POST['password'])) {
        // prepare statement and check if it fails in one line
        if(!$stmt = $conn->prepare("INSERT INTO UserLogin (email, password, reg_date) values (?,?,?)")) {
            echo "Prepare failed: (". $conn->errno. ")". $conn->error;
        } else {
            // bind what you want to do to the prepared statement
            $stmt->bind_param("sss",$_POST['email'],$_POST['password'],date('Y-m-d'));
            $stmt->execute();
            $stmt->close();
            echo 'Succesfully registered';
        }
        
       
        $conn->close();

    } else {echo 'empty post super globals';}





?>