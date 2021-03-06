window.YelpClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    this.currentUser = new YelpClone.Models.CurrentUser();
    this.currentUser.fetch();
    this.sentenceQuery = "";

    // Initializing Map Token
    L.mapbox.accessToken = YelpClone.MapboxToken;
    YelpClone.places = new YelpClone.Collections.Restaurants();
    YelpClone.router = new YelpClone.Routers.Router({
       $rootEl : $("#content")
    });

    var navbar = new YelpClone.Views.NavBar({ el : $(".header") });
    navbar.render();

    Backbone.history.start();
    $.ajax({
      url: 'api/restaurants/location',
      type: "GET",
      dataType: 'json',
      success: function (data) {
        if(data.latitude === null){
          YelpClone.CurrentLocation = {latitude: 40.735031, longitude: -73.990517};
        } else {
          YelpClone.CurrentLocation = data;
        }
      }
    });
  }
};
