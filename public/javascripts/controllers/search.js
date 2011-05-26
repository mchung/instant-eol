App.Controllers.Search = Backbone.Controller.extend({

  // This controller is responsible for the following activites
  routes: {
    // The results page, with the list of images. An example of a full URL:
    // - http://localhost/#search/Lion/1
    // - http://localhost/#search/Unicorn/1
    "search/:query/:page": "search",
    // The index page, with the single text field for searching.
    "": "index"
  },

  // By default, this view is rendered when a user visits our application.
  index: function() {
    new App.Views.Index().render();
  },

  // This view is rendered when a user submits a search query.
  search: function(query, page) {

    // When a user submits an empty query, our default search is for the
    // almighty Panthera Leo.
    if (query === "" || query === undefined) {
      query = "Panthera Leo";
    }
    if (page === undefined) {
      page = 1;
    }
    var url = "search/" + query + "/" + page;

    console.log("#" + url);

    // Write the current URL to the browser's URL window whenever a new
    // search query has been submitted. We do this for two reasons:
    // 1. Users can save their search results as a bookmark
    // 2. To preserve the functionality of the browser's back button
    Backbone.history.saveLocation(url);
    var rv = new ResultSet();

    // The server's url method signature matches the fragment. Normally
    // this URL points at some RESTful interface on the server side, but
    // since we're building a search interface, this URL points to the
    // actual search method.
    //
    // The server's search API and the browser's URL fragment are
    // deliberately identical.
    rv.url = function() {
      return url;
    };

    // Fetch our search results from the server side and render the results
    rv.fetch({
      success: function(collection, response) {
        // console.log("success");
        // console.log(collection);
        // console.log(response);
        new App.Views.Results({model: collection}).render();
      }
      // TODO: Possibly handle the case where no results are available.
      // , error :function() {}
    });
  }
});
