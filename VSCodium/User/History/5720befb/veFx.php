<?php
$servername = "localhost";
$username = "root";
$password = "Ilgzszjt1940";
$dbname = "hotelkette";

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php require('./navbar.php')?>
    <?php switch ($_GET['page']) {
        case 'reserved':
            include('reserved.php');
            break;
        case 'guest_add':
            include('guest_add.php');
            break;
        case 'staff_add':
            include('staff_add.php');
            break;
        
        default:
        include('Hello.php');
            break;
    }?>
</body>
</html>