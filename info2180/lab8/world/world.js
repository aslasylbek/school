window.onload = function(){
   getData();
    
}

function getData(){
    $('lookup').observe('click', function(){ 
	var term = $("term").getValue(); 
     new Ajax.Request("world.php", {
               method : 'get',
			   parameters : {lookup : term},
               onSuccess: function(transport) {
                var response = transport.responseText || "no response text";
                   $('result').update(response);
              },
              onFailure: function() { alert('Something went wrong...'); }         
     }); 
   });

}