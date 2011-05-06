ENV["TZ"] = "America/Phoenix"
ENV["RACK_ENV"] = "development" unless ENV["RACK_ENV"]

begin
  # Require the preresolved locked set of gems.
  require File.expand_path('../.bundle/environment', __FILE__)
rescue LoadError
  # Fallback on doing the resolve at runtime.
  require "rubygems"
  require "bundler"
  Bundler.setup
end

# log = File.new("log/#{ENV['RACK_ENV']}.log", "a")
# STDOUT.reopen(log)
# STDERR.reopen(log)

require File.dirname(__FILE__) + "/instant_eol"
run InstantEol::Application
