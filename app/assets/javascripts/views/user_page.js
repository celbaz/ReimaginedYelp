YelpClone.Views.UserComposite = Backbone.CompositeView.extend({

  className: "group",
  template: JST['users/container'],


  initialize: function (){
    this.listenTo(this.model, 'sync', this.render)
  },

  events: {
    'click .modal-close': 'closeQuickView' ,
    'submit .create-review': 'createReview',

  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    var sidebar = new YelpClone.Views.UserMenu( {user: this.model} );
    var profileView = new YelpClone.Views.UserProfile( {user: this.model} );
    this.addSubview('.user-menu', sidebar);
    this.addSubview('.user-content', profileView);
    return this;
  },

});
