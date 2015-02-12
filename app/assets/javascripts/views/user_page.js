YelpClone.Views.UserComposite = Backbone.CompositeView.extend({

  className: "group",
  template: JST['users/container'],


  initialize: function (){
    this.listenTo(this.model, 'sync change', this.render);
    this.formerView = null;
  },

  events: {
    'click .profile': "render",
    'click .profile-reviews': 'renderReviews',
    'click .profile-rest': 'renderRestaurants',
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    var sidebar = new YelpClone.Views.UserMenu( {user: this.model} );
    var profileView = new YelpClone.Views.UserProfile( {user: this.model} );
    this.formerView = profileView;
    this.addSubview('.user-menu', sidebar);
    this.addSubview('.user-content', profileView);
    return this;

  },

  renderReviews: function () {
    var reviewsView = new YelpClone.Views.UserReviews( {user: this.model} );
    this.removeSubview('.user-content', this.formerView);
    this.formerView = reviewsView;
    this.addSubview('.user-content', reviewsView);
    return this;
  },

  renderRestaurants: function () {
    var restView = new YelpClone.Views.UserRestaurants( {user: this.model} );
    this.removeSubview('.user-content', this.formerView );
    this.formerView = restView;
    this.addSubview('.user-content', restView);
    return this;
  }
});
