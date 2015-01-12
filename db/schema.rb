# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150111002122) do

  create_table "restaurants", force: true do |t|
    t.integer  "user_id",         null: false
    t.string   "name",            null: false
    t.string   "food_inspection", null: false
    t.float    "longitude",       null: false
    t.float    "latitude",        null: false
    t.string   "zipcode",         null: false
    t.string   "street",          null: false
    t.string   "city",            null: false
    t.string   "state",           null: false
    t.integer  "phone_number"
    t.string   "cuisine",         null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "reviews", force: true do |t|
    t.text     "body",       null: false
    t.string   "title"
    t.integer  "user_id",    null: false
    t.integer  "place_id"
    t.string   "rating",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "session_token",   null: false
    t.string   "password_digest", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "nickname"
    t.string   "location"
    t.string   "description"
  end

end
