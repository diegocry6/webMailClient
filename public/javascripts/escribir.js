
$('#enviar').click(function() {

var email = document.getElementById("emaildestino").val();
var asunto = document.getElementById("asunto").val();
var mensaje = document.getElementById("mensaje").val();

            alert('clicked');
            console.log(email);
            console.log(asunto);
            console.log(mensaje);
            $.ajax({
                url: "http://127.0.0.1:3000/mail/escribir",
                type: "POST",
                dataType: "json",
                data: {
                    email: email,
                    asunto: asunto,
                    mensaje: mensaje
                },
                contentType: "application/json",
                cache: false,
                timeout: 5000,
                complete: function() {
                  console.log('process complete');
                },

                success: function(data) {
                  console.log(data);
                  console.log('process sucess');
               },

                error: function() {
                  console.log('process error');
                },
              });
        })


