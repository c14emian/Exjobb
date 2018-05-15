<?php
include_once('connect_MySQL.php');

$sightData = json_encode($_POST['sightData']);
$sightings = json_decode($sightData);

$id = $sightings[0];
    $animal = "HEJ";
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

?>

