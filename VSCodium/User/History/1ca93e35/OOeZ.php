<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "Ilgzszjt1940";
$dbname = "hotelkette";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $stmt = $conn->prepare("
    SELECT * FROM reserviert
    INNER JOIN Gast ON reserviert.FK_Gast=Gast.PK_Gast
    INNER JOIN Zimmer ON reserviert.FK_Zimmer=Zimmer.PK_Zimmer
    INNER JOIN Zimmerart ON Zimmer.FK_Zimmerart=Zimmerart.PK_Zimmerart
    INNER JOIN Gebaeude ON Zimmer.FK_Gebaeude=Gebaeude.PK_Gebaeude
    INNER JOIN Hotel ON Gebaeude.FK_Hotel=Hotel.PK_Hotel
    WHERE Zimmerart.PK_Zimmerart=1;
  ");
  $stmt->execute();
  $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo '<table border="1">';
  echo '<tr>';
  foreach ($data[0] as $key => $value) {
    if (str_contains($key, 'PK') == false) { 
      echo '<th>' . htmlspecialchars($key) . '</th>';
    }
  }
  echo '</tr>';

  foreach ($data as $row) {
    echo '<tr>';
    if (str_contains($key, 'PK') == false) {
        echo '<td>' . htmlspecialchars($value) . '</td>';
    }
    echo '</tr>';
  }

  echo '</table>';
} catch(PDOException $e) {
  echo "Error: " . $e->getMessage();
}
$conn = null;

echo "</table>";
?>

