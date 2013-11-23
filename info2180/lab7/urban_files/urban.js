window.onload = function(){
   getData();
    
}

function getData(){
    $('lookup').observe('click', function(){ 
    var def_holder = $("result");
    var searchf = $("term"); 
     new Ajax.Request("request.php", {
               method : 'get',
               parameters : {term : $("term").getValue(), all: true},
               onSuccess: function(transport) {
                var response = transport.responseText || "no response text";
                    $('result').update('<ol id="def_list"></ol>');
                   var el = document.createElement('div');
                   el.innerHTML = response;
                    var childs = el.down("entries").childElements();
                   for(var x = 0; x <= childs.length; x++){
                        $('def_list').insert({top:"<li>"+childs[x].innerHTML+"</li>"});
                   }
              },
              onFailure: function() { alert('Something went wrong...'); }         
     }); 
   });

}