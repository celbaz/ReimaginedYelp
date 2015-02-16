YelpClone.Views.UserReviews = Backbone.View.extend({

  template: JST['users/reviews'],

  initialize: function (options){
    this.model = options.user;
    YelpClone.UserMap = this;
  },

  events: {
    'click .delete-rest': "deleteReview",
    'click .res-edit': "SetForm",
    'click .save-review': "SaveReview"
  },

  render: function () {
    var reviews = this.model.reviews();
    var renderedContent = this.template({
      reviews: reviews,
      userId: parseInt(this.model.id),
      mappy: this.map
    });

    this.$el.html(renderedContent);
    return this;
  },

  deleteReview: function (event) {
    event.preventDefault();
    var data = $(event.currentTarget).attr("data-id");
    console.log(data);
    var review = new YelpClone.Models.Review({id: data});
    var that = this;
    review.fetch({
      success: function () {
        review.destroy();
        that.model.fetch();
      }
    });
  },

  createMap: function () {
    var map = L.mapbox.map('reviews-map', 'examples.map-i86nkdio').setView([40, -74.50], 9);
    var featureLayer = L.mapbox.featureLayer().addTo(map);
      var geoJSON = {
        type: "FeatureCollection",
        features: []
      };

      var reviews = this.model.reviews();
      reviews.forEach( function (place) {
        geoJSON.features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
            place.escape("longitude"),
            place.escape("latitude")
            ]
          },
          properties: {
            title: place.escape("restaurant"),
            'marker-size': 'large',
            'marker-color': '#e67e22',
            'marker-symbol': 'restaurant'
          }
        });
      });
      featureLayer.setGeoJSON(geoJSON);
      map.fitBounds(featureLayer.getBounds());
  }

});
