class Restaurant < ActiveRecord::Base
  validates :name, :food_inspection, presence: true
  validates :user_id, :street, :zipcode, :city, :state, presence: true
  validates :food_inspection, inclusion: ["A", "B", "C", "P", "Z"]

  belongs_to :owner,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id

  has_many :reviews,
    class_name: "Restaurant",
    foreign_key: :place_id,
    primary_key: :id

  geocoded_by :address
  after_validation :geocode
  
  def address
    "#{self.street} #{self.city} #{self.state} #{self.zipcode} U.S.A."
  end

end
