var ResultSet = Backbone.Collection.extend({
  model: Result,

  // Returns the URL to our JSON endpoint, "/search/Homo sapiens/1"
  url: function() {
    throw "YourLazyAssException: forgot to override ResultSet#url";
  },

  parse: function(response) {
    var rv = _(response.results).map(function(i) { return new Result(i); });
    // console.log("parse");
    // console.log(rv);
    return rv;
  }
});