<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');


require_once 'connect.php';


$date= date('Y-m-d');





    if (!$conn->connect_error) {
        echo 'Connected to server succesfully.';
    }
// prepared statements, ? => placeholder for the values as args and bind

    if (isset($_POST['email']) && isset($_POST['password'])) {

        if(!$stmt = $conn->prepare("INSERT INTO UserLogin (email, password, reg_date) values (?,?,?)")) {
            echo "Prepare failed: (". $conn->errno. ")". $conn->error;
        } else {
            $stmt->bind_param("sss",$_POST['email'],$_POST['password'],date('Y-m-d'));
            $stmt->execute();
        }
        
        $stmt->close();
        $conn->close();


    }





?>