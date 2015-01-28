# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# 
# require 'yaml'
#
# nyhealth  = User.new({username: "foodinspect@nyc.gov",
#    password: 'foodinspect@nyc.gov', nickname: 'NYC Food Inspectors'});
#
# places = YAML.load_file('notes/seeder.yml');

#
# create_table "restaurants", force: true do |t|
#   t.integer  "user_id",         null: false
#   t.string   "name",            null: false
#   t.string   "food_inspection", null: false
#   t.float    "longitude",       null: false
#   t.float    "latitude",        null: false
#   t.string   "zipcode",         null: false
#   t.string   "street",          null: false
#   t.string   "city",            null: false
#   t.string   "state",           null: false
#   t.integer  "phone_number"
#   t.string   "cuisine",         null: false
#   t.datetime "created_at"
#   t.datetime "updated_at"
# end
#
# create_table "users", force: true do |t|
#   t.string   "username",           null: false
#   t.string   "session_token",      null: false
#   t.string   "password_digest",    null: false
#   t.datetime "created_at"
#   t.datetime "updated_at"
#   t.string   "nickname"
#   t.string   "location"
#   t.string   "description"
#   t.string   "image_file_name"
#   t.string   "image_content_type"
#   t.integer  "image_file_size"
#   t.datetime "image_updated_at"
# end
