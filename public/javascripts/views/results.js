App.Views.Results = Backbone.View.extend({
  el: $("#main"),

  template: Handlebars.compile($("#results-template").html()),

  events: {
    // "click a.images_action"  : "imagesOnClick",
    "click a#search_action"  : "searchOnClick",
    "submit form"            : "searchOnSubmit"
  },

  initialize: function(options) {
    _.bindAll(this, "render");
    this.results = this.options.model;
  },

  render: function() {
    var images = this.results.map(function(r) { return r.toJSON(); });
    var context = { "results": images, "query": images[0].query };
    console.log("Rendering results like a boss");
    console.log(context);
    $(this.el).html(this.template(context));
    return this;
  },

  // imagesOnClick: function(e) {
  //   e.preventDefault();
  //   var pageId = e.target.getAttribute("data-eol-page-id");
  //   $.get("/images/" + pageId, function(data) {
  //     var tmpl = Handlebars.compile($("#images-template").html());
  //     console.log("Rendering images");
  //     console.log(data.results.length);
  //     $("#images").html(tmpl(data));
  //   }, "json");
  //
  // },

  searchOnClick: function(e) {
    var q = $("#search_query").val();
    $("#progress").show();
    $("#results").hide();
    $("a#search_action").attr("href", "#search/" + q + "/1");
  },

  searchOnSubmit: function(e) {
    var q = $("#search_query").val();
    $("#progress").show();
    $("#results").hide();
    eol.app.search(q, 1);
  }

});
