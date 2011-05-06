require 'eoflife'
require 'pp'

client = Eoflife::Client.new
rv = client.search("Western Honeybee")
total = rv["totalResults"].to_i

if total >= 1
  first = rv["results"].first
  id = first.id
  rv = client.pages(id, :details => "1", :images => "75")
  rv.dataObjects.each do |o|
    puts o.mediaURL if o.mediaURL
    puts o.eolMediaURL if o.eolMediaURL
  end
end
