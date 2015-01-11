YelpClone.Models.currentLocation = Backbone.Model.extend({
  gps:[],

  getLocation: function (lat,long) {
    if(lat === 'undefined' || long === 'undefined') {
      L.control.locate()
    } else {
      this.gps[0] = lat;
      this.gps[1] = long;
      return this.gps;
    }

  }
});
