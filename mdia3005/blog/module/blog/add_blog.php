<?php
require_once("../../etc/settings.php");

if(!empty($_POST["pid"]) && !empty($_POST["uid"]) && !empty($_POST["addr"]) && !empty($_POST["desc"]) && !empty($_POST["img"]) && !empty($_POST["beds"]) && !empty($_POST["baths"]) && !empty($_POST["exhib"]) && !empty($_POST["cost"])){
	addProperty();
}


function addProperty(){
	global $db;
	if($db->Query('insert into user_post(pid, uid, bedrooms, bathrooms, address, img, description, exhibition, cost) values(\''.trim($_POST['pid']).'\', \''.trim($_POST['uid']).'\', '.$_POST['beds'].', '.$_POST['baths'].', \''.trim($_POST['addr']).'\', \''.trim($_POST['img']).'\',  \''.trim($_POST['desc']).'\', \''.trim($_POST['exhib']).'\', '.$_POST['cost'].')')){
		echo true;	
	}else{
		echo false;
	}
}

?>