/*!
Anuket gmaps module
Author: Jorge Brunal
Version: 2.0.2
*/
var Anuket = (function() {
	'use strict';
	var fn = {};
	var AnuketMap= null;

	var cities = [{
		"city": "Bogota",
		"lat": 4.7030696,
		"lng": -74.0702179
		}, {
			"city": "Cali",
			"lat": 3.4051333,
			"lng": -76.5219162
		}, {
			"city": "Pereira",
			"lat": 4.8090169,
			"lng": -75.69318
	}];

	var latlong = {};
	var theZoom = 12;
	var actualZoom = theZoom;
	var configLayers = null;

	var markers;

	function mapPos(latlong) {
		console.log('get mapPos', latlong);
		var currPos = {};
		GMaps.geolocate({
			success: function(position) {
				console.log('Geolocation success: ', currPos, position, latlong);
				AnuketMap.removeMarkers();
				if (typeof latlong === "object") {
					if ((latlong.lat === undefined) || (latlong.lng === undefined)) {
						var pos = position.coords;
						currPos.lat = pos.latitude;
						currPos.lng = pos.longitude;
						console.log('Geolocation position: ', currPos);
					} else {
						currPos = latlong;
						console.log('Geolocation latlong: ', latlong, currPos);
					}
				}
				AnuketMap.setCenter(currPos.lat, currPos.lng);
				addMarker(currPos);
			},
			error: function(error) {
				console.log('Geolocation failed: ' + error.message);
			},
			not_supported: function() {
				console.log("Your browser does not support geolocation");
			},
			always: function() {
				console.log("activando geolocation en", currPos);
			}
		});
	} //mapPos

	function geocodePosition(pos) {
		console.log('geocodePosition');
		GMaps.geocode({
			latLng: pos
		}, function(responses) {
			if (responses && responses.length > 0) {
				console.log('listo', responses[0].formatted_address);
			} else {
				console.log('Cannot determine address at this location.');
			}
		});
	}

	function streetView(coords) {
		panorama = GMaps.createPanorama({
			el: '#gmaps',
			lat: coords.lat,
			lng: coords.ng
		});
	} //streetView

	function showLayer(layer) {
		//layer.setMap(AnuketMap)
	} //showLayer

	fn.setZoom= function (zoom) {
		return AnuketMap.setZoom(zoom);
	}

	fn.getZoom= function (zoom) {
		return AnuketMap.getZoom();
	}

	fn.getObjectMap= function (zoom) {
		return AnuketMap;
	}

	function hideLayer(layer) {
		//layer.setMap(null)
		AnuketMap.removeLayer(layer)
	} //hideLayer

	function showAll() {
		for (key in fLayers) {
			fLayers[key].setMap(AnuketMap);
		}
	} //showAll

	function hideAll() {
		for (key in fLayers) {
			//fLayers[key].setMap(null)
			console.log('capa', key)
				//AnuketMap.removeLayer(key);
			AnuketMap.removeLayer(fLayers[key]);
		}
	} //hideAll

	fn.addMarker= function(latlong, drag, container) {
		console.log('adding marker', latlong);
		markers = AnuketMap.addMarker({
			lat: latlong.lat,
			lng: latlong.lng,
			title: 'Posicion Actual',
			draggable: drag || false,
			infoWindow: {
				content: '<p>Direccion actual:<br><strong>'+
							latlong.lat+', '+latlong.lng+
							'</strong></p>'
			},
			click: function(e) {
				console.log('You clicked here...', e);
			}
		});
		if (drag == true) {
			console.log('get dragend');
			setTimeout(function() {
				google.maps.event.addListener(markers, 'dragend', function() {
					var pos = {};
					var getPosition = markers.getPosition();
					pos.lat = getPosition.lat();
					pos.lng = getPosition.lng();
					console.log('pos', pos);
					localStorage.setItem('pos', JSON.stringify(pos));
					console.log('container', container);
					$(container).html('<strong>Coordenadas: ' + pos.lat + ', ' + pos.lng + '</strong>');
				});
			}, 500);
		}
	} //addMarker

	fn.getConfigLayers = function(data) {
		console.log('getConfigLayers in', data);
		var vm = {};
		$.each(data, function(index, value) {
			var newLayer = {
				id: value.id,
				name: value.name,
				layer: value.layer,
				query: value.query,
				style: value.style,
				fields: value.fields
			}
			vm[value.name] = newLayer;
		});

		Anuket.configLayers = vm;
		console.log('configLayers:', vm);
	};

	fn.getCurrentPosition= function(){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				latlong.lat = position.coords.latitude;
				latlong.lng = position.coords.longitude;
				/*var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};*/

				fn.addMarker(latlong, false, null);
				AnuketMap.setCenter(latlong.lat, latlong.lng);
			}, function() {
				Materialize.toast('Ocurrio un error al geolocalizar la app', 2500);
			});
		} else {
			// Browser doesn't support Geolocation
			Materialize.toast('SU navegador no soporta la Geolocalizacion', 2500);
		}
	};

	fn.run= function(_pos) {
		console.log('Anuket Run');
		if (_pos != null) {
			if ((_pos.lat != null) && (_pos.lat != null)) {
				latlong.lat = _pos.lat;
				latlong.lng = _pos.lng;
			}
		} else {
			latlong.lat = cities[1].lat;
			latlong.lng = cities[1].lng;
		}
	};

	fn.loadMap= function(_divMap) {
		console.log('loadMap MAP');
		AnuketMap = new GMaps({
			el: _divMap,
			lat: latlong.lat,
			lng: latlong.lng,
			zoom: theZoom,
			zoomControl: false,
			streetViewControl:false,
			panControl: true,
			overviewMapControl: false,
			mapTypeControl: false,
		});
		fn.addMarker(latlong, false, null);
	};

	fn.loadGeo= function(Coords) {
		console.log('fn loadGeo');
		//var map = new GMaps({
		AnuketMap = new GMaps({
			div: '#markersGmap',
			lat: Coords.lat,
			lng: Coords.lng,
		});
	};//loadGeo

	fn.baseMap= function(centerMap) {
		AnuketMap = new GMaps({
			div: '#markersGmap',
			lat: centerMap.lat,
			lng: centerMap.lng,
		});
	};//baseMap

	fn.removeMarkers= function() {
		if(AnuketMap){
			AnuketMap.removeMarkers();
		}
	};

	fn.geoRef= function(setAddress) {
		AnuketMap.removeMarkers();
		GMaps.geocode({
			address: setAddress,
			callback: function(results, status) {
				if (status == 'OK') {
					console.log('geo ref obtenida');
					var latlng = results[0].geometry.location;
					AnuketMap.setCenter(latlng.lat(), latlng.lng());
					latlong.lat = latlng.lat();
					latlong.lng = latlng.lng();

					localStorage.setItem('pos', JSON.stringify(latlng));

					$('#markerPos').html('<strong>Coordenadas: ' + latlong.lat + ', ' + latlong.lng + '</strong>');
					fn.addMarker(latlong, true, '#markerPos');
				} else {
					console.log('geo ref FAIL');
					Materialize.toast('No se pudo georeferenciar la dirección.', 2500);
					//toastr["warning"]("no se pudo georeferenciar la dirección.", "Advertencia")
				}
			}
		});
	};//geoRef

	fn.drawRoute= function(origin, destiny) {
		console.log('drawRoute', origin, destiny);
		var route = AnuketMap.drawRoute({
			origin: origin,
			destination: destiny,
			travelMode: 'driving',
			strokeColor: '#0C41AE',
			strokeOpacity: 0.8,
			strokeWeight: 7
		});
		console.log('route', route);
	};//drawRoute

	console.log('GMAPS RUN');

	return fn;

}()); //Anuket
