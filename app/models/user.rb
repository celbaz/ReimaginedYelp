class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6 , allow_nil: true}
  validates :username, uniqueness: true
  has_attached_file :image, default_url: "missing.gif"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  has_many :restaurants,
    class_name: "Restaurant",
    foreign_key: :user_id,
    primary_key: :id

  has_many :reviews,
    class_name: "Review",
    foreign_key: :user_id,
    primary_key: :id

  attr_reader :password
  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.valid_password?(password)
    user
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(
            provider: auth_hash[:provider],
            uid: auth_hash[:uid])

    if user.nil?
      user = User.create!(
        username: auth_hash[:info][:name],
        password: SecureRandom::urlsafe_base64,
        provider: auth_hash[:provider],
        uid: auth_hash[:uid])
    end

    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end
