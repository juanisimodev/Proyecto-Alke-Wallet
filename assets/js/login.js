/**
 * Control de Autenticación y Validación de Credenciales 
 */
$(document).ready(function() {
  $('#loginForm').submit(function(event) {
    event.preventDefault();
    
    // Captura interactiva del DOM mediante selectores jQuery modificados
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();
    var $alertContainer = $('#alert-container');

    // Validación lógica estricta establecida por la rúbrica
    if (username === 'admin' && password === '12345') {
      // Inyección dinámica de Alertas nativas de Bootstrap
      $alertContainer.html('<div class="alert alert-success"><i class="fas fa-check-circle mr-2"></i>¡Inicio de sesión exitoso! Redirigiendo a su cuenta...</div>');
      
      // Inicialización del balance base de la billetera ($60,000) si el espacio está limpio
      if (!localStorage.getItem('walletBalance')) {
        localStorage.setItem('walletBalance', '60000');
      }

      // Temporizador de redirección fluida para mejorar la UX 
      setTimeout(function() {
        window.location.href = 'menu.html'; 
      }, 1500);

    } else {
      // Alerta de error ante credenciales no registradas
      $alertContainer.html('<div class="alert alert-danger"><i class="fas fa-exclamation-triangle mr-2"></i>Usuario o contraseña inválidos. Inténtalo de nuevo.</div>');
    }
  });
});