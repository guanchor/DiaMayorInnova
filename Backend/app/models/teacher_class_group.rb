class TeacherClassGroup < ApplicationRecord
  belongs_to :user
  belongs_to :class_group
end
