<?php
include_once('connect_MySQL.php');
$diveData = json_encode($_POST['diveData']);
$dives = json_decode($diveData);
$sightData = json_encode($_POST['sightData']);
$sightings = json_decode($sightData);

$insert = 1;
if($insert == 1){
    try{
    $sql = $PDO->prepare('INSERT INTO diveLog(id, diveDate, Location, Depth, diveTime, pressureStart, pressureEnd) Values(:id, :date, :loc, :depth, :time, :pStart, :pEnd)');
    $sql->bindParam(':id', $sightings[0]);
    $sql->bindParam(':date', $dives[0]);
    $sql->bindParam(':loc', $dives[1]);
    $sql->bindParam(':depth', $dives[2]);
    $sql->bindParam(':time', $dives[3]);
    $sql->bindParam(':pStart', $dives[4]);
    $sql->bindParam(':pEnd', $dives[5]);
    $sql->execute();
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

    $insert = 2;
}

if($insert == 2){

    $id = $sightings[0];
    for($i = 0; $i<count($sightings[1]); $i++){
            $animal = $sightings[1][$i];
        try{
            $sql = $PDO->prepare('INSERT INTO Sightings(sight, diveID)
                Values(:sight, :id)');
            $sql->bindParam(':sight', $animal);
            $sql->bindParam(':id', $id);
            $sql->execute();
        }
        catch(PDOException $e)
        {
        echo $sql . "<br>" . $e->getMessage();
        }

    }
}
	

		

?>