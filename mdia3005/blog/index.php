<?php 
require_once 'etc/settings.php';
require_once 'module/user/get.php';

?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Home</title>
<link rel="stylesheet" type="text/css" href="theme/default/css/main.css" />
<link rel="stylesheet" type="text/css" href="theme/default/css/home.css" />
<script src="static/js/jquery.js" ></script>
</head>
<body>
<input type="button" id="menu" value="menu" />
<?php if(isset($_SESSION['ui'])){ 
	echo '<div id="userwel"><a href="user.php?id='.$_SESSION['ui']['fname'].'">Hi '.$_SESSION['ui']['fname'].' '.$_SESSION['ui']['lname'].'</a></div>';
}
?>
<aside id="menu_items" class="containers">
	<ul>
    	<li class="logo">Home Lovers</li>
		<?php if(!isset($_SESSION['ui'])){ ?>
        <li>Account
        	<ul id="acc">
            	<li class="signin">Sign In</li>
                <li class="register">Rgister</li>
            </ul>
        </li>
		<?php }else{
			?>
            <li class="profile"><a href="user.php?id='<?php echo $_SESSION['ui']['fname']; ?>'">Profile</a></li>
            <?php			
		}
		?>
        <li class="photos">Photos</li>
        <li class="videos">Videos</li>
        <?php if(isset($_SESSION['ui'])){ ?>
            <li class="settings">Settings</li>        	
            <li class="signout">Sign Out</li>
        <?php } ?>
    </ul>
	<footer>
		<ul>
			<li>Terms and Agreement</li>
			<li>Sources</li>
			<li>help</li>
		</ul>
	</footer>
</aside>
<div id="holder" class="containers">
    <aside id="sider">
 
    
    </aside>
    <section id="main">
    	<section id="head">
        	<ul>
            	<li id="recpost" class="active">Recent Post</li>
            	<li id="ureadl">Your Reading List</li>
            	<li id="collection">Collection</li>
            </ul>
        </section>
        <section id="content">
        </section>    
    </section>	
</div>
<div id="accform">
	<form name="login">
		<input type="email" placeholder="Enter your email address" required name="email" />
		<input type="password" placeholder="Enter your password" required name="pass" />
		<input type="submit" value="login" />
	</form>
	<form name='register'>
		<input type="text" id='fname' placeholder="Enter your first name" required name="fname" />
		<input type="text" id='lname' placeholder="Enter your last name" required name="lname" />
		<input type="email" id='email' placeholder="Enter your email address" required name="email" />
		<input type="password" id='pass' placeholder="Enter your password" required name="pass" />	
		<input type="password" id='cpass' placeholder="Confirm your password" required name="cpass" />
		<input type="submit" value="register" />
	</form>
</div>
<script src="theme/default/js/default.js" ></script>
<script src="theme/default/js/home.js" ></script>
</body>
</html>
