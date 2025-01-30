class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_one_attached :featured_image

  has_many :statements
  has_many :tasks, through: :exercises
  has_many :exercises, dependent: :destroy
  
  acts_as_token_authenticatable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :name, :first_lastName, :second_lastName, presence: true

  validates :role, presence: true, inclusion: { in: %w[admin teacher student], message: "%{value} no es un rol válido" }

  # Verificación de roles
  def admin?
    role == 'admin'
  end

  def teacher?
    role == 'teacher'
  end

  def student?
    role == 'student'
  end
  
  def generate_new_authentication_token
    token = User.generate_unique_secure_token
    update(authentication_token: token)
  end 
end
