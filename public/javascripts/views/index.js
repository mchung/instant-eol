App.Views.Index = Backbone.View.extend({
  el: $("#main"),

  template: Handlebars.compile($("#index-template").html()),

  events: {
    "click a#search_action"  : "searchOnClick",
    "submit form"            : "searchOnSubmit"
  },

  initialize: function(args) {
    _.bindAll(this, "render");
  },

  render: function() {
    $(this.el).html(this.template());
    document.getElementById("search_query").focus();
    return this;
  },

  searchOnClick: function(e) {
    var q = $("#search_query").val();
    $("#progress").show();
    $("a#search_action").attr("href", "#search/" + q + "/1");
  },

  searchOnSubmit: function(e) {
    var q = $("#search_query").val();
    $("#progress").show();
    eol.app.search(q, 1);
  }
});
