
$(document).on("keydown", ".input-money", function (e) {
    if ($.inArray(e.keyCode, [8, 9, 13, 27, 46, 110, 190, 109, 189]) !== -1 || ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true)) || (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }

    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$(document).on("keydown", ".input-entero,.input-entero-left", function (e) {
    if ($.inArray(e.keyCode, [8, 9, 13, 27, 46, 109, 189]) !== -1 || ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true)) || (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }

    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});


$(document).on("keyup", ".input-money,.input-entero", function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190, 16]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }

    var value = this.value.split(',').join('').split('.');

    value[0] = value[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    this.value = value.join('.');
});


$(document).on("click", ".input-group.date > .input-group-addon", function () {
    $(this).prev().focus();
});

function number_format(amount, decimals) {

    amount += ''; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

    decimals = decimals || 0; // por si la variable no fue fue pasada

    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0)
        return parseFloat(0).toFixed(decimals);

    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = '' + amount.toFixed(decimals);

    var amount_parts = amount.split('.'),
        regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0]))
        amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');

    return amount_parts.join('.');
}


function formatLocalNumber(number, decimals) {
    var d = Number(number).toLocaleString('es-PE', { minimumFractionDigits: decimals });
    return d;
}

function compareDate(fechamenor, fechamayor) {
    var dtCh = "/";
    var minYear = 1900;
    var maxYear = 2100;

    var valor = 0

    var pos1 = fechamenor.indexOf(dtCh)
    var pos2 = fechamenor.indexOf(dtCh, pos1 + 1)
    var strDayMe = fechamenor.substring(0, pos1)
    var strMonthMe = fechamenor.substring(pos1 + 1, pos2)
    var strYearMe = fechamenor.substring(pos2 + 1)

    var pos3 = fechamayor.indexOf(dtCh)
    var pos4 = fechamayor.indexOf(dtCh, pos3 + 1)
    var strDayMa = fechamayor.substring(0, pos3)
    var strMonthMa = fechamayor.substring(pos3 + 1, pos4)
    var strYearMa = fechamayor.substring(pos4 + 1)

    var fecMenor = strYearMe + strMonthMe + strDayMe
    var fecMayor = strYearMa + strMonthMa + strDayMa

    if (fecMenor == fecMayor) {
        valor = 0
    } else {
        if (fecMenor < fecMayor) {
            valor = 1
        } else {
            valor = -1
        }
    }
    return valor
}

function parseFecha(strfecha) {
    var dtCh = "/";
    var pos1 = strfecha.indexOf(dtCh)
    var pos2 = strfecha.indexOf(dtCh, pos1 + 1)
    var strDayMe = strfecha.substring(0, pos1)
    var strMonthMe = strfecha.substring(pos1 + 1, pos2)
    var strYearMe = strfecha.substring(pos2 + 1)

    return new Date(strYearMe, parseInt(strMonthMe) - 1, parseInt(strDayMe));
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function focus($element) {
    $element.focus();
}

String.prototype.initCap = function () {
    return this.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
        return m.toUpperCase();
    });
}