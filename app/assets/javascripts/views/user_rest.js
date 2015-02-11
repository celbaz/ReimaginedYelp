YelpClone.Views.UserRestaurants = Backbone.View.extend({

  template: JST['users/restaurants'],
  placeTemplate: JST['users/editplace'],

  initialize: function (options){
    this.model = options.user;
  },

  events: {
    "click #addplace": 'renderEditRestaurant',
    'click .create-rest': 'saveRest',
    'click .delete-rest': 'deleteRest'
  },

  render: function () {
    var place = this.model.restaurants();
    var renderedContent = this.template({
      places: place
    });
    this.$el.html(renderedContent);
    return this;
  },


  deleteRest: function (event) {
    event.preventDefault();
    var data = $(event.target).attr("data-id");
    var user = new YelpClone.Models.Restaurant({id: data});
    user.fetch();
    user.destroy();
  },

  saveRest: function () {
    event.preventDefault();
    var formData = $(".user-content").serializeJSON().place, that = this;
    formData.cuisine = formData.cuisine.toUpperCase();
    var rest = new YelpClone.Models.Restaurant().set(formData);
    rest.save({}, {
      success: function () {
        Backbone.history.navigate("", {trigger: true});
      }
    });
  },

  renderEditRestaurant: function () {
    var renderedContent = this.placeTemplate();
    $(".user-content").html(renderedContent);
  },


});
