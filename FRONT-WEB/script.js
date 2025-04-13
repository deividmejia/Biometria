document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginform");
  
    form.addEventListener("submit", async function (event) {
      event.preventDefault(); // Evita que el formulario se envíe normalmente
  
      const usuario = document.getElementById("usuario").value;
      const password = document.getElementById("password").value;
  
      try {
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ usuario, password })
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert("Inicio de sesión exitoso");
          // Puedes redirigir al usuario o guardar un token si es necesario
          // window.location.href = "/dashboard.html";
        } else {
          alert(result.message || "Correo o contraseña incorrectos");
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        alert("Error de conexión con el servidor.");
      }
    });
  });
  
