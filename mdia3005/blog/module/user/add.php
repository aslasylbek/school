<?php
require_once 'controller.php';
if(!empty($_POST['email']) && !empty($_POST['pass']) && !empty($_POST['lastname']) && !empty($_POST['firstname'])){
	require_once("../../etc/settings.php");
	$email = $_POST['email'];
	$pass = $_POST['pass'];
	$fname = $_POST['firstname'];
	$lname = $_POST['lastname'];
	$_SESSION['ui'] = addUser($fname, $lname, $email, $pass);
}

?>