// JavaScript Document
var window_width = window.innerWidth;
var window_height = window.innerHeight;	
var con_mitems = document.getElementById("menu_items");
var con_reca = document.getElementById("sider");
var con_cont = document.getElementById("content");
var con_main = document.getElementById("main");
var con_holder = document.getElementById("holder");
var btn_menu = document.getElementById("menu");
var accform = document.getElementById('accform');


//resize wiindow 
sectionResize();


window.onload = function(){
	//	fetchData();	
	cal_datepost();
}


$('.signin').click(function(e){	
	positionAccForm('login');
});
$('.register').click(function(e){	
	positionAccForm('register');
});

$('.signout').click(function(e){
	$.post('module/user/logout.php', function(data){
		console.log(data);
		if(data == 1){
			window.location.reload();
		}
	});
});

document.forms['login'].onsubmit = function(){
	var data = {email: this.email.value, pass: this.pass.value};
	$.post('module/user/get.php', data, function(data){
		console.log(data);
		if(data == 1){
			window.location.reload();
		}
	});
	return false;
}

document.forms['register'].onsubmit = function(){
	var pass = this.pass.value;
	var cpass = this.cpass.value;
	var fname = this.fname.value;
	var lname = this.lname.value;
	if(pass === cpass){
		var data = {email: this.email.value, pass: pass, firstname: fname, lastname: lname};
		$.post('module/user/add.php', data, function(data){
			console.log(data);
		});
	}else{
		if(pass != cpass){
			this.cpass.placeholder = 'passwords did not match';
		}
	}
	return false;
}


btn_menu.onclick = function(){    
//con_mitems.style.marginLeft = (con_mitems.style.marginLeft == 0)? -200 : 0;
	var offset = 0;
   if($(con_mitems).css("left") != "0px"){
		$(con_holder).animate({"left" :"295px"}, "slow");
		$(con_mitems).animate({"left" :"0"}, "slow");   
		$(this).animate({"left":"295px"}, "slow");
		offset = 295;
		$(accform).animate({left : ((offset < 0)? 5: $('#menu_items').width())+'px'}, 'slow');
   }else{
	   offset = -295;
		$(con_holder).animate({"left" :"0"}, "slow");    
		$(con_mitems).animate({"left": "-295px"}, "slow");   
		$(this).animate({"left":"3px"}, "slow");		
		$(accform).animate({left : ((offset < 0)? 5: $('#menu_items').width())+'px'}, 'slow');
   }
}

function sectionResize(){
	if($(con_mitems).css("left") != 0){
		con_holder.style.width = window_width+"px";
		con_mitems.style.height = con_reca.style.height = con_holder.style.height = con_main.style.minHeight = window_height+"px";	
		con_main.style.width = (window_width - 350)+"px";
	}
}


var topro = function(goto) {
	//location.assign("http://www.w3schools.com");
};

$(window).on("resize load", window, function(){
	//resize wiindow 
	sectionResize();
});

function cal_datepost(){
	$('.ptime').each(function(){
		var ti = $(this).attr('name'); 
		$(this).text('posted '+onSiteDuration(ti));
	});
}

function calculateDatesDifference(operand, subtractor){
	var secs = (operand - subtractor);
	return secs;
}

function onSiteDuration(pub){
	var pd = new Date();
	pub = parseInt(pub);
	var cd = new Date();
	//converting date in milkuseconds
	var va = Math.floor(cd.getTime()/1000);
	var secs =  calculateDatesDifference(va, pub);
	var mins = Math.floor(secs/60), hours = Math.floor(mins/60),  days = Math.floor(hours/24), weeks = Math.floor(days/7), months = Math.floor(weeks/4);
	duration = (months > 12)? pub: (months > 1)? months+' months ago': (months != 0)? months+' month ago': (weeks > 2)? weeks+' weeks ago': (days > 1)? days+' days ago': (hours > 1)? hours+' hours ago': (mins > 1)? mins+' mins ago': (mins == 1)? mins+' minute ago': 'Just now';   
	return duration;
}

function positionAccForm(type){
	$('#accform').show();
	$('#accform form').hide();
	if(type == 'login'){		
		$('#accform').css('border-left','5px solid #09f');
		$('#accform form[name="login"] input[type="submit"]').css({background: '#09f', boxShadow: '0 0 5px #09f'});
		$('#accform form[name="login"]').show();
	}else if(type == 'register'){
		$('#accform').css('border-left','5px solid rgba(51,255,51,1)');
		$('#accform form[name="register"] input[type="submit"]').css({background: 'rgba(51,255,51,1)', boxShadow: '0 0 5px rgba(51,255,51,1)'});
		$('#accform form[name="register"]').show();	
	}
	var offset = $('#acc').offset();
	accform.style.top = offset.top+'px';
	$(accform).animate({left : ((offset.left < 0)? 5: $('#menu_items').width())+'px'}, 'slow');
}



