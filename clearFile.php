<?php
$currDB = $_POST['dbType'];
$searches = $_POST['searches'];
$storeType = $_POST['storeType'];

$file = $currDB . "-" . $storeType . "-" . $searches . ".txt";

$content = file_get_contents($file);

$content = "";
file_put_contents($file, $content);

echo $file;
?>