# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)



require 'yaml'
places = YAML.load_file("#{Rails.root}/db/seeder.yml")
places.shuffle!

nyhealth  = User.new({username: "foodinspect@nyc.gov",
   password: 'foodinspect@nyc.gov', nickname: 'NYC Food Inspectors',
   location: "NYC", description: "We're those guys that test the food"})

nyhealth.save!


places = places[0...2000]

places.each_index do |i|

  sleep(5) if i % 4

  temp = Restaurant.new( {user_id: nyhealth.id , name: places[i][1],
     street: places[i][3] + places[i][4], city: "New York", state: "New York",
     food_inspection: places[i][13], cuisine: places[i][7].upcase, zipcode: places[i][5] })

  temp.save!

end
