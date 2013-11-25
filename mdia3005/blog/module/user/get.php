<?php
require_once 'controller.php';
if(!empty($_POST['uid'])){
	require_once("../../etc/settings.php");
	$_SESSION['ui'] = getUserBy($_POST['uid']);	
}


if(!empty($_POST['email']) && !empty($_POST['pass'])){
	require_once("../../etc/settings.php");
	$_SESSION['ui'] = login($_POST['email'], $_POST['pass']);	
}
?>