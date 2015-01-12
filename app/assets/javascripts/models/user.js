YelpClone.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users/',

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
  }


});
