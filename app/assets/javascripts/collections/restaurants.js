YelpClone.Collections.Restaurants = Backbone.Collection.extend({
  url: "api/restaurants",
  model: YelpClone.Models.Restaurant,

  getOrFetch: function (id) {
    var place = this.get(id),
    restaurants = this;
    if(!place) {
      place = new YelpClone.Models.Restaurant({ id: id });
      place.fetch({
        success: function () {
          restaurants.add(place);
        },
      });
    } else {
      place.fetch();
    }
    return place;
  }
});
