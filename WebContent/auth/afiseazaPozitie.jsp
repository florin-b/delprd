<!DOCTYPE html>
<html>
<head>
<title>DELEGATII</title>



<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="viewport" content="width=device-width, initial-scale=1">


<link rel="stylesheet"
	href="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css">
<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>

<link rel="stylesheet" type="text/css"
	href="../css/markers/OneMarkerStyle.css">
<link rel="stylesheet" type="text/css"
	href="../css/markers/MarkerLabelStyle.css">



<script src="../scripts/helpers/helper.adrese.js"></script>

<link rel="stylesheet"
	href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
<script src="//code.jquery.com/jquery-1.12.4.js"></script>
<script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>


<script
	src="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>


<script src="../scripts/helpers/helper.angajat.js"></script>




</head>
<body>


	<div data-role="page" id="pozitie" data-theme="d" data-url="">


		<div data-role="panel" data-display="overlay" data-position="left"
			id="left-panel" data-theme="a">
			<ul data-role="listview">
				<jsp:include page="navbar.jsp">
					<jsp:param name="tipuser" value="${sessionScope.user.tipAng }" />
					<jsp:param name="numeuser" value="${sessionScope.user.numeAng }" />
				</jsp:include>
			</ul>
		</div>
		<div data-role="header" data-theme="a">
			<h1>Afiseaza pozitie</h1>
			<a href="#left-panel" data-theme="d" data-icon="arrow-r"
				data-iconpos="notext" data-shadow="false" data-iconshadow="false"
				class="ui-icon-nodisc">Meniu</a>
		</div>
		<!-- /header -->
		<div data-role="content" id="pozitieContent">

			<div class="ui-corner-all custom-corners">

				<div class="ui-bar ui-bar-a">Criterii</div>

				<div class="ui-body ui-body-a">

					<div class="ui-grid-a ui-responsive">

						<div class="ui-block-a">Categorie</div>

						<div class="ui-block-b">
							<input type='checkbox' name='toateCateg' id='toateCateg'>
							<label for='toateCateg'>Toate categoriile</label>
						</div>

					</div>

					<div class="ui-field-contain">
						<ul data-role="listview" id="listCategorii" data-inset="true"
							style="height: 250px; overflow: auto;">

						</ul>

					</div>

				</div>



				<div class="ui-body ui-body-a">

					<div class="ui-grid-a ui-responsive">

						<div class="ui-block-a">Angajat</div>

						<div class="ui-block-b">
							<input type='checkbox' name='totiAngajatii' id='totiAngajatii'>
							<label for='totiAngajatii'>Toti angajatii</label>
						</div>

					</div>

					<div class="ui-field-contain">
						<ul data-role="listview" id="listAngajati" data-inset="true"
							style="height: 250px; overflow: auto;">

						</ul>

					</div>



				</div>

				<div class="ui-body ui-body-a">
					<a href="#" class="ui-btn ui-corner-all" onclick="afisPozitie();">Afiseaza</a>
				</div>



			</div>



			<script src="../scripts/afiseaza.pozitie.js"></script>


			<br>

			<div data-role="content" id="div_traseu">
				<div id="map_pozitie" style="height: 500px">

					<script
						src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBacSk9khZt7CGoqPe9UZFJGQAjWymAmBg'></script>

					<script src='../scripts/helpers/markerwithlabel.js'></script>
					<script type="text/javascript" src="../scripts/pozitie.maps.js"></script>

				</div>

			</div>



		</div>




	</div>




	<div id="codAng" style="visibility: hidden">${sessionScope.user.cod}</div>
	<div id="tipAng" style="visibility: hidden">${sessionScope.user.tipAng}</div>
	<div id="unitLog" style="visibility: hidden">${sessionScope.user.unitLog}</div>
	<div id="codDepart" style="visibility: hidden">${sessionScope.user.codDepart}</div>



</body>
</html>
