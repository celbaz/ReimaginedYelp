YelpClone.Views.UserRestaurants = Backbone.View.extend({

  template: JST['users/restaurants'],
  placeTemplate: JST['users/editplace'],

  initialize: function (options){
    this.model = options.user;
  },

  events: {
    "click #addplace": 'createRest',
    'click .create-rest': 'saveRest',
    'click .delete-rest': 'deleteRest',
    'click .edit-clicked': 'editRest'
  },

  render: function () {
    var place = this.model.restaurants();
    var renderedContent = this.template({
      places: place,
      currentUser: YelpClone.currentUser.id,
      userId: parseInt(this.model.id)
    });

    this.$el.html(renderedContent);
    return this;
  },


  deleteRest: function (event) {
    event.preventDefault();
    var data = $(event.currentTarget).attr("data-id");
    var place = new YelpClone.Models.Restaurant({id: data});
    var that = this;
    place.fetch({
      success: function () {
        place.destroy();
        that.model.fetch();
      }
    });
  },

  editRest: function (event) {
    event.preventDefault();
    var data = $(event.currentTarget).attr("data-id");
    var place = new YelpClone.Models.Restaurant({id: data});
    var that = this;
    place.fetch({
      success: function () {
        var renderedContent = that.placeTemplate({rest: place});
        that.$el.html(renderedContent);
      }
    });

  },

  saveRest: function () {
    event.preventDefault();
    var formData = $(".user-content").serializeJSON().place;
    formData.cuisine = formData.cuisine.toUpperCase();
    var data = $(event.target).attr("data-id"), that = this;
    if (data === "") {

      var rest = new YelpClone.Models.Restaurant().set(formData);
      console.log(rest)
      rest.save({}, {
        success: function () {
          that.model.fetch();
        }
      });
    } else {
      var place = new YelpClone.Models.Restaurant({id: data});

      place.fetch({
        success: function () {
          place.set(formData);
          place.save({}, {
            success: function () {
              that.model.fetch();
            }
          });
        }
      });
    }
  },

  createRest: function () {
    var place = new YelpClone.Models.Restaurant();
    var renderedContent = this.placeTemplate({rest: place});
    this.$el.html(renderedContent);
    return this;
  }

});
