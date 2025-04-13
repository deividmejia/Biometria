// Espera a que todo el contenido del DOM haya sido completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {

  // Obtiene la referencia al formulario con ID 'loginform'
  const form = document.getElementById("loginform");

  // Agrega un evento al formulario para que cuando se intente enviar, ejecute esta función
  form.addEventListener("submit", async function (event) {
      // Previene el comportamiento por defecto del formulario (recargar la página)
      event.preventDefault();

      // Obtiene los valores ingresados por el usuario en los campos de texto y contraseña
      const usuario = document.getElementById("usuario").value;
      const password = document.getElementById("password").value;

      try {
          // Realiza una solicitud HTTP POST al backend (servidor) en la ruta /api/login
          const response = await fetch("http://localhost:5000/api/login", {
              method: "POST", // Tipo de método HTTP
              headers: {
                  "Content-Type": "application/json" // Especifica que se está enviando un JSON
              },
              // Convierte los datos del formulario a formato JSON y los envía en el cuerpo de la solicitud
              body: JSON.stringify({ usuario, password })
          });

          // Espera y transforma la respuesta del servidor a formato JSON
          const result = await response.json();

          // Verifica si la respuesta fue exitosa (status HTTP 200-299)
          if (response.ok) {
              alert("Inicio de sesión exitoso");
              // Aquí se puede redirigir al usuario o guardar un token de sesión si es necesario
              // Ejemplo: window.location.href = "/dashboard.html";
          } else {
              // Si hubo un error en las credenciales, muestra el mensaje recibido o un mensaje por defecto
              alert(result.message || "Correo o contraseña incorrectos");
          }

      } catch (error) {
          // Captura errores relacionados con la conexión al servidor (por ejemplo, el backend está apagado)
          console.error("Error al conectar con el servidor:", error);
          alert("Error de conexión con el servidor.");
      }
  });
});

