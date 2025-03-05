class ClassGroup < ApplicationRecord
  # has_many :users
  belongs_to :school_center
  has_many :student_class_groups, dependent: :destroy
  has_many :students, through: :student_class_groups, source: :user
  has_many :teacher_class_groups, dependent: :destroy
  has_many :teachers,through: :teacher_class_groups, source: :user
end
