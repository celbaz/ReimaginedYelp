window.YelpClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // Initializing Map
    L.mapbox.accessToken = YelpClone.MapboxToken;
    YelpClone.places = new YelpClone.Collections.Restaurants();
    YelpClone.router = new YelpClone.Routers.Router({ $rootEl : $("#content") });
    Backbone.history.start();
    $.ajax({
      url: 'api/restaurants/location',
      type: "GET",
      dataType: 'json',
      success: function (data) {
        YelpClone.CurrentLocation = data;
      }
    });
  }
};
