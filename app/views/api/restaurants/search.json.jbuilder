json.results @search_results do |model|
  # json.partial! model
  if model.class == Restaurant
    json.partial! "api/restaurants/restaurant", place: model
  end
end
