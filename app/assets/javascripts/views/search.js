YelpClone.Views.Search = Backbone.CompositeView.extend({

  className: "group",
  template: JST['search/container'],
  renderTemplate: JST['search/results'],
  listTemplate  : JST['search/list'],

  events: {
    'click .modal-close': 'closeQuickView' ,
    'submit .create-review': 'createReview',

  },

  render: function () {
    var renderedContent = this.template();
    // console.log("hello")
    this.$el.html(renderedContent);
    var sidesearch = new YelpClone.Views.SearchForm();
    var mapview = new YelpClone.Views.Map({el: this.$("#map-show")});
    this.addSubview('#map-show', mapview);
    this.addSubview('#sidebar-info', sidesearch);
    YelpClone.router.$rootEl.addClass("maps");
    return this;
  },

  closeQuickView: function () {
    $('.cd-panel').removeClass("is-visible");
  },

  remove: function () {
    YelpClone.router.$rootEl.removeClass("maps");
    Backbone.CompositeView.prototype.remove.call(this);
  },

  createReview: function (event) {
    event.preventDefault();
    var $target = $(event.target);
    var review = $target.serializeJSON().review;
    console.log(review);

    if ( YelpClone.currentUser.isSignedIn() ) {

      review.user_id = YelpClone.currentUser.id;
      review.place_id = parseInt(review.place_id);
      review.rating = review.rating;
      console.log(review);
      var rev = new YelpClone.Models.Review().set(review);

      rev.save({}, {
        success: function () {
          console.log("Saved!");
          // use jquery to append value
        }
      });

    } else {
      $('.modal-signin a').trigger('click');
    }
  },

});
