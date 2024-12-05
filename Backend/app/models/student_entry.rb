class StudentEntry < ApplicationRecord
  has_many :student_annotations , dependent: :destroy
  belongs_to :mark
end
