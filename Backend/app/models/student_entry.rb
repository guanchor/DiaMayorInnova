class StudentEntry < ApplicationRecord
  has_many :student_annotations , dependent: :destroy
  belongs_to :mark

  accepts_nested_attributes_for :student_annotations, allow_destroy: true
end
