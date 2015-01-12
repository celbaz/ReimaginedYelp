YelpClone.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],
  userRestTemplate: JST['users/restaurants'],
  reviewTemplate: JST['users/reviews'],

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
  },

  editUser: function (event) {
    console.log('Hello');
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
