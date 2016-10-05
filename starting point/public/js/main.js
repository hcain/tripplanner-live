initializeMap();


hotels.forEach(function(hotel){
	$('#hotel-choices').append("<option>" + hotel.name + "</option>")
})

restaurants.forEach(function(restaurant){
	$('#restaurant-choices').append("<option>" + restaurant.name + "</option>")
})

activities.forEach(function(activity){
	$('#activity-choices').append("<option>" + activity.name + "</option>")
})

$('.btn-primary').on('click', function(){
	if(this.id === 'hotel-plus-btn'){
		var hotelSelected = $("#hotel-choices option:selected").text();
		if (checkDoubles.prototype.loggedHotels.length) {
      checkDoubles.prototype.loggedHotels[0] = hotelSelected;
      $("#itinerary-hotel").html('<button id="hotel-remove-button" class="btn btn-xs btn-danger remove btn-circle">x</button> <span class="title">' + hotelSelected + "</span>");
  } else {
		  checkDoubles.prototype.loggedHotels.push(hotelSelected);
      $("#itinerary-hotel").append("<span class='title'>" + hotelSelected + "</span>");
    }
  findLocation(hotelSelected, 'hotel', hotels);
	} else if(this.id === 'restaurant-plus-btn'){
		var restaurantSelected = $("#restaurant-choices option:selected").text();
		checkDoubles("#itinerary-restaurant", restaurantSelected, checkDoubles.prototype.loggedRestaurants);
		checkDoubles.prototype.loggedRestaurants.push(restaurantSelected);
    findLocation(restaurantSelected, 'restaurant', restaurants) 
	} else if(this.id === "activity-plus-btn"){
		var activitySelected = $("#activity-choices option:selected").text();
		checkDoubles("#itinerary-activity", activitySelected, checkDoubles.prototype.loggedActivities);
		checkDoubles.prototype.loggedActivities.push(activitySelected);
    findLocation(activitySelected, 'activity', activities) 
	}
})

var checkDoubles = function(itinerary, option, database){
	var isDouble = false;
  var type = itinerary.slice(11);
	database.forEach(function(addedOption){
		if (addedOption == option) {
			console.log("You already added " + option + " to your itinerary!");
			isDouble = true;
			return;
		}
	});
	if (!isDouble) {
    if (database.length) {
      $(itinerary).append('<button id="' + type + '-remove-button" class="btn btn-xs btn-danger remove btn-circle">x</button> <span class="title">' + option + "</span>");
    } else  {
      $(itinerary).append('<span class="title">' + option + "</span>");
    }
  }
}

checkDoubles.prototype.loggedHotels = [];
checkDoubles.prototype.loggedRestaurants = [];
checkDoubles.prototype.loggedActivities = [];

var findLocation = function(name, type, database) {
  database.forEach(function(addedOption) {
    if (addedOption.name === name) {
      var coords = addedOption.place.location;
      drawMarker(type, coords);
      currentMap.setCenter(new google.maps.LatLng(coords[0], coords[1]));
    }
  })
}

$('.remove').on('click', function(){
  console.log($(this))
})



