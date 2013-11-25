<?php
require_once("../../etc/settings.php");
$_POST["cid"] = 'all';
if(!empty($_POST["amt"]) && !empty($_POST["pid"])){
		getComment();
}


function getComment(){
	global $db;
	$limit = ($_POST["amt"] != 'all')? 'limit '.$_POST["amt"] : '';
	if($cresult = $db->ReturnArrayData("select fname, lname, user_comment.id as cid, user_comment.uid as uid, comment, pid, user.img as uimg, pdate from user_comment join user on user_comment.uid = user.uid where pid = '".$_POST['pid']."' order by pdate desc ".$limit)){
		foreach($cresult as $value){
		$da = "<div class='commenters' id='".$value['cid']."'>
			<h3>
				<a class='profile_link' href='user.php?id=".$value['uid']."'><img class='profile_pic' src='".$value['uimg']."' /><span class='profile_name'> ".$value['fname']." ".$value['lname']." </span></a>
				<span class='ptime' name='".strtotime($value['pdate'])."' ></span>
			</h3>
			<section class='message'>".$value['comment']."</section>
		</div>";
		echo $da;
		}
	}	
}

?>