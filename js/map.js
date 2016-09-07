 /**
	  * Google map api initializer
	  */
      function initMap() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: 45.175795, lng : 5.753475},
		  fullscreenControl: true,
		  scrollwheel : false,
		  zoomControlOptions : {scrollwheel:true},
		  styles: [
            {
              featureType: 'all',
              stylers: [
				  { "saturation": -50 },
				  { "lightness": 5 }
              ]
            },{
              featureType: 'road.arterial',
              elementType: 'geometry',
              stylers: [
                { hue: '#00ffee' },
                { saturation: 50 },
              ]
            },{
              featureType: 'poi.business',
              elementType: 'labels',
              stylers: [
                { visibility: 'off' }
              ]
            }
          ]
        });
        directionsDisplay.setMap(map);
		
		// markers *******************************************
		var markerHome = new google.maps.Marker({
			position: {lat: 45.186030, lng : 5.747947},
			map: map,
			label: 'M',
			title: 'Chez nous'
		});
		
		var markerNunes = new google.maps.Marker({
			position: {lat: 45.175795, lng : 5.753475},
			map: map,
			label: 'N',
			title: 'Casa Nunes'
		});
		
		var markerMorelli = new google.maps.Marker({
			position: {lat: 45.464522, lng : 6.123082},
			map: map,
			label: 'M',
			title: 'Casa Morelli'
		});
	
		// infos windows *******************************************
		var infowindowMorelli = new google.maps.InfoWindow({
			content: "Casa Morelli"
		  });
		markerMorelli.addListener('click', function() {
			infowindowMorelli.open(map, markerMorelli);
		});
		
  		var infowindowNunes = new google.maps.InfoWindow({
			content: "Casa Nunes"
		});
  		markerNunes.addListener('click', function() {
			infowindowNunes.open(map, markerNunes);
		});
		
  		var infowindowHome = new google.maps.InfoWindow({
			content: "Chez nous"
		});
  		markerHome.addListener('click', function() {
			infowindowHome.open(map, markerHome);
		});
		// Init *******************************************
		calculateAndDisplayRoute(directionsService, directionsDisplay);
      }
	  
	  /**
	   * Directions init
	   */
      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: {lat : 45.456704, lng : 6.116509},
          destination: {lat : 45.441006, lng : 6.120036},
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            console.log('Directions request failed due to ' + status);
          }
        });
      }