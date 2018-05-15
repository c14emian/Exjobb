<?php
$time = $_POST['insertTime'];
$currDB = $_POST['dbType'];
$testNo = $_POST['test'];

if($currDB == 'mysql'){
	$file = "mysql-Insert-" . $testNo . ".txt";
}
else if($currDB == 'mongodb'){
	$file = "mongodb-Insert-" . $testNo . ".txt";
}

if(!file_exists($file)){
	file_put_contents($file, "");
}
$content = file_get_contents($file);

$content .= $time . "\r\n";
file_put_contents($file, $content);

echo $time;
?>