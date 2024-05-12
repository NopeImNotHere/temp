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
  $stmt = $conn->prepare("SELECT * from reserved WHERE hotelkette.Zimmerart.PK_Zimmer=1");
  $stmt->execute();
  $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo '<table border="1">';
  echo '<tr>';
  foreach ($data[0] as $key => $value) {
    if (strpos($key, 'PK') === false && strpos($key, 'FK') === false) { // Check if the key contains 'PK' or 'FK'
        echo '<th>' . htmlspecialchars($key) . '</th>';
    }
  }
  echo '</tr>';

  foreach ($data as $row) {
      echo '<tr>';
      foreach ($row as $key => $value) {
          if (strpos($key, 'PK') === false && strpos($key, 'FK') === false) { // Check if the key contains 'PK' or 'FK'
              echo '<td>' . htmlspecialchars($value) . '</td>';
          }
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

