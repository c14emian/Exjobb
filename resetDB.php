<?php
$currDB = $_POST['dbType'];
$searches = $_POST['searches'];
$storeType = $_POST['storeType'];

if($currDB == 'mysql'){
	try{
		include('connect_MySQL.php');
		$sql = "DELETE FROM diveLog";
		$command = $PDO->prepare($sql);
		$command->execute(); 
	}
	catch(PDOException $e)
    {
    	echo $sql . "<br>" . $e->getMessage();
    }

}
elseif($currDB == 'mongodb'){
	require 'C:\Users\Emil\vendor/autoload.php';
	$m = new MongoDB\Client("mongodb://localhost:27017");
	$db = $m->ExjobbDB->dive;
	$db->drop();
}

$file = $currDB . "-" . $storeType . "-" . $searches . ".txt";

$content = file_get_contents($file);

$content = "";
file_put_contents($file, $content);

echo $file;
?>