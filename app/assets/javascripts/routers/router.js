YelpClone.Routers.Router = Backbone.Router.extend({
  initialize: function (options){
    this.$rootEl = options.$rootEl,
    this.$footerEl = options.$footerEl
  },

  routes: {
    '': "landingPage",
    'restaurants': "riPage"
    // 'user/:id': userPage,
    // 'search/map': searchMap,
    // 'search/list': searchMap,
    // 'sentence' if time permits
  },

  riPage: function () {
    // console.log("H")
    YelpClone.places.fetch();
    var riView = new YelpClone.Views.RestaurantIndex({
      collection: YelpClone.places
    });
    this._swapView(riView);
  },

  landingPage: function () {
    var mainPageView = new YelpClone.Views.MainPageView({});
    this._swapView(mainPageView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
