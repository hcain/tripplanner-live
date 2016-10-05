hotels.forEach(function(hotel){
	$('#hotel-choices').append("<option>" + hotel.name + "</option>")
})

restaurants.forEach(function(restaurant){
	$('#restaurant-choices').append("<option>" + restaurant.name + "</option>")
})

activities.forEach(function(activity){
	$('#activity-choices').append("<option>" + activity.name + "</option>")
})

console.log('./map')

$('.btn').on('click', function(){
	if(this.id === 'hotel-plus-btn'){
		var hotel = $("#hotel-choices option:selected").text();
		checkDoubles("#itinerary-hotel", hotel, checkDoubles.prototype.loggedHotels);
		checkDoubles.prototype.loggedHotels.push(hotel);
		console.log($(hotel));
	} else if(this.id === 'restaurant-plus-btn'){
		var restaurant = $("#restaurant-choices option:selected").text();
		checkDoubles("#itinerary-restaurant", restaurant, checkDoubles.prototype.loggedRestaurants);
		checkDoubles.prototype.loggedRestaurants.push(restaurant);
	} else if(this.id === "activity-plus-btn"){
		var activity = $("#activity-choices option:selected").text();
		checkDoubles("#itinerary-activity", activity, checkDoubles.prototype.loggedActivities);
		checkDoubles.prototype.loggedActivities.push(activity);
	}
})

var checkDoubles = function(itinerary, option, database){
	var isDouble = false;
	database.forEach(function(addedOption){
		if (addedOption == option) {
			console.log("You already added " + option + " to your itinerary!");
			isDouble = true;
			return;
		} 
	}); 
	if (!isDouble) $(itinerary).append("<span class='title'>" + option + "</span>");
}

checkDoubles.prototype.loggedHotels = [];
checkDoubles.prototype.loggedRestaurants = [];
checkDoubles.prototype.loggedActivities = [];

function initializeMap (){

  var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  var styleArr = [{
    featureType: 'landscape',
    stylers: [{ saturation: -100 }, { lightness: 60 }]
  }, {
    featureType: 'road.local',
    stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
  }, {
    featureType: 'transit',
    stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
  }, {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'water',
    stylers: [{ visibility: 'on' }, { lightness: 30 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
  }];

  var mapCanvas = document.getElementById('map-canvas');

  var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);


 var currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  function drawMarker (type, coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    marker.setMap(currentMap);
  }
}


