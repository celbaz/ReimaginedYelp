class Review < ActiveRecord::Base
  validates :title, :body, :user_id, :place_id,  presence: true
  validates :rating, inclusion: ["1","2","3", "4", "5"]

  belongs_to :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id


  belongs_to :restaurant,
    class_name: "Restaurant",
    foreign_key: :place_id,
    primary_key: :id
end
