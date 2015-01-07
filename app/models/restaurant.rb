class Restaurant < ActiveRecord::Base
  validates :name, :food_inspection, presence: true
  validates :cuisine, :user_id, :street, :zipcode, :city, :state, presence: true
  validates :food_inspection, inclusion: ["A","B","C", "P", "Z"]
  # checks the food inspection include P and Z
  geocoded_by :address
  after_validation :geocode

  def address
    "#{self.street} #{self.city} #{self.state} #{self.zipcode} U.S.A."
  end

end
