class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_one_attached :featured_image

  has_many :user_roles, dependent: :destroy
  has_many :roles, through: :user_roles
  has_many :statements
  has_many :tasks, through: :exercises
  
  acts_as_token_authenticatable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :name, :first_lastName, :second_lastName, presence: true

  # Verificación de roles
  def admin?
    has_role?(:admin)
  end

  def teacher?
    has_role?(:teacher)
  end

  def student?
    has_role?(:student)
  end
  
  def has_role?(role_name)
    roles.exists?(name: role_name)
  end
  
  def generate_new_authentication_token
    token = User.generate_unique_secure_token
    update(authentication_token: token)
  end 
end
