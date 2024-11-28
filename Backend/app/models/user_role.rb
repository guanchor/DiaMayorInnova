class UserRole < ApplicationRecord
  belongs_to :user
  belongs_to :role

  # Validación para evitar duplicados
  validates :user_id, uniqueness: { scope: :role_id, message: "ya tiene este rol asignado" }
end