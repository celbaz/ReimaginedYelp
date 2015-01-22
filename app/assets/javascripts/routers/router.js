YelpClone.Routers.Router = Backbone.Router.extend({
  initialize: function (options){
    this.$rootEl = options.$rootEl;
    this.$navEl = options.$navEl;
  },

  // where do i render the nav
  routes: {
    '': 'landingPage',
    'restaurants': 'restPage',
    'users/:id': 'userPage',
    'search': 'searchPage'
    // 'search/list': searchMap,
    // 'sentence' if time permits
  },

  landingPage: function () {
    var mainPageView = new YelpClone.Views.MainPageView({});
    this._swapView(mainPageView);
  },

  restPage: function () {
    YelpClone.places.fetch();
    var riView = new YelpClone.Views.RestaurantIndex({
      collection: YelpClone.places
    });
    this._swapView(riView);
  },

  userPage: function (id) {
    var user = new YelpClone.Models.User({id: id});
    user.fetch();
    var viewShow =  new YelpClone.Views.UserShow({
      model : user
    });
    this._swapView(viewShow);
  },

  searchPage: function () {
    var searchView = new YelpClone.Views.Search();
    this._swapView(searchView);
    this.map.createMap();
    this.map.locates();
    },


  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

  _requireSignedIn: function(callback){
    if (!BackboneAuthDemo.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.signIn(callback);
      return false;
    }

    return true;
  },

  _requireSignedOut: function(callback){
    if (BackboneAuthDemo.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }

    return true;
  },

  _goHome: function(){
    Backbone.history.navigate("", { trigger: true });
  },


});
