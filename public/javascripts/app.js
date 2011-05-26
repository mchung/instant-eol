var eol = {};

// For more information on this organizational pattern, refer to James Yu's
// blog post titled "A Backbone.js Tutorial with Rails (Part 1)" referenced
// in the README.
var App = {
  Views: {},
  Controllers: {},
  Collections: {},
  init: function() {

    // Configure Backbone to interpolate Mustache/Handlebars template.
    _.templateSettings = {
      interpolate : /\{\{(.+?)\}\}/g
    };

    // Add {{images}} helper to Handlebars.
    //
    // The following helper displays a list of images on multiple rows.
    // Currently, this is hard coded to 5 images per row.
    Handlebars.registerHelper('images', function(images, fn) {
      var out = "<tr>";

      var i = 0;
      for(i = 0, l = images.length; i < l; i++) {
        out = out + "<td>" + fn(images[i]) + "</td>";
        if (i % 5 == 4) {
          out = out + "</tr><tr>";
        }
      }

      return out + "</tr>";
    });

    // Load the main controller (search) and start Backbone.
    eol.app = new App.Controllers.Search();
    Backbone.history.start();
  }
};
