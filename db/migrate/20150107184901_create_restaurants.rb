class CreateRestaurants < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
      t.integer :user_id, null:false
      t.string  :name, null:false
      t.string  :food_inspection
      t.float   :longitude
      t.float   :latitude
      t.string  :zipcode, null:false
      t.string  :street, null:false
      t.string  :city, null: false
      t.string  :state, null:false
      t.integer :phone_number
      t.string :cuisine, null: false
      t.timestamps
    end
  end
end
