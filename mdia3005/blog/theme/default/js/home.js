// JavaScript Document
$.post("module/blog/post.php", {"amt": 10},function(data){
		$(con_cont).prepend(data);
});

fetchData();

function fetchData(){
	$.post("static/request/request.php",{url: "http://www.gmrealtyjamaica.com/nmcms.php?snippet=properties&p=propsearch&type=4&rentsale=rent"}, function(data){
		var property = $(data).find(".property_display");
		var addr, img, desc, cost, exhib, beds, baths, pid, lower, post;
		var stopper = 5;
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
			alert(desc);
			if(stopper < 5){
				
				$.post("module/blog/add.php", {"pid":pid, "uid":"ohomes", "addr":addr, "desc":desc, "img":img, "beds":beds, "baths":baths, "exhib":exhib,"cost":cost}, function(data){
					//alert(data)
				});
				stopper++;	
			}else{
				return false;
			} 
			//alert(desc);
		});		
	}); 
	
	/*
	$.post("static/request/request.php",{url: "http://meldamrealty.com/index.php"}, function(data){
		var property = $(data).find("#content2 .ten_properties .property");
		var addr, img, desc, cost, exhib, beds, baths;
		$.each(property, function(){
			img = $(this).find(".property_img a img").attr("src");
			addr = $(this).find(".property_title a").text();
			url = $(this).find(".property_title a").attr("href");
			exhib = $(this).find(".rentSale").text();
			//exhib = addr.substring((addr.lastIndexOf(',') +1));
			//addr = addr.substring(0, addr.lastIndexOf(','));
			cost = $(this).find(".property_price").text();
			cost = (cost.substring(3)).replace(',','');
			beds = $(this).find(".content_text strong").text();
			baths = beds.substr((beds.lastIndexOf("Full Baths") - 3), 3);
			beds = beds.substr((beds.lastIndexOf("Bedrooms") - 3), 3);
			desc = $(this).find(".property_description .property_details").text();
			alert(desc);
		});		
	}); 	
	*/
}