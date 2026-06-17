/**
 * Renderizado de Datos, Filtros Avanzados y Formateo Semántico 
 */
$(document).ready(function() {
  
  // Base de datos compartida y mock de contingencia inicializado bajo el nuevo esquema
  var listaTransacciones = JSON.parse(localStorage.getItem('transactions')) || [
    { tipo: 'depósito', monto: 15000, fecha: '1/6/2026, 14:22:10' },
    { tipo: 'transferencia', monto: 4500, fecha: '3/6/2026, 18:05:14', detalle: 'Envío a Pedro Pérez' }
  ];

  // Traduce el identificador técnico por una etiqueta legible para el cliente final
  function getTipoTransaccion(tipo) {
    if (tipo === 'depósito') {
      return 'Depósito Realizado';
    } else if (tipo === 'transferencia') {
      return 'Transferencia Enviada';
    }
    return tipo;
  }

  // Función principal de filtrado e inyección de nodos en el DOM 
  function mostrarUltimosMovimientos(filtro) {
    var $tbody = $('#transactionsBody');
    $tbody.empty(); // Limpieza del contenedor para evitar duplicaciones

    var listaFiltrada = listaTransacciones.filter(function(t) {
      if (filtro === 'todos') return true;
      return t.tipo === filtro;
    });

    // Manejo de excepciones visuales si no hay datos
    if (listaFiltrada.length === 0) {
      $tbody.append('<tr><td colspan="3" class="text-center text-muted font-italic">No se registran operaciones históricas bajo esta categoría.</td></tr>');
      return;
    }

    // Iteración eficiente con estructuras jQuery
    $.each(listaFiltrada, function(index, t) {
      var operacionTexto = getTipoTransaccion(t.tipo) + (t.detalle ? ' (' + t.detalle + ')' : '');
      // Asignación de colores semánticos condicionales (Verde para ingresos, Rojo para egresos)
      var colorClase = t.tipo === 'depósito' ? 'text-success' : 'text-danger';
      
      var fila = '<tr>' +
        '<td>' + operacionTexto + '</td>' +
        '<td class="' + colorClase + '"><strong>$' + t.monto.toFixed(2) + '</strong></td>' +
        '<td class="text-secondary" style="font-size: 13.5px;"><i class="far fa-clock mr-1"></i>' + t.fecha + '</td>' +
        '</tr>';
        
      $tbody.append(fila);
    });
  }

  // Evento Change asociado al selector de filtros de Bootstrap
  $('#filterType').change(function() {
    var filtroSeleccionado = $(this).val();
    mostrarUltimosMovimientos(filtroSeleccionado);
  });

  // Ejecución del render inicial por defecto
  mostrarUltimosMovimientos('todos');
});
