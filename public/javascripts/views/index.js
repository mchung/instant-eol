App.Views.Index = Backbone.View.extend({
  el: $("#main"),

  template: Handlebars.compile($("#index-template").html()),

  events: {
    "click a#search_action"         : "searchOnClick",
    "submit form"                   : "searchOnSubmit",
    "click a.saved_search_action"   : "searchSavedOnClick"
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
    _gaq.push(['_trackEvent', 'Search', 'click - index', q]);
    $("#progress").show();
    $("a#search_action").attr("href", "#search/" + q + "/1");
  },

  searchOnSubmit: function(e) {
    var q = $("#search_query").val();
    _gaq.push(['_trackEvent', 'Search', 'submit - index', q]);
    $("#progress").show();
    eol.app.search(q, 1);
  },

  searchSavedOnClick: function(e) {
    // var q = e.target.dataset.searchQuery; # new hotness
    // var q = e.target.attributes.getNamedItem("data-search-query").value; # old and busted
    var q = e.target.getAttribute("data-search-query");
    $("#search_query").val(q);
    _gaq.push(['_trackEvent', 'Search', 'saved - index', q]);
    $("#progress").show();
  }
});
