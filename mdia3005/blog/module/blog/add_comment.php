<?php
require_once("../../etc/settings.php");

if(!empty($_POST["pid"]) && !empty($_POST["uid"]) && !empty($_POST["comment"])){
	addComment();
}


function addComment(){
	global $db;
	if($db->Query('insert into user_comment(pid, uid, comment) values(\''.trim($_POST['pid']).'\', \''.trim($_POST['uid']).'\', \''.trim($_POST['comment']).'\')')){
		if($cresult = $db->ReturnArrayData("select id, uid, comment, pid, pdate from user_comment")){
			$da = "<div class='commenters' id='".$cresult[0]['id']."'>
							<div class='headas'><span></span>
								<br /><span class='ptime' name='".$cresult[0]['pdate']."' ></span>
								<div class='clear'></div>
							</div>
							<section class='message'>".$cresult[0]['comment']."</section>
						</div>";
			echo $da;
		}	
	}else{
		echo false;
	}
}

?>