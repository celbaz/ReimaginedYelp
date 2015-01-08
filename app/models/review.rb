class Review < ActiveRecord::Base
  validates :title, :body, :user_id, :place_id,  presence: true
  validates :rating, inclusion: ["1","2","3", "4", "5"]
  # checks the food inspection include P and Z
  geocoded_by :address
  after_validation :geocode

end
