class ClassGroup < ApplicationRecord
  # has_many :users
  belongs_to :school_center
  has_many :students, class_name: "User", foreign_key: "class_group_id"
  has_many :teacher_class_groups
  has_many :teachers,through: :teacher_class_groups, source: :user
end
