class Restaurant < ActiveRecord::Base
  validates :name, presence: true
  validates :user_id, :street, :zipcode, :city, :state, presence: true
  # validates :food_inspection, inclusion: ["A", "B", "C", "P", "Z"]

  belongs_to :owner,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id

  has_many :reviews,
    class_name: "Review",
    foreign_key: :place_id,
    primary_key: :id

  geocoded_by :address
  after_validation :geocode

  def address
    "#{self.street} #{self.city} #{self.state} #{self.zipcode} U.S.A."
  end

  def self.search(keyword, location, rating, distance)
    result = self.near(location, distance)
    if keyword.present?
      result = result.where("(name LIKE :key) OR (cuisine LIKE :key)",key: "%#{keyword}")
    end
    if rating != "Any"
      result = result.where(rating: rating)
    end
    result
  end
end
