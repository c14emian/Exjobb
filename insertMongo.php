<?php
require 'C:\Users\Emil\vendor/autoload.php';
$m = new MongoDB\Client("mongodb://localhost:27017");

$db = $m->ExjobbDB->dive;

$diveData = json_encode($_POST['diveData']);
$dives = json_decode($diveData);
$sightData = json_encode($_POST['sightData']);
$sightings = json_decode($sightData);

		$document = array(
			"diveDate" => $dives[0],
			"Location" => $dives[1],
			"Depth" => $dives[2],
			"diveTime" => $dives[3],
			"pressureStart" => $dives[4],
			"pressureEnd" => $dives[5],
			"Sightings" => $sightings[1]
		);
		try{
			$db->insertOne($document);
		}
		catch (MongoCursorException $mce){
			echo $mce;
		}
	echo "Success";
?>