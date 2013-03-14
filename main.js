
//variable global para controles dropdown
var menu = $("ul.dropdown");
var menu2 = $("ul.dropdown2");

//control de eventos
$(this.document).ready(function(){
	menu.mouseover(function(){
		displayOptions($(this).find("li"));
	});
	menu.mouseout(function(){
		hideOptions($(this));
	});	
})

$(this.document).ready(function(){
	menu2.mouseover(function(){
		displayOptions($(this).find("li"));
	});
	menu2.mouseout(function(){
		hideOptions($(this));
	});	
})


//funcion que MUESTRA todos los elementos del menu
function displayOptions(e){
	e.show();
}
//funcion que OCULTA los elementos del menu
function hideOptions(e){
	e.find("li").hide();
	e.find("li.active").show();
}
