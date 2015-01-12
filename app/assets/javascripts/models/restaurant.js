YelpClone.Models.Restaurant = Backbone.Model.extend({
  urlRoot: "api/restaurants/",

  toJSON: function(){
    // We want proper namespacing of our attributes in Rails.
    var json = {place: _.clone(this.attributes)};

    if (this._place) {
      json.place = this._place;
    }

    return json;
  }
})
