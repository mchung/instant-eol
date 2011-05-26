# Instant EOL Image Search

Instant-EOL is a micro web application that allows visitors to search for
images on the [Encyclopedia of Life][1].

It has one single purpose: fast and convenient image searching and browsing.

## Behind the scenes

This web application is an experiment with the following JavaScript libraries:

* [Zepto][13], for DOM manipulation. Zepto is a light-weight (as well as API-compatible) alternative to jQuery.
* [Backbone][14], for organizing JavaScript code. Backbone is a library that encourages developers to separate code into models, views, and controllers. It also plays nicely with RESTful web services.
* [handlebars.js][15], for templating.  Handlebars.js is a syntax-compatible superset of Mustache.  Of all the templating libraries, this was my favorite implementation.

The rest of the application is written with:

* [Sinatra][16]
* [Haml][17] and [Scss][18]
* [Dalli][19]

## Overview

I'm planning to document several parts of the application.

The JavaScript application is initialized in app.js

<script src="https://gist.github.com/992681.js?file=app.js"></script>

The single controller is located in search.js

<script src="https://gist.github.com/992681.js?file=search.js"></script>

[Current progress][21]

## Dependencies

* ruby-1.9.2-p180
* RVM
* bundler
* memcached

## Running the code locally

The repository also contains the necessary Bundler and RVM resources to get
setup with minimal effort.

    git clone git://github.com/mchung/instant-eol.git
    cd instant-eol

At this point, RVM will launch the .rvmrc wizard.  If you decide to
accept the .rvmrc configuration, RVM will create the following gemset:

    rvm --create 1.9.2-p180@instant-eol

Now you can setup the dependencies by running the following command:

    bundle install

Note: If you previously decided not to accept the .rvmrc configuration,
then Bundler will install gems into your default rubygems location.

To launch the web server and memcached, run the following command:

    foreman start

Alternatively, you can launch the servers separately by running the following
command in two different shells.

    shotgun --server=thin --port=5000 config.ru

    memcached -vvv

## Learn you some Backbone

* [Building a single page app with Backbone.js, underscore.js and jQuery][2].  A good introduction to Backbone.
* [A Backbone.js Tutorial with Rails (Part 1)][5] and [Part 2][6].  The two articles that most influenced the organization and structure of Instant-EOL.
* [Annotated source code for todos.js, an example Backbone app][7].
* [FireCamp, another Sinatra/Backbone.js demo app][8].
* [The Backbone Store, a demo app][3].  Check out the well-organized code in store.js.
* [Backbone Mobile, a demo app][9]. Great looking CoffeeScript code.
* [The mother of all Backbone resources][10]. On Quora.
* [A simple Backbone app][12].
* [Misadventure, a demo app built on faux, a library for building Single Page Interface (or "SPI" applications with Backbone)][4].  Make sure to read Misadventure Code Review, a series of blog posts walking through the source code.  (Instant-EOL does not use faux.)
* [Introduction to Handlebars.js][11].


[1]: http://eol.org

[2]: http://andyet.net/blog/2010/oct/29/building-a-single-page-app-with-backbonejs-undersc

[3]: http://elfsternberg.com/projects/backbone_store

[4]: https://github.com/unspace/faux/tree/master/examples/misadventure

[5]: http://www.jamesyu.org/2011/01/27/cloudedit-a-backbone-js-tutorial-by-example

[6]: http://www.jamesyu.org/2011/02/09/backbone.js-tutorial-with-rails-part-2

[7]: http://documentcloud.github.com/backbone/docs/todos.html

[8]: http://ryandotsmith.heroku.com/2010/10/a-backbone-js-demo-app-sinatra-backend.html

[9]: http://bennolan.com/2010/11/24/backbone-jquery-demo.html

[10]: http://www.quora.com/What-are-some-good-resources-for-Backbone-js

[11]: http://thinkvitamin.com/code/handlebars-js-part-2-partials-and-helpers

[12]: https://gist.github.com/828553

[13]: http://zeptojs.com

[14]: http://documentcloud.github.com/backbone

[15]: http://handlebars.strobeapp.com

[16]: http://sinatrarb.com

[17]: http://haml-lang.com

[18]: http://sass-lang.com

[19]: https://github.com/mperham/dalli

[21]: https://gist.github.com/992681