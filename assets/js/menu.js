/**
 * Carga Dinámica de Saldos y Enrutamiento 
 */
$(document).ready(function() {
  // Carga inicial del balance financiero desde Local Storage persistente
  var balance = parseFloat(localStorage.getItem('walletBalance')) || 60000;
  $('#balance').text('$' + balance.toFixed(2));

  // Función genérica encargada de simular la transición entre flujos
  function redirigir(pantalla, url) {
    var $msg = $('#redirectMessage');
    $msg.html('<i class="fas fa-spinner fa-spin mr-2"></i>Abriendo ' + pantalla + '...').removeClass('d-none');
    
    setTimeout(function() {
      window.location.href = url;
    }, 1000);
  }

  // Captura y gestión de eventos click con selectores jQuery
  $('#btnDeposit').click(function() {
    redirigir('pantalla de depósito', 'deposit.html');
  });

  $('#btnSend').click(function() {
    redirigir('módulo de envíos', 'sendmoney.html');
  });

  $('#btnTransactions').click(function() {
    redirigir('historial de últimos movimientos', 'transactions.html');
  });
});