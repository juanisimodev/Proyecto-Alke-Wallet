/**
 * Control de Agenda, Filtros en tiempo real y Transferencias 
 */
$(document).ready(function() {
  
  // 1. Alternar visualización del formulario interno de contactos
  $('#btnShowAddContact').click(function() {
    $('#addContactFormContainer').removeClass('d-none');
  });
  
  $('#btnCancelAddContact').click(function() {
    $('#addContactFormContainer').addClass('d-none');
    $('#newContactForm')[0].reset();
    $('#modalValidationError').text('');
  });

  // 2. Validación de CBU e incorporación dinámica a la agenda
  $('#newContactForm').submit(function(e) {
    e.preventDefault();
    var name = $('#cName').val().trim();
    var cbu = $('#cCBU').val().trim();
    var alias = $('#cAlias').val().trim();
    var bank = $('#cBank').val().trim();

    if (name === '' || cbu === '' || alias === '' || bank === '') {
      $('#modalValidationError').text('Error: Todos los campos del formulario son obligatorios.');
      return;
    }
    if (cbu.length !== 22 || isNaN(cbu)) {
      $('#modalValidationError').text('Error: El CBU de destino debe contener exactamente 22 dígitos numéricos.');
      return;
    }

    // Estructuración e inserción dinámica del nuevo nodo HTML mediante jQuery
    var newBtn = $('<button type="button" class="list-group-item list-group-item-action contact-item"></button>')
      .attr('data-name', name)
      .attr('data-alias', alias)
      .text(name + ' (Alias: ' + alias + ')');
    
    $('#contactListGroup').append(newBtn);
    $('#addContactFormContainer').addClass('d-none');
    this.reset();
    $('#modalValidationError').text('');
  });

  // 3. Motor de búsqueda interactivo en tiempo real (Keyup - Lección 6)
  $('#searchContact').on('keyup', function() {
    var value = $(this).val().toLowerCase();
    $('#contactListGroup .contact-item').filter(function() {
      var matchName = $(this).attr('data-name').toLowerCase().indexOf(value) > -1;
      var matchAlias = $(this).attr('data-alias').toLowerCase().indexOf(value) > -1;
      $(this).toggle(matchName || matchAlias); // Oculta o muestra dinámicamente según la coincidencia
    });
  });

  // 4. Delegación de eventos para la selección táctil de destinatarios
  $(document).on('click', '.contact-item', function() {
    $('.contact-item').removeClass('active');
    $(this).addClass('active');
    
    var chosenName = $(this).attr('data-name');
    $('#selectedContactDisplay').val(chosenName);
    
    // Revelar el botón de envío solo cuando el destino esté completamente definido
    $('#sendMoneyBtn').removeClass('d-none');
  });

  // 5. Consumo de fondos y transacciones seguras
  $('#transferForm').submit(function(e) {
    e.preventDefault();
    var amount = parseFloat($('#sendAmount').val());
    var contact = $('#selectedContactDisplay').val();
    var currentBalance = parseFloat(localStorage.getItem('walletBalance')) || 60000;

    // Validación lógica de liquidez
    if (amount > currentBalance) {
      $('#confirmation-message').html('<div class="alert alert-danger"><i class="fas fa-times-circle mr-2"></i>Transacción declinada. Fondos insuficientes para procesar la operación.</div>');
      return;
    }

    // Débito financiero y persistencia de datos
    currentBalance -= amount;
    localStorage.setItem('walletBalance', currentBalance.toString());

    // Guardado unificado bajo la firma coherente de 'transferencia'
    var transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.unshift({ 
      tipo: 'transferencia', 
      monto: amount, 
      fecha: new Date().toLocaleString(), 
      detalle: 'Envío a ' + contact 
    });
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Mensaje confirmatorio final en pantalla
    $('#confirmation-message').html(
      '<div class="alert alert-success"><i class="fas fa-check-double mr-2"></i>Transferencia emitida con éxito a <strong>' + contact + '</strong> por $' + amount.toFixed(2) + '.</div>'
    );

    $('#sendAmount').val('');
    $('#selectedContactDisplay').val('');
    $('.contact-item').removeClass('active');
    $('#sendMoneyBtn').addClass('d-none');

    setTimeout(function() {
      window.location.href = 'menu.html';
    }, 2000);
  });
});