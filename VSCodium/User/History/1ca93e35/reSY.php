<?php
class TableRows extends RecursiveIteratorIterator {
  function __construct($it) {
    parent::__construct($it, self::LEAVES_ONLY);
  }

  function current() {
    return "<td style='width:150px;border:1px solid black;'>" . parent::current(). "</td>";
  }

  function beginChildren() {
    echo "<tr>";
  }

  function endChildren() {
    echo "</tr>" . "\n";
  }
} 


try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $stmt = $conn->prepare("SELECT * FROM reserviert
INNER JOIN Gast ON reserviert.FK_Gast=Gast.PK_Gast
INNER JOIN Zimmer ON reserviert.FK_Zimmer=Zimmer.PK_Zimmer
INNER JOIN Zimmerart ON Zimmer.FK_Zimmerart=Zimmerart.PK_Zimmerart
INNER JOIN Gebaeude ON Zimmer.FK_Gebaeude=Gebaeude.PK_Gebaeude
INNER JOIN Hotel ON Gebaeude.FK_Hotel=Hotel.PK_Hotel
WHERE Zimmerart.PK_Zimmerart=1;");
  $stmt->execute();

  // set the resulting array to associative
  $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
  foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) {
    echo $v;
  }
} catch(PDOException $e) {
  echo "Error: " . $e->getMessage();
}
$conn = null;
?>

