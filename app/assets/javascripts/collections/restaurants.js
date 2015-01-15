YelpClone.Collections.Restaurants = Backbone.Collection.extend({
  url: "api/restaurants",
  model: YelpClone.Models.Restaurant,

  parse: function (resp) {
    return resp.results;
  }
});
