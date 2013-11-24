<?php
require_once('../../etc/settings.php');
if(!empty($_POST['amt'])){
	getPost($_POST['amt']);	
}

function getPost($amt){
	global $db;
	$limit = ($_POST['amt'] != 'all')? 'limit '.$_POST['amt'] : '';
	if($result = $db->ReturnArrayData('select * from user_post order by date desc '.$limit)){
		$articles = array();
		foreach($result as $record){ 
				$da = "<article class='post' id='".$record['pid']."' onClick='topro(this)'>
					<img class='propimg' src='".$record['img']."' />
                    <section class='cholder'>
                        <h1 class='head'><address>".$record['address']."</address><span>".$record['exhibition']."</span></h1>
                        <div class='cost'>J$".$record['cost']."</div>
                        <section class='description'><p>".$record['description']/"</p></section> 
                        <section class='options'>
                            <a href='property.php?id=".$record['pid']."'>read more</a>
                            <form class='commentf' id='comm_".$record['pid']."' >
                                <textarea placeholder='Write something' class='fmessage'></textarea>
                            </form>
                            <input type='submit' value='comment' class='comment' onClick='comment('".$record['pid']."')' />
                            <div id='ucom_".$record['pid']."' class='ucom'></div>                             
                        </section>           
                    </section>
				</article>";
				array_push($articles, $da);
			
		}
		echo json_encode($articles);
	}
}
?>