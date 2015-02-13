YelpClone.Views.UserReviews = Backbone.View.extend({

  template: JST['users/reviews'],

  initialize: function (options){
    this.model = options.user;
  },

  render: function () {
    var reviews = this.model.reviews();
    var renderedContent = this.template({
      reviews: reviews
    });
    return this;
  },

});