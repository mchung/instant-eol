App.Views.Results = Backbone.View.extend({
  el: $("#main"),

  template: Handlebars.compile($("#results-template").html()),

  events: {
    "click a#search_action"           : "searchOnClick",
    "submit form"                     : "searchOnSubmit",
    "click a.suggested_search_action" : "searchSuggestedOnClick"
  },

  initialize: function(options) {
    _.bindAll(this, "render");
    this.results = this.options.model;
  },

  render: function() {
    var images = this.results.map(function(r) { return r.toJSON(); });
    var context = { "results": images, "query": this.results.search };
    // console.log("Rendering results like a boss");
    // console.log(context);
    $(this.el).html(this.template(context));
    if (images.length == 0) {
      $("#no_results").show();
    }
    return this;
  },

  searchOnClick: function(e) {
    var q = $("#search_query").val();
    _gaq.push(['_trackEvent', 'Search', 'click - results', q]);
    $("#progress").show();
    $("#results").hide();
    $("a#search_action").attr("href", "#search/" + q + "/1");
  },

  searchOnSubmit: function(e) {
    var q = $("#search_query").val();
    _gaq.push(['_trackEvent', 'Search', 'submit - results', q]);
    $("#progress").show();
    $("#results").hide();
    eol.app.search(q, 1);
  },

  searchSuggestedOnClick: function(e) {
    var q = e.target.getAttribute("data-search-query");
    $("#search_query").val(q);
    _gaq.push(['_trackEvent', 'Search', 'suggest - results', q]);
    $("#progress").show();
  }

});
