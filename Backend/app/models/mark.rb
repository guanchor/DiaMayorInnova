class Mark < ApplicationRecord
  has_many :student_entries
  belongs_to :exercise
end
