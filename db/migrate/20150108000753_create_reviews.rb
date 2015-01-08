class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.text :body, null: false
      t.string :title
      t.integer :user_id, null: false
      t.integer :place_id
      t.string :rating, null: false
      t.timestamps
    end
  end
end
