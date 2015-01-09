window.YelpClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    YelpClone.places = new YelpClone.Collections.Restaurants();
    new YelpClone.Routers.Router({
      $rootEl : $("#content"),
      $footerEl : $("#footer")
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  YelpClone.initialize();
});
