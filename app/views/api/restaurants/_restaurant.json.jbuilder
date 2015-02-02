json.extract! place, :name, :food_inspection, :cuisine, :street, :zipcode,
:city, :state, :phone_number, :latitude, :longitude, :id

json.reviews place.reviews do |review|
  json.(review, :title, :body )
end
