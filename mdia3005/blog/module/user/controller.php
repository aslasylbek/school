<?php

function addUser($fname, $lname, $email, $pass){
	global $db;
	if($db->Query("insert into user(fname, lname, email, pass, uid) values('$fname', '$lname', '$email', md5('$pass'), '".uniqid('ur')."')")){
		echo true;
		return login($email, $pass);
	}else{
		echo false;
	}
}

function getUserById($uid){
	global $db;
	if($result = $db->ReturnArrayData("select uid, fname, lname, img, number, email from user where uid = '$uid'")){
		return $result[0];
	}
}

function login($email, $pass){
	global $db;
	if($result = $db->ReturnArrayData("select uid, fname, lname, img, number, email from user where email = '$email' and pass = md5('$pass')")){
		echo true; 
		return $result[0];
	}else{
		echo false;
	}
}


?>