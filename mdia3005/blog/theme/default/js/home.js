// JavaScript Document
$.post("module/blog/get_blog.php", {"amt": 10},function(data){			
	$(con_cont).prepend(data);				
});

fetchData();

function fetchData(){
	$.post("static/request/request.php",{url: "http://www.gmrealtyjamaica.com/nmcms.php?snippet=properties&p=propsearch&type=4&rentsale=rent"}, function(data){
		var property = $(data).find(".property_display");
		var addr, img, desc, cost, exhib, beds, baths, pid, lower, post;
		var stopper = 0;
		$.each(property, function(){
			img = $(this).find(".property_pic").attr("src");
			addr = $(this).find(".propsearch_header_text:first").text();
			exhib = addr.substring((addr.lastIndexOf(',') +1));
			addr = addr.substring(0, addr.lastIndexOf(','));
			cost = $(this).find(".propsearch_header_text:last").text();
			cost = (cost.substr((cost.lastIndexOf('$') + 1))).replace(',','');
			lower = $(this).find(".content_text strong").text();
			baths = lower.substr((lower.lastIndexOf("Full Baths") - 3), 3);
			beds = lower.substr((lower.lastIndexOf("Bedrooms") - 3), 3);
			desc = $(this).find(".content_text").text();
			desc = desc.substring(desc.indexOf("Baths") + 5, desc.indexOf("..."));
			pid = lower.substring((lower.indexOf("#") + 1 ), (lower.lastIndexOf("Bedrooms") - 3));
			if(stopper < 5){		
				$.post("module/blog/add_blog.php", {"pid":pid, "uid":"ohomes", "addr":addr, "desc":desc, "img":img, "beds":beds, "baths":baths, "exhib":exhib,"cost":cost}, function(data){});
				stopper++;	
			}else{
				return false;
			} 
			//alert(desc);
		});		
	});
}

function comment(pid){
	var pform = $('#comm_'+pid);
	var message = $('#comm_'+pid+' .fmessage').val();
	if(pform.css('display') == 'none'){	
		pform.show();
		$('#'+pid+' input[type="button"].comment').val('hide comments');
		$.post('module/blog/get_comment.php', {'pid':pid, 'amt': 10}, function(data){										
				$('#ucom_'+pid).append(data);		
				cal_datepost();			
			}); 
	}else{		 
		pform.submit(function(e) {
			$.post('module/blog/add_comment.php', {'pid':pid, 'uid':'oshane','comment': message}, function(data){										
				$('#ucom_'+pid).append(data);		
				cal_datepost();		
			});     
			return false;   
		});
	}
	
}
