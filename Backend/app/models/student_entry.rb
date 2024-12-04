class StudentEntry < ApplicationRecord
  has_many :marks
  has_many :student_annotations
  belongs_to :mark
end
