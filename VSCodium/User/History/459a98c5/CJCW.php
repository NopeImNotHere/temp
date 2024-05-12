<?php
$lol = isset($_GET['lol']) ? $_GET['lol'] : 3;
if ($lol == 1) {
    include("player-create.php");
}
if($lol == 0) {
    include("team-create.php");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <a href="?lol=1"><button>Player create</button></a>
    <a href="?lol=0"><button>Team create</button></a>
</body>
</html>