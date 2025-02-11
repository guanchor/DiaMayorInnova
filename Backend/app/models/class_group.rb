class ClassGroup < ApplicationRecord
  has_many :users
  has_many :teacher_class_groups
  has_many :teachers,through: :teacher_class_groups
end
