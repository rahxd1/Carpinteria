function buscar(){
	
	$("#busca_catalogo").submit();
}
function login() {
    $.ajax({
        async: true,
        type: "GET",
        cache: false,
        url: "/includes/div_login.asp",
        success: function (codigo) {
            $.prompt(codigo);
        }
    });
}
function lopd_(){
	if ($("#lopd").attr('checked')==true ){
	$("#lopd").val(1);
	}else{
	$("#lopd").val(0);
	}
}
function lopd_2(){
	if ($("#lopd_reg").attr('checked')==true ){
	$("#lopd2").val(1);
	}else{
	$("#lopd2").val(0);
	}
}

function contratacion_chk(){
	if ($("#chkfaqs").attr('checked')==true ){
	$("#chkfaqs2").val(1);
	}else{
	$("#chkfaqs2").val(0);
	}
}

function contratacion(){
if ($("#chkfaqs2").val()=="0"){
alert("Debe aceptar las condiciones de contratación.");
return false;
} else {
    var ok;
    ok = true;
    if ($("#direccion").val() == "") {
        ok = false;
    }
    if ($("#telefono").val() == "") {
        ok = false;
    }
    if ($("#localidad").val() == "") {
        ok = false;
    }
    if ($("#provincia").val() == "") {
        ok = false;
    }
    if (ok==false) {
        alert("Faltan datos para el envío del pedido");
    }
    return ok;
}



}

function faqs(){
	if ($("#chkfaqs").attr('checked')==true ){
	$("#chkfaqs").val(1);
	}else{
	$("#chkfaqs").val(0);
	}
}

function registro_boletin(){
	
	
	if($("#email_boletin").val()!=""&&$("#nombre_boletin").val()!=""&&$("#lopd").val()==1){
	$("input[type='checkbox']").each(function() {

		if (this.checked == true){
		 $(this).val(1);
			 }else{
		  $(this).val(0);
		 }
	}); 
			$.ajax({
				
						type: "GET",
						url: "/includes/guarda_boletin.asp?email=" + $("#email_boletin").val()  + "&nombre=" + $("#nombre_boletin").val()  + "&disenyadores=" + $("#diseñadores").val() + "&lujo=" + $("#lujo").val() + "&chollos=" + $("#chollos").val() + "&chollos_lujo=" + $("#chollos_lujo").val() + "&videos=" + $("#videos").val(),
						async: true,						
						success: function(codigo){
						alert("Ya has sido registrado para recibir nuestros boletines");
							
						}
					});
	}
	else{
	alert("Faltan datos o la aceptación de las condiciones de privacidad");
	}

}



function inserta_pto(id_pto, precio, ref) {
    $.prompt("<img style='margin:auto;' src='/includes/ajax-loader-large.gif' width='300'/>");
        //$(".cesta").html("<img src='/includes/spinner.gif'/>&nbsp; Procesando...");
		$.ajax({
			
					type: "GET",
					url: "/mercurio/inserta_linea.asp?id_medida=0&id_producto=" + id_pto + "&precio=" + precio + "&cantidad=" + $("#cantidad").val() + "&referencia=" + ref + "&obs=" + $("#observaciones").val(),
					async: true,						
					success: function(codigo){
						location.href="http://www.portobellostreet.es/mercurio/pedido.asp";
						
					}
				});


}
function parar_subasta(id_puja, precio){
if(confirm('¿Está seguro de realizar esta compra?.\n\n Si acepta, SE REALIZARA EL PEDIDO DE FORMA AUTOMATICA.')){
	$.ajax({
						
								type: "GET",
								url: "/includes/ajax_subasta_parar.asp?id_puja=" + id_puja + "&precio=" + precio ,
								async: true,						
								success: function(codigo){
								location.href="http://www.portobellostreet.es/mercurio/pedido.asp";	
								}
							});
};

							
						




}
function datos_contacto(){
	
			
		var ok;
		var faltan_datos;
		faltan_datos="";
		ok=true;
		
		$(".necesario").css("background-color", "white");
	
		$(".necesario").each(function() {
			if ($(this).val()==""){
				ok=false;
				$(this).css("background-color", "orange");
				faltan_datos=faltan_datos + $(this).attr('id') + "\n";
			}
		});
	
			if ($("#lopd2").val()==0){
			ok=false;
			alert("Debe aceptar las condiciones de privacidad");
			}
			
			if (ok==false){
				alert("Por favor revise los siguientes campos :\n\n" + faltan_datos );
				ok=false;
			}else{
										
						v_telefono = $('#TELEFONO').val();
						var num_telefono = v_telefono.length
						if(num_telefono < 9||v_telefono==$('#EMAIL').val()){
							alert("Revise el formato del telefono (9 caracteres)");
							ok=false;
						}

						v_telefono = $('#movil').val();
						var num_telefono = v_telefono.length
						if(num_telefono < 9||v_telefono==$('#EMAIL').val()){
							alert("Revise el formato del movil (9 caracteres)");
							ok=false;
						}		
						var s = $("#EMAIL").val();

						var filter=/^[A-Za-z_.ñ-][A-Za-z0-9_.ñ-]*@[A-Za-z0-9_ñ-]+\.[A-Za-z0-9_.ñ-]+[A-za-z]$/;
  
						if (filter.test(s)){
							
							ok=true;
						}else{
							alert("Por favor introduce una dirección de correo válida");
							$('#EMAIL').val("");
							ok=false;
						}   						
			}
		return ok;
	}
	
	    function len(s){

    // Devuelve la longitud de la cadena s

    return s.length;

    }

function validatePass(campo) {
 /*   var RegExPattern = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,10})$/;
    var errorMessage = 'Password Incorrecta.';
    if ((campo.value.match(RegExPattern)) && (campo.value!='')) {
       return true; 
    } else {
        return false; 
    } */
}
	function comprueba_usuario(){

    //comprobamos si ya existe
		
		
        if (  len($("#USUARIO").val())>15||len($("#USUARIO").val())<6 ){

        alert("Disculpe, el nombre de usuario debe contener entre 6 y 15 caracteres.");

        $("#USUARIO").val("");

        }else {

            if ($("#USUARIO").val()!="" ){

                $.ajax({

                        async:      true,

                        type:       "GET",      

                        url:        "/includes/comprueba_user.asp?user=" + $("#USUARIO").val(),

                        
                        error:      function(){

                            

                            $("#USUARIO").val("");

                            alert("El nombre de usuario ya existe, debe escoger otro por favor.");

                        }

                    });

            }

        }

    }

	
		function comprueba_mail(){

    //comprobamos si ya existe
		


            if ($("#EMAIL").val()!="" ){

                $.ajax({

                        async:      true,

                        type:       "GET",      

                        url:        "/includes/comprueba_mail.asp?email=" + $("#EMAIL").val(),

                        
                        error:      function(){

                            
                            $("#EMAIL").val("");

                            alert("El email ya existe, debe escoger otro por favor o ir a recordar contraseña.");

                        }

                    });

            }

        

    }

function abrir_ajax(url,div){


	 
	 if (div!=""){
	 $("#" + div).html("<img src='/includes/spinner.gif'/>");
	 $("#" + div).show();
	 }
	 $.ajax({
		 type: "GET",
		 url: url,
		 cache: false,
		 async: true,
		 success: function(html){
			 	 if (div!=""){
		 			$("#" + div).html(html);
				 }
		 },
		 error: function(){
			 alert("Error en la operaciÃ³n");
			 //location.reload(true);
		 }
	 });
 }

function guarda_texto(){
		//comprueba datos
	var ok;
	
	ok=true;
	

	if ($("#nombre_texto").val()==""){
		ok=false;
		alert("El nombre es necesario.");
		
	}
	if ($("#texto_comentario").val()==""){
		ok=false;
		alert("El comentario es necesario.");
		
	}
	if ($("#email_texto").val()==""){
		ok=false;
		alert("El email es necesario.");
		
	}
	
	if (ok==true){
	    var url = "/includes/enviar_correo.aspx?producto=" + $("#id_producto").val() + "&Asunto=Duda de " + $("#nombre_texto").val() + "&texto=email:" + $("#email_texto").val() + " texto:" + $("#texto_comentario").val() + "[producto]";
		
		//location.href="http://www.portobellostreet.es" + url;
		 abrir_ajax(url,"guardando");
		 $("#enviar_comentario").hide();
		 $("#resultado_texto").html("<b>Pregunta Enviada</b>");
		 alert("En breve te responderemos a tu petición de información.");	
		 
		 //$.prompt("<div style='text-align:center;'><img src='/includes/OK.png'/>En breve se publicar&aacute; su comentario<br>Gracias por tu colaboraci&oacute;n</div>");
	}

}

function ver_gastos() {

    $.ajax({
        type: "GET",
        url: "/mercurio/gastos.asp",
        cache: false,
        async: true,
        success: function (html) {
            $.prompt(html);
        },
        error: function () {
            alert("Error en la operaciÃ³n");
            //location.reload(true);
        }
    });

   /* 
	$("#gastos").toggle();
	if ($("#boton_gastos").html()=="[Consultar Gastos de Envío]"){
		$("#boton_gastos").html("[ocultar gastos de envío]");
	}else{
		$("#boton_gastos").html("[Gastos de envío]");
	}
	
	
	*/
}

function inserta_medida(id_medida, id_pto, precio, ref){
    $.prompt("<img style='margin:auto;' src='/includes/ajax-loader-large.gif' width='300'/>");	
//$(".cesta").html("<img src='/includes/spinner.gif'/>&nbsp; Procesando...");
		$.ajax({
			
					type: "GET",
url: "/mercurio/inserta_linea.asp?id_medida="+ id_medida + "&id_producto=" + id_pto + "&precio=" + precio + "&cantidad=" + $("#cantidad_" + id_medida).val() + "&referencia=" + ref + "&obs=" + $("#observaciones").val(),
					async: true,						
					success: function(codigo){
						
					location.href="http://www.portobellostreet.es/mercurio/pedido.asp";	
					}
				});
}
function ver_cesta(){


		$.ajax({
			
					type: "GET",
					url: "/mercurio/cesta.asp",
					async: true,	
                    cache:false,					
					success: function(codigo){
					
										
					$("#cesta").html(codigo);
					
								
					}
				});
}
function calcula_financiacion(){


    if ($("#importe_fin").val()>120){
	    if ($("#plazo").val()!=""){
		    $.ajax({			
					    type: "GET",
					    url: "/includes/calcula_fin.asp?importe_fin=" + $("#importe_fin").val() + "&plazo=" + $("#plazo").val() + "&text=" + $('#plazo :selected').text(),
					    async: true,	
                        cache:false,					
					    success: function(codigo){
													
					    $("#financiacion").html(codigo);
													
					    }
            });
            $.ajax({
                type: "GET",
                url: "/includes/calcula_fin_corto.asp?importe_fin=" + $("#importe_fin").val() + "&plazo=" + $("#plazo").val() + "&text=" + $('#plazo :selected').text(),
                async: true,
                cache: false,
                success: function (codigo) {

                    $("#fin_corto").html(codigo);

                }
            });
            var fin;
            fin = 1;
            if ($("#plazo").val() == "0,3333333") {
                $("#formadepago").val('3Meses');
                fin = 0;
            }
            if ($("#plazo").val() == "0,1666666") {
                $("#formadepago").val('6Meses');
                fin = 0;
            }
            if ($("#plazo").val() == "0,1111111") {
                $("#formadepago").val('9Meses');
                fin = 0;
            }
            if ($("#plazo").val() == "0,0833333") {
                $("#formadepago").val('12Meses');
                fin = 0;
            }
            if (fin == 1) {
                $("#formadepago").val('financiacion');
                
            }
	    }else{
	    alert("Por favor, seleccione un plazo " + $("#plazo").val());
	    }
    }else{
    alert("Lo sentimos, el importe minimo para financiar una compra es de 120 Euros");
    }
}

function calcula_financiacion_ready() {


    if ($("#importe_fin").val() > 120) {
        if ($("#plazo").val() != "") {
            $.ajax({
                type: "GET",
                url: "/includes/calcula_fin.asp?importe_fin=" + $("#importe_fin").val() + "&plazo=" + $("#plazo").val() + "&text=" + $('#plazo :selected').text(),
                async: true,
                cache: false,
                success: function (codigo) {

                    $("#financiacion").html(codigo);

                }
            });
            $.ajax({
                type: "GET",
                url: "/includes/calcula_fin_corto.asp?importe_fin=" + $("#importe_fin").val() + "&plazo=" + $("#plazo").val() + "&text=" + $('#plazo :selected').text(),
                async: true,
                cache: false,
                success: function (codigo) {

                    $("#fin_corto").html(codigo);

                }
            });
        } else {
            alert("Por favor, seleccione un plazo " + $("#plazo").val());
        }
    } 
}
function enviar_pedido(){
		var ok;
		
		var faltan_datos;
		faltan_datos="";
		ok=true;
		
		$(".facturacion").css("background-color", "white");
	
		$(".facturacion").each(function() {
			if ($(this).val()==""){
				ok=false;
				$(this).css("background-color", "#F6F5EC");
				faltan_datos=faltan_datos + $(this).attr('name') + "\n";
			}
		});
		

			if ($("#importe").val()==0){
				alert("No tiene ningun producto en el presupuesto");
				
			}else{
				if (ok==false){
				alert("Por favor revise los siguientes campos :\n\n" + faltan_datos );
				}else{
					$("#envio_pedido").hide();
					$("#imagen_envio").html("<img src='/includes/spinner.gif'/>&nbsp; Generando Pedido...");
					$("#pedido").submit();	    					
				}
			}
			
			
		

}

function ver_menu(menu){

$(".menu_inicial").removeClass("menu_activo");
$("#li_" + menu).addClass("menu_activo");
$(".menu_cat").hide();
$("#" + menu).show();
$("#busquedas").addClass('menu_cat');
$("#busquedas").show();
	
}
function ocultar_menu(){
$(".menu_inicial").removeClass("menu_activo");
$(".menu_cat").hide();
}
	
	
	