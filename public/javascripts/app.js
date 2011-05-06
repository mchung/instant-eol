var eol = {};

var App = {
  Views: {},
  Controllers: {},
  Collections: {},
  init: function() {

    _.templateSettings = {
      interpolate : /\{\{(.+?)\}\}/g
    },

    Handlebars.registerHelper('images', function(images, fn) {
      var out = "<tr>";

      for(var i = 0, l = images.length; i < l; i++) {
        out = out + "<td>" + fn(images[i]) + "</td>";
        if (i % 5 == 4) {
          out = out + "</tr><tr>";
        }
      }

      return out + "</tr>";
    });

    eol.app = new App.Controllers.Search();
    Backbone.history.start();
  }
};
