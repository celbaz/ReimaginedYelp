YelpClone.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],
  userRestTemplate: JST['users/restaurants'],
  reviewTemplate: JST['users/reviews'],
  editTemplate: JST['users/edit'],

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
    'click .save-user': 'saveUser'
  },

  saveUser: function(event) {
    event.preventDefault();
    var formData = $(".user-content").serializeJSON(), that = this;
    this.model.set(formData);
    this.model.save({}, {
      success: function () {
        // that.collection.add(that.model, {merge: true});
        Backbone.history.back();
      }
    });
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
  }



});
