<?php
require_once("../../etc/settings.php");
$_POST["cid"] = 'all';
if(!empty($_POST["cid"])){
		getComment();
}


function getComment(){
	global $db;
	$limit = ($_POST["cid"] != 'all')? 'limit '.$$_POST["cid"] : '';
	if($cresult = $db->ReturnArrayData("select id, uid, comment, pid, pdate from user_comment order by pdate desc ".$limit)){
		$data = array();
		foreach($cresult as $value){
		$da = "<div class='commenters' id='".$value['id']."'>
						<div class='headas'><span></span>
							<br /><span class='ptime' name='".$value['pdate']."' ></span>
							<div class='clear'></div>
						</div>
						<section class='message'>".$value['comment']."</section>
					</div>";
					echo $da;
			array_push($data, $da);
		}
		echo json_encode($data);
	}	
}

?>