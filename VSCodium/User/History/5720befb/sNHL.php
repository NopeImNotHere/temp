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
    <?php if(isset($_GET['page'])) { switch ($_GET['page']) {
        case 'value':
            include('reserve.php')
            break;
        
        default:
        include('Hello.php');
            break;
    }?>
</body>
</html>