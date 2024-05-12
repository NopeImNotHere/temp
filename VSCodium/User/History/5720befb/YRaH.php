<?php


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
        case 'reserve':
            include('reserve.php');
            break;
        case 'guest_add':
            include('guest_add.php');
            break;
        
        default:
        include('Hello.php');
            break;
    }?>
</body>
</html>