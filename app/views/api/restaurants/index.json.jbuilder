json.array! @places do |place|

  json.extract place, :name, :food_inspection, :cuisine, :street, :zipcode,
  :city, :state, :phone_number

end
