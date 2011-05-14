App.Controllers.Search = Backbone.Controller.extend({
    routes: {
        "search/:query/:page": "search",
        "": "index"
    },

    // This view is rendered by default
    index: function() {
      new App.Views.Index().render();
    },

    // This view is rendered when a user arrives at #search.
    //
    // For example, http://localhost/#search/Lion/1
    search: function(query, page) {
      if (query === "" || query === undefined) {
        query = "Panthera Leo";
      }
      if (page === undefined) {
        page = 1;
      }
      var url = "search/" + query + "/" + page;

      console.log("#" + url);

      Backbone.history.saveLocation(url);
      var rv = new ResultSet();

      // The server's url method signature matches the fragment
      rv.url = function() {
        return url;
      };

      rv.fetch({
        success: function(collection, response) {
          // console.log("success");
          // console.log(collection);
          // console.log(response);
          new App.Views.Results({model: collection}).render();
        }
      });
    }

    // edit: function(id) {
    //     var doc = new Document({ id: id });
    //     doc.fetch({
    //         success: function(model, resp) {
    //             new App.Views.Edit({ model: doc });
    //         },
    //         error: function() {
    //             new Error({ message: 'Could not find that document.' });
    //             window.location.hash = '#';
    //         }
    //     });
    // },
    // 
    // index: function() {
    //     var documents = new App.Collections.Documents();
    //     documents.fetch({
    //         success: function() {
    //             new App.Views.Index({ collection: documents });
    //         },
    //         error: function() {
    //             new Error({ message: "Error loading documents." });
    //         }
    //     });
    // },
    // 
    // newDoc: function() {
    //     new App.Views.Edit({ model: new Document() });
    // }
});
