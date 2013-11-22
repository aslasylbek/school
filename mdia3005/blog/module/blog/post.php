<?php
require_once("../../etc/settings.php");
if(!empty($_POST['amt'])){
	getPost($_POST['amt']);	
}

function getPost($amt){
	global $db;
	if($result = $db->ReturnArrayData("select * from user_post")){
		$articles = array();
		$con = 0;
		foreach($result as $record){
			if($con < $amt){ ?>
				<article class="post" onClick="topro('<?php echo $record["pid"]; ?>')">
					<img class="propimg" src="<?php echo $record["img"]; ?>" />
					<h1 class="head"><address><?php echo $record["address"]; ?></address><span><?php echo $record["exhibition"]; ?></span></h1>
					<div class="cost">J$<?php echo $record["cost"]; ?></div>
					<section class="description"><p><?php echo $record["description"]; ?></p></section> 
					<section class="options">
						<input type="button" value="share" class="share"/>
						<input type="button" value="like" class="like" />
						<input type="button" value="comment" class="comment" />
					</section>           
				</article>
			<?php	$con++;
			}
		}
		//echo json_encode($articles);
	}
}
?>