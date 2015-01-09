YelpClone.Routers.Router = Backbone.Router.extend({
  initialize: function (options){
    this.$rootEl = options.$rootEl,
    this.$footerEl = options.$footerEl
  },

  routes: {
    '': "landingPage"
    // 'user/:id': userPage,
    // 'search/map': searchMap,
    // 'search/list': searchMap,
    // 'sentence' if time permits
  },

  landingPage: function () {
    console.log("Hello");
    var mainPageView = new YelpClone.Views.MainPageView({});
    this._swapView(mainPageView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
