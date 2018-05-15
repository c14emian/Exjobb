<?php
require 'C:\Users\Emil\vendor/autoload.php';
$m = new MongoDB\Client("mongodb://localhost:27017");

$db = $m->ExjobbDB->dive;

$searchVal = $_POST['searchData'];
$testQuery = array('Sightings' => $searchVal);
$result = $db->find($testQuery);

echo json_encode(iterator_to_array($result));
?>