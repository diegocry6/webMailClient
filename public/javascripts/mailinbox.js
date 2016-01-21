
//Codigo Javascript lista emails
// Aqui AJAX hace un post con el mensaje pideemail , que le llega al controlador que
// programado cuando le llega por post pideemail , devuelve el array de mensajes.

	var textos = [];

$(document).ready(function() {

jQuery.ajax({
url: "http://127.0.0.1:3000/mail",
type: "POST",
dataType:'json',
success:function(mensajes)
{

	    var tbl=$("<table/>").attr("id","mytable");
	    $("#div1").append(tbl);
		
  var tr1="<tr><td>Remitente</td><td>Asunto</td><td>Fecha</td><td>Ver Correo</td></tr>";		
	    $("#mytable").append(tr1); 
  for(var i=0;i<mensajes.length;i++)
	{
	textos.push(mensajes[i].Cuerpo);
	var tr2="<tr>";
	var td1="<td>"+mensajes[i].Remitente+"</td>";
	var td2="<td>"+mensajes[i].Asunto+"</td>";
	var td3="<td>"+mensajes[i].Fecha.split('T')[0];+"</td>";
	var td4="<td><button class='button button1' onclick='leer("+i+")'>Leer Email</button> </tr>";

	    $("#mytable").append(tr2+td1+td2+td3+td4); 

         } 

	var botones="<a class='button button1 izquierda' href='/mail/escribir'> Escribir Email </a><a class='button button1 izquierda' href='/mail/cerrar'> Cerrar Sesion </a>";
	$("#mytable").append(botones);


}
});

});

function leer(indice) {
    alert(textos[indice]);             // The function returns the product of p1 and p2
}

