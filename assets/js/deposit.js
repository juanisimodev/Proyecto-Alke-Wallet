/**
 * Gestión de Depósitos e Incremento de Activos 
 */
$(document).ready(function() {
  // Lectura y renderizado inicial del dinero disponible
  var currentBalance = parseFloat(localStorage.getItem('walletBalance')) || 60000;
  $('#currentBalanceDisplay').text('$' + currentBalance.toFixed(2));

  $('#depositForm').submit(function(e) {
    e.preventDefault();
    var amount = parseFloat($('#amount').val());

    // Validaciones de tipo de datos y restricciones de negocio
    if (!isNaN(amount) && amount > 0) {
      currentBalance += amount;
      localStorage.setItem('walletBalance', currentBalance.toString());

      // Registro histórico estructurado en el Array JSON
      var transactions = JSON.parse(localStorage.getItem('transactions')) || [];
      transactions.unshift({ 
        tipo: 'depósito', 
        monto: amount, 
        fecha: new Date().toLocaleString() 
      });
      localStorage.setItem('transactions', JSON.stringify(transactions));

      // Inyección de leyenda dinámica en texto aclaratorio
      $('#confirmation-legend').html('<i class="fas fa-receipt mr-1"></i> Última carga procesada: +$' + amount.toFixed(2));

      // Alerta Bootstrap de operación exitosa
      $('#alert-container').html(
        '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
        '<strong>¡Depósito procesado!</strong> Los fondos han sido abonados a tu balance disponible.' +
        '</div>'
      );

      $('#amount').val('');

      // Redirección asíncrona automatizada
      setTimeout(function() {
        window.location.href = 'menu.html';
      }, 2000);
      
    } else {
      $('#alert-container').html('<div class="alert alert-danger">Operación rechazada. Ingrese un valor numérico positivo.</div>');
    }
  });
});