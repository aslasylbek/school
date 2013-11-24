// JavaScript Document
var window_width = window.innerWidth;
var window_height = window.innerHeight;	
var con_mitems = document.getElementById("menu_items");
var con_reca = document.getElementById("sider");
var con_cont = document.getElementById("content");
var con_main = document.getElementById("main");
var con_holder = document.getElementById("holder");
var btn_menu = document.getElementById("menu");


//resize wiindow 
sectionResize();


window.onload = function(){
	//	fetchData();	
}

btn_menu.onclick = function(){    
//con_mitems.style.marginLeft = (con_mitems.style.marginLeft == 0)? -200 : 0;
   if($(con_mitems).css("left") != "0px"){
		$(con_holder).animate({"left" :"295px"}, "slow");
		$(con_mitems).animate({"left" :"0"}, "slow");   
		$(this).animate({"left":"295px"}, "slow");
   }else{
		$(con_holder).animate({"left" :"0"}, "slow");    
		$(con_mitems).animate({"left": "-295px"}, "slow");   
		$(this).animate({"left":"3px"}, "slow");
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

function create_comment(postid){	
	var text = $('#'+postid+' .fmessage').val();
	var dt = new Date();
	var dta = ''+ dt.getTime();
	var primg = $('#heaa #postada');
	var prnam = $('#heaa #postbyad');
	var cjson = {'date':dta, 'country':countr, 'postid':postid, 'user':{'username': ''+prnam.html(), 'userimg':''+primg.html()}, 'message': text};
	$.post('module/comment/add.php', cjson, function(data){$('#'+postid+'1.ucom').append(data); cal_datepost();});
}



