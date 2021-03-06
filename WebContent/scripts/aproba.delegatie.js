var listOpririTest = [];
var json_parsed;
var rowid;

var init = 0;

var tipAng;

$(document).on('pageshow', '#aproba', function() {

	tipAng = $('#tipAng').text();
	afisDelegatiiAprob();

});

function showAprobDialog(delegatieId, tipAprobare) {

	$("#aprob .aprob-1").text("Confirmare");
	$("#aprob .aprob-2").text("Aprobati delegatia?");

	$.mobile.changePage("#aprob");

	$("#aprob .aprob-da").text("Da").unbind("click.aprob").on("click.aprob",
			function() {

				aprobaDelegatie(delegatieId, tipAprobare);
				$("#aprob").popup("close");

			});

}

function showRespingDialog(delegatieId) {

	$("#resping .resping-1").text("Confirmare");
	$("#resping .resping-2").text("Respingeti delegatia?");

	$("#resping .resping-da").text("Da").unbind("click.resping").on(
			"click.resping", function() {
				respingeDelegatie(delegatieId);
				$(this).off("click.resping");
			});

	$.mobile.changePage("#resping");
}

function aprobaDelegatie(delegatieId, tipAprobare) {

	// tipAprobare:
	// 0 - aprobare initiala
	// 1 - aprobare totala
	// 2 - aprobare partiala

	var kmResp = $('#' + delegatieId).find("#kmresp").val();

	if (kmResp == null)
		kmResp = 0;
	else {
		if (tipAprobare == 2) {
			if (!$.isNumeric(kmResp)) {

				alert('Atentie, valoare km aprobati invalida!');
				return;
			}

			if (kmResp <= 0) {

				alert('Atentie, pentru aprobarea partiala precizati numarul de km respinsi!');
				return;
			}
		}
	}

	if (tipAprobare == 1) {
		kmResp = 0;
	}

	var tipAng = $('#tipAng').text();
	var codAng = $('#codAng').text();

	$.mobile.loading('show');

	$.ajax({
		type : "POST",
		url : window.location.origin
				+ "/flota.service/delegatii/aprobaDelegatie",
		data : ({
			idDelegatie : delegatieId,
			tipAngajat : tipAng,
			kmRespinsi : kmResp,
			codAngajat : codAng,
			tipAprobare : tipAprobare
		}),
		cache : false,
		dataType : "text",
		success : onSuccess
	});

	function onSuccess() {
		showAlertAprob('Status', 'Delegatie aprobata');
		$.mobile.loading('hide');
		afisDelegatiiAprob();
	}

}

function showAlertAprob(tipAlert, mesajAlert) {
	$('#tipAlertAp').text(tipAlert);
	$('#textAlertAp').text(mesajAlert);
	$.mobile.changePage('#dialogAprobare');
}

function respingeDelegatie(delegatieId) {

	var tipAng = $('#tipAng').text();
	var codAng = $('#codAng').text();

	$.mobile.loading('show');

	$.ajax({
		type : "POST",
		url : window.location.origin
				+ "/flota.service/delegatii/respingeDelegatie",
		data : ({
			idDelegatie : delegatieId,
			tipAngajat : tipAng,
			codAngajat : codAng
		}),
		cache : false,
		dataType : "text",
		success : onSuccess
	});

	function onSuccess() {
		$.mobile.loading('hide');
		showAlertAprob('Status', 'Delegatie respinsa');
		afisDelegatiiAprob();
	}

}

function afisDelegatiiAprob() {

	$.mobile.loading('show');

	var tipAng = $('#tipAng').text();
	var unitLog = $('#unitLog').text();
	var depart = $('#codDepart').text();

	$.ajax({

		type : "GET",
		url : window.location.origin
				+ "/flota.service/delegatii/afisDelegatiiAprob",
		data : ({
			tipAngajat : tipAng,
			unitLog : unitLog,
			codDepart : depart
		}),
		cache : false,
		dataType : "text",
		success : onSuccess
	});

	function onSuccess(data) {

		json_parsed = $.parseJSON(data);
		$('#aprobList').empty();

		for (var u = 0; u < json_parsed.length; u++) {
			var delegatie = json_parsed[u];

			var str = '<li data-rowid = ' + delegatie.id + '>' + '<div id ='
					+ delegatie.id + '>' + adaugaDelegatieAprob(delegatie)
					+ '</div>' + '</li>';

			$('#aprobList').append(str).listview('refresh');

		}

		$.mobile.loading('hide');

	}

}

function setDelSelected(delegatieId) {

	document.getElementById("delid").value = delegatieId;

}

function adaugaDelegatieAprob(delegatie) {

	var content = '<div class="ui-corner-all custom-corners">';

	content += '<div class="ui-bar ui-bar-a">' + delegatie.numeAngajat + ' '
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
	content += '<div class="ui-block-a"  >Km alocati initial:</div>';
	content += '<div class="ui-block-b">' + delegatie.distantaCalculata
			+ '</div>';
	content += '</div>';

	if (delegatie.distantaEfectuata > 0) {

		content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
		content += '<div class="ui-block-a"  >Km recalculati:</div>';
		content += '<div class="ui-block-b">' + delegatie.distantaRecalculata
				+ '</div>';
		content += '</div>';

		content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
		content += '<div class="ui-block-a">Km realizati:</div>';
		content += '<div class="ui-block-b" id="kmEfectuati">'
				+ delegatie.distantaEfectuata + '</div>';
		content += '</div>';

		var kmNeaprobati = 0;

		if (delegatie.distantaRecalculata == 0) {
			if (delegatie.distantaEfectuata > delegatie.distantaCalculata)
				kmNeaprobati = delegatie.distantaEfectuata
						- delegatie.distantaCalculata;
		} else if (delegatie.distantaEfectuata > delegatie.distantaRecalculata)
			kmNeaprobati = delegatie.distantaEfectuata
					- delegatie.distantaRecalculata;

		content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
		content += '<div class="ui-block-a">Km respinsi:</div>';
		content += '<div class="ui-block-b"><input type="text" name="name" id="kmresp" value='
				+ kmNeaprobati + '>' + '</div>';
		content += '</div>';

		content += '<div style="margin:10px; position:relative"><b>'
				+ delegatie.msgAtentionare + '</b></div>';
		
		content += '<div class="ui-grid-b ui-responsive">';
		
		if (delegatie.weekend && tipAng != 'DZ') {
			content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
			content += '<div class="ui-block-a"  >Observatii</div>';
			content += '<div class="ui-block-b">Aceasta delegatie se aproba de catre Directorul de zona</div>';
			content += '</div>';

		}

		else {

			if (delegatie.weekend && tipAng == 'DZ') {
				content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
				content += '<div class="ui-block-a"  >Observatii</div>';
				content += '<div class="ui-block-b">Delegatia contine zile libere</div>';
				content += '</div>';
			}

			content += '<div class="ui-block-a" ><a href="#" class="ui-btn ui-corner-all" style="background: #66CDAA;" onclick="showAprobDialog('
					+ delegatie.id + ',1);">Aproba total</a></div>';

			content += '<div class="ui-block-b" ><a href="#" class="ui-btn ui-corner-all" style="background: #7CCD7C;" onclick="showAprobDialog('
					+ delegatie.id + ',2);">Aproba partial</a></div>';

			content += '<div class="ui-block-c" ><a href="#" class="ui-btn ui-corner-all" style="background: #EE8262; " onclick="showRespingDialog('
					+ delegatie.id + ');">Respinge</a></div></div>';
		}

	}

	else {
		
		if (delegatie.weekend && tipAng == 'DZ') {
			content += '<div class="ui-grid-b ui-responsive" style="margin:10px; position:relative">';
			content += '<div class="ui-block-a"  >Observatii</div>';
			content += '<div class="ui-block-b">Delegatia contine zile libere</div>';
			content += '</div>';
		}

		content += '<br><div class="ui-grid-a ui-responsive">';

		content += '<div class="ui-block-a" ><a href="#" class="ui-btn ui-corner-all" style="background: #66CDAA;" id="aprobaD" onclick="showAprobDialog('
				+ delegatie.id + ',0);">Aproba </a></div>';
		content += '<div class="ui-block-b" ><a href="#" class="ui-btn ui-corner-all" style="background: #EE8262; " onclick="showRespingDialog('
				+ delegatie.id + ');">Respinge</a></div></div>';
	}

	content += '<div  ><a href="#custDetails" class="ui-btn ui-corner-all" style="background: #87CEEB; " data-transition="slide" onclick="setDelSelected('
			+ delegatie.id + ');">Harta traseu</a></div>';

	content += '</div>';

	content += '</div>';

	content += '</div>';

	return content;

}
