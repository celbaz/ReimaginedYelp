json.extract! place, :name, :food_inspection, :cuisine, :street, :zipcode,
:city, :state, :phone_number, :latitude, :longitude, :id

json.reviews place.reviews do |review|
  json.(review, :title, :body, :user_id, :rating)
  json.created_at time_ago_in_words(review.created_at)
end
