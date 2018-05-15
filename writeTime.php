<?php
$time = $_POST['storeTime'];
$currDB = $_POST['dbType'];
$searches = $_POST['searches'];
$storeType = $_POST['storeType'];

$file = $currDB . "-" . $storeType . "-" . $searches . ".txt";
$content = file_get_contents($file);

$content .= $time . "\r\n";
file_put_contents($file, $content);

echo $time;
?>