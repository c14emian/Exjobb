<?php
require 'C:\Users\Emil\vendor/autoload.php';
$m = new MongoDB\Client("mongodb://localhost:27017");
$db = $m->ExjobbDB->dive;

$searchVal = $_POST['searchData'];
$searchType = $_POST['searchType'];

if($searchType == 'animals'){
	$searchQuery = array('Sightings' => $searchVal);
	$result = $db->find($searchQuery);
}
else if($searchType == 'dives'){
	$searchQuery = array('Location' => $searchVal);
	$result = $db->find($searchQuery);
}

echo json_encode(iterator_to_array($result));
?>