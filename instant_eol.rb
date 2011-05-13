require 'sinatra/base'
require 'eoflife'
require 'json'
require 'dalli'

require 'pp'

module InstantEol
  class Application < Sinatra::Base

    set :raise_errors, true
    set :views, "views"
    set :public, "public"
    set :static, true
    set :haml, :format => :html5
    set :sass, :style => :compact # default Sass style is :nested. Other options include :expanded and :compressed
    set :cache, Dalli::Client.new

    get "/" do
      @history = fetch_history()
      haml :index
    end

    get "/application.css" do
      response["Content-Type"] = "text/css; charset=utf-8"
      scss :style, :style => :compressed
    end

    get "/search/:query/:page" do
      content_type :json
      query = params[:query]
      page = params[:page]

      client = Eoflife::Client.new
      results = client.search(query, {"page" => page, "exact" => "0"})

      # Return images. For each raw result, run a query for a specific page
      # and return the images.
      #
      # The equivalent of N+1 for API calls.
      rv = []
      pp [:search, query, results["results"].length]
      results["results"].each_with_index do |r, idx|
        # Quit after we've run 10 queries
        break if idx == 10

        # Fetch each page in full from the API
        images = client.pages(r["id"], :details => "1", :images => "75")

        # For each page, add images
        images.dataObjects.each do |o|
          if o.dataType == "http://purl.org/dc/dcmitype/StillImage"
            rv << { :query => query,
                    :id => r["id"],
                    :title => r["title"],
                    :link => r["link"],
                    :content => r["content"],
                    :eolThumbnailURL => o.eolThumbnailURL,
                    :eolMediaURL => o.eolMediaURL
                  }

          end
        end
      end
      pp [:results, rv.size]
      if rv.size > 0
        update_history(query)
      end
      { :search => query, :results => rv }.to_json
    end

    def update_history(query)
      history = settings.cache.get("history") || []
      if history.length == 10
        history = history.last(history.length - 1)
      end
      history << query
      settings.cache.set("history", history)
    end

    def fetch_history()
      settings.cache.get("history")
    end
  end
end