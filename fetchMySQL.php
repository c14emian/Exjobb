<?php
include('connect_MySQL.php');
$searchVal = $_POST['searchData'];
$searchType = $_POST['searchType'];

if($searchType == 'sight'){
	$sql = $PDO->prepare('SELECT diveID FROM Sightings WHERE sight =:searchVal');
	$sql->bindParam(':searchVal', $searchVal, PDO::PARAM_STR);
	$sql->execute();

	$resultID = array();
	$result = array();
	while($row = $sql->fetch())
	{
		array_push($resultID, $row);
	}

	for($i=0; $i<count($resultID); $i++){
		$id = $resultID[$i][0];

		$sql = $PDO->prepare('SELECT * FROM diveLog WHERE id =:searchVal');
		$sql->bindParam(':searchVal', $id);
		$sql->execute();

		while($row = $sql->fetch())
		{
			array_push($result, $row);
		}

		$sql = $PDO->prepare('SELECT * FROM Sightings WHERE diveID =:searchVal');
		$sql->bindParam(':searchVal', $id);
		$sql->execute();

		while($row = $sql->fetch())
		{
			array_push($result, $row);
		}

	}
}
else if($searchType == 'location'){
	$sql = $PDO->prepare('SELECT * FROM diveLog WHERE Location =:searchVal');
	$sql->bindParam(':searchVal', $searchVal, PDO::PARAM_STR);
	$sql->execute();

	$result = array();
	while($row = $sql->fetch())
	{
		array_push($result, $row);
	}
}

echo json_encode($result);

?>