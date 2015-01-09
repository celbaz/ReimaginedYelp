window.YelpClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log('Hello from Backbone!');
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
