var listOpririTest = [];
var json_parsed;
var rowid;

$(document).on('pagecreate', '#afiseaza', function() {

	setDivsVisibility();
	initDateFields();

});

function book(title, author) {
	this.title = title;
	this.author = author;
}

function setDivsVisibility() {

	var tipAng = $('#tipAng').text();

	if (hasSubords(tipAng))
		$("#divTipDelegatie").show();
	else
		$("#divTipDelegatie").hide();

}

function TestObject(prop1, prop2) {
	this.prop1 = prop1;
	this.prop2 = prop2;

}





function afiseazaDelegatii() {
	var dStart = $('#dateStart').val();

	var dStop = $('#dateStop').val();

	var codAng = $('#codAng').text();
	var tipAng = $('#tipAng').text();
	var unitLog = $('#unitLog').text();
	var depart = $('#codDepart').text();
	
	

	
	
	var tipDel = $('input[name=radio-del]:checked').val();

	$.mobile.loading('show');
	$.ajax({
		type : "GET",
		url : window.location.origin
				+ "/flota.service/delegatii/afiseazaDelegatii",
		data : ({
			codAngajat : codAng,
			dataStart : dStart,
			dataStop : dStop,
			tipAngajat : tipAng,
			unitLog : unitLog,
			codDepart : depart,
			tipAfis : tipDel
		}),
		cache : false,
		dataType : "text",
		success : onSuccess
	});

	function onSuccess(data) {

		json_parsed = $.parseJSON(data);
		$('#delegatiiList').empty();

		for (var u = 0; u < json_parsed.length; u++) {
			var delegatie = json_parsed[u];

			var str = '<li data-rowid = ' + delegatie.id + '>' + '<div id ='
					+ delegatie.id + '>' + adaugaDelegatieAfis(delegatie)
					+ '</div>' + '</li>';

			$('#delegatiiList').append(str).listview('refresh');

		}

		$.mobile.loading('hide');

	}

}

function afisDelegatii() {
	afiseazaDelegatii();

}

function adaugaDelegatieAfis(delegatie) {

	var content = '<div class="ui-corner-all custom-corners">';

	content += '<div class="ui-bar ui-bar-a">' + delegatie.numeAngajat + '  '
			+ delegatie.id + "</div>";

	content += '<div class="ui-body ui-body-a">';

	content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
	content += '<div class="ui-block-a">Data plecare:</div>';
	content += '<div class="ui-block-b">' + delegatie.dataPlecare + '</div>';
	content += '</div>';

	content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
	content += '<div class="ui-block-a">Ora plecare:</div>';
	content += '<div class="ui-block-b">' + delegatie.oraPlecare + '</div>';
	content += '</div>';

	content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
	content += '<div class="ui-block-a">Data sosire:</div>';
	content += '<div class="ui-block-b">' + delegatie.dataSosire + '</div>';
	content += '</div>';

	content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
	content += '<div class="ui-block-a">Traseu:</div>';
	content += '<div class="ui-block-b">' + decodeOpriri(delegatie) + '</div>';
	content += '</div>';

	content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
	content += '<div class="ui-block-a">Km alocati:</div>';
	content += '<div class="ui-block-b">' + delegatie.distantaCalculata
			+ '</div>';
	content += '</div>';

	content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
	content += '<div class="ui-block-a">Km recalculati:</div>';
	content += '<div class="ui-block-b">' + delegatie.distantaRecalculata
			+ '</div>';
	content += '</div>';

	content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
	content += '<div class="ui-block-a">Km realizati:</div>';
	content += '<div class="ui-block-b">' + delegatie.distantaEfectuata
			+ '</div>';
	content += '</div>';

	content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
	content += '<div class="ui-block-a">Km respinsi:</div>';
	content += '<div class="ui-block-b">' + delegatie.distantaRespinsa
			+ '</div>';
	content += '</div>';

	content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
	content += '<div class="ui-block-a">Stare:</div>';

	var statusContent = '<table border="0" style="width:100%;" cellpadding="0" data-role="table"  data-mode="columntoggle" class="ui-responsive">';

	statusContent += '<tr><td style="width:80%;">'
			+ getStatusDelegatie(delegatie.statusCode) + '</td><td>'
			+ getStatusIcon(delegatie.statusCode) + '</td></tr>';

	statusContent += '</table>';

	content += '<div class="ui-block-b">' + statusContent + '</div>';
	content += '</div>';

	content += '</div>';

	content += '</div>';

	return content;
}

function getStatusIcon(statusDelegatie) {

	var statusIcon;

	switch (statusDelegatie) {
	case "-1":
		statusIcon = '<img src="../img/circle_yellow.png">';
		break;
	case "1":
		statusIcon = '<img src="../img/circle_blue.png">';
		break;
	case "2":
		statusIcon = '<img src="../img/circle_green.png">';
		break;
	case "6":
		statusIcon = '<img src="../img/circle_red.png">';
		break;
	default:
		statusIcon = ' ';

	}

	return statusIcon;

}

function initDateFields() {
	$("#dateStart").datepicker({
		dateFormat : "dd-mm-yy",
		minDate:'-90d'
	});

	$("#dateStop").datepicker({
		dateFormat : "dd-mm-yy"
	});

	var firstDate = new Date();
	var lastDate = new Date();

	var daysToAdd = 0;

	firstDate.setDate(1);
	lastDate.setDate(lastDate.getDate() + daysToAdd);
	$("#dateStart").datepicker("setDate", firstDate);
	$("#dateStop").datepicker("setDate", lastDate);
}

function getStatusDelegatie(codStatus) {
	var strStatus = 'Nedefinit';

	switch (codStatus) {
	case "-1":
		strStatus = " <b>Trimisa spre aprobare</b>"
		break;
	case "1":
		strStatus = "  <b>Aprobata initial</b>"
		break;
	case "2":
		strStatus = "  <b>Aprobata final</b>"
		break;
	case "6":
		strStatus = "  <b>Respinsa</b>"
		break;

	}

	return strStatus;

}
