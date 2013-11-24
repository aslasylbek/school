<?php
require_once("../../etc/settings.php");
$_POST['uid'] = '798uu99u9u';
if(!empty($_POST['uid'])){
	getPost($_POST['uid']);	
}

function getPost($uid){
	global $db;
	if($result = $db->ReturnArrayData("select uid, fname, lname, img, number, email from user where uid = '$uid'")){
		return $result[0];		
	}
}
?>