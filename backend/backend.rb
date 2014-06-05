require 'sinatra'
require 'json'
require 'redis'

redis = Redis.new

cards = [
  { 'id' => 1, 'title' => 'Karte 1' },
  { 'id' => 2, 'title' => 'Karte 2' },
  { 'id' => 3, 'title' => 'Karte 3' },
  { 'id' => 4, 'title' => 'Karte 4' },
  { 'id' => 5, 'title' => 'Karte 5' }
]

get '/cards' do
  content_type :json

  { cards: cards }.to_json
end

get '/cards/:id' do |id|
  content_type :json

  { card: cards[id.to_i - 1] }.to_json
end

put '/cards/:id' do |id|
  content_type :json

  params = JSON.parse request.body.read
  cards[id.to_i - 1].merge!(params['card'])

  result = { card: cards[id.to_i - 1] }.to_json
  redis.publish 'demo', result
  result
end
