YelpClone.Views.UserReviews = Backbone.View.extend({

  template: JST['users/reviews'],
  changeTemplate: JST['users/editreviews'],
  jkTemplate: JST['users/returnreview'],

  initialize: function (options){
    this.model = options.user;
    YelpClone.UserMap = this;
  },

  events: {
    'click .delete-rest': "deleteReview",
    'click .edit-clicked': "setForm",
    'click .edit-save-clicked': "saveReview",
    'click .cancel-edit': "cancelForm"
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
    var review = new YelpClone.Models.Review({id: data});
    var that = this;
    review.fetch({
      success: function () {
        review.destroy();
        that.model.fetch();
      }
    });
  },

  setForm: function (event) {
    var data = $(event.currentTarget).attr("data-id");
        data = parseInt(data);
    var $formArea = $(event.currentTarget).parent();
    var review = null;
    this.model.reviews().forEach( function (rev) {
      if (rev.id === data) {
        review = rev;
      }
    });
    var renderedContent = this.changeTemplate({
      review: review
    });
    $formArea.html(renderedContent);
  },

  cancelForm: function (event) {
    var data = $(event.currentTarget).attr("data-id");
        data = parseInt(data);
    var $formArea = $(event.currentTarget).parent();
    var review = null;
    this.model.reviews().forEach( function (rev) {
      if (rev.id === data) {
        review = rev;
      }
    });

    var renderedContent = this.jkTemplate({
      review: review
    });
    $formArea.html(renderedContent);
  },

  saveReview: function(event) {
    event.preventDefault();
    var id = $(event.currentTarget).attr("data-id");
    var formData = $(".edit-form"+ id).serializeJSON().review;
    var review = new YelpClone.Models.Review({id: id});
    var that = this;
    review.fetch({
      success: function () {
        review.set(formData);
        console.log(review);
          review.save({}, {
            success: function () { that.model.fetch(); }
          });
        }
    });
  },

  createMap: function () {
    var map = L.mapbox.map('reviews-map', 'examples.map-i86nkdio').setView([40.735031,  -73.990517], 12);
    var featureLayer = L.mapbox.featureLayer().addTo(map);
      var geoJSON = {
        type: "FeatureCollection",
        features: []
      };

      var reviews = this.model.reviews();
      if ( reviews.length > 0 ) {
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
  }
});
