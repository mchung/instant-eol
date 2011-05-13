var ResultSet = Backbone.Collection.extend({
  model: Result,

  // Returns the URL to our JSON endpoint, "/search/Homo sapiens/1"
  url: function() {
    throw "YourLazyAssException: forgot to override ResultSet#url";
  },

  search: function() {
    return this.search;
  },

  parse: function(response) {
    var rv = _(response.results).map(function(i) { return new Result(i); });
    this.search = response.search;
    // console.log("parse");
    // console.log(rv);
    return rv;
  }
});