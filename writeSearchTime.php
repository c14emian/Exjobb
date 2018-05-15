<?php
$time = $_POST['storeTime'];
$currDB = $_POST['dbType'];

if($currDB == 'mysql'){
	$file = "mysqlResults.txt";
}
else if($currDB == 'mongodb'){
	$file = "mongodbResults.txt";
}

$content = file_get_contents($file);

$content .= $time . "\r\n";
file_put_contents($file, $content);

echo $time;
?>