json.(@user, :username, :nickname, :location, :description, :created_at)
json.image_url asset_path(@user.image.url)

json.reviews @user.reviews do |review|
  json.(review, :title, :body, :rating, :user_id, :place_id, :id)
  rest = review.restaurant
  json.latitude rest.latitude
  json.longitude rest.longitude
  json.restaurant rest.name
end


json.restaurants @user.restaurants do |place|
  json.(place, :name, :food_inspection, :cuisine, :street, :zipcode,
  :city, :state, :phone_number, :user_id, :id)
end
