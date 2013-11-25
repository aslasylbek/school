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
		foreach($result as $record){ ?>
				<article class='post' id='<?php echo $record['pid']; ?>' >
					<img class='propimg' src='<?php echo $record['img']; ?>' />
                    <section class='cholder'>
                        <h1 class='head'><address><?php echo $record['address']; ?></address><span><?php echo $record['exhibition']; ?></span></h1>
                        <div class='cost'>J$<?php echo $record['cost']; ?></div>
                        <section class='description'><p><?php echo $record['description']; ?></p></section> 
                        <section class='options'>
                            <a href='property.php?id=<?php echo $record['pid']; ?>'>read more</a>
                        <!--	<input type='button' value='share' class='share'/>
                            <input type='button' value='like' class='like' /> -->
                            <input type='button' value='show comment' class='comment' onClick='comment("<?php echo $record['pid']; ?>")' />
                            <div id='ucom_<?php echo $record['pid']; ?>' class='ucom'></div>      
                            <form class='commentf' id='comm_<?php echo $record['pid']; ?>' name="<?php echo $record['pid']; ?>" >
                                <textarea placeholder='Write something' class='fmessage'></textarea>                                    
                                <input type='submit' value='comment' class='comment share' onClick='comment("<?php echo $record['pid']; ?>")'  />
                            </form>
                          </section>           
                    </section>
				</article>
			<?php	
			
		}
	}
}
?>