YelpClone.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  restaurants: function (){
    if(!this._restaurants) {
      this._restaurants = new YelpClone.Collections.Restaurants([], {user: this});
    }
    return this._restaurants;
  },

  reviews: function () {
    if(!this._reviews){
      this._reviews = new YelpClone.Collections.Reviews([], {user: this});
    }
    return this._reviews;
  },


  parse: function (resp) {
    if(resp.restaurants){
      this.restaurants().set(resp.restaurants, {parse: true});
      delete resp.restaurants;
    }

    if(resp.reviews){
      this.reviews().set(resp.reviews, {parse: true});
      delete resp.reviews;
    }

    return resp;
  },

  toJSON: function(){
    // We want proper namespacing of our attributes in Rails.
    var json = {user: _.clone(this.attributes)};

    if (this._image) {
      json.user.image = this._image;
    }

    return json;
  }


});


YelpClone.Models.CurrentUser = YelpClone.Models.User.extend({
  url: "/api/session",

  initialize: function(options){
    this.listenTo(this, "change", this.fireSessionEvent);
  },

  isSignedIn: function() {
    return !this.isNew();
  },

  signIn: function(options){
    var model = this;
    var credentials = {
      "user[email]": options.email,
      "user[password]": options.password
    };

    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function(data){
        model.set(data);
        options.success && options.success();
      },
      error: function(){
        options.error && options.error();
      }
    });
  },

  signOut: function(options){
    var model = this;

    $.ajax({
      url: this.url,
      type: "DELETE",
      dataType: "json",
      success: function(data){
        model.clear();
        options.success && options.success();
      }
    });
  },

  fireSessionEvent: function(){
    if(this.isSignedIn()){
      this.trigger("signIn");
      console.log("currentUser is signed in!", this);
    } else {
      this.trigger("signOut");
      console.log("currentUser is signed out!", this);
    }
  }

});
