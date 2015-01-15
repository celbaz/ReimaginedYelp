YelpClone.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],
  userRestTemplate: JST['users/restaurants'],
  reviewTemplate: JST['users/reviews'],
  editTemplate: JST['users/edituser'],
  placeTemplate: JST['users/editplace'],

  initialize: function (){
    this.listenTo(this.model, 'sync', this.render)
  },

  render: function () {
    var renderedContent = this.template({
        user : this.model
    });
    this.$el.html(renderedContent);
    return this;
  },

  events: {
    'click .edit-user': 'editUser',
    'click .profile': "render",
    'click .profile-reviews': 'renderReviews',
    'click .profile-rest': 'renderRestaurants',
    'click .save-user': 'saveUser',
    "change #input-post-image": "fileInputChange",
    "click #addplace": 'renderEditRestaurant',
    'click .create-rest': 'saveRest'

  },

  saveUser: function(event) {
    event.preventDefault();
    var formData = $(".user-content").serializeJSON().user, that = this;
    this.model.set(formData);
    this.model.save({}, {
      success: function () {
       delete that.model._picture;
        Backbone.history.navigate("", {trigger: true});
      }
    });
  },

  saveRest: function () {
    event.preventDefault();
    var formData = $(".user-content").serializeJSON().place, that = this;
    var rest = new YelpClone.Models.Restaurant().set(formData);
    rest.save({}, {
      success: function () {
        Backbone.history.navigate("restaurants", {trigger: true});
      },
      failure: function (){
        console.log("Milk");
      }
    });
  },

  renderEditRestaurant: function () {
    var renderedContent = this.placeTemplate();
    $(".user-content").html(renderedContent);
  },

  editUser: function (event) {
    var renderedContent = this.editTemplate({
      user: this.model
    });
    $(".user-content").html(renderedContent);
  },

  renderReviews: function(){
    var reviews = this.model.reviews();
    var renderedContent = this.reviewTemplate({
      reviews: reviews
    });
    $(".user-content").html(renderedContent);
  },

  renderRestaurants: function (){
    var pla = this.model.restaurants();
    var renderedContent = this.userRestTemplate({
      places: pla
    });
    $(".user-content").html(renderedContent);
  },

  fileInputChange: function(event){

    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that._updatePreview(reader.result);
      that.model._image = reader.result;

      console.log(that.model);
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this._updatePreview("");
      delete this.model._image;

      console.log(this.model);
    }
  },

  _updatePreview: function(src){
    this.$el.find("#preview-post-image").attr("src", src);
  }

});
