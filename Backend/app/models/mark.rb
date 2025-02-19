class Mark < ApplicationRecord
  has_many :student_entries, dependent: :destroy
  belongs_to :exercise
  belongs_to :statement, optional: true
  accepts_nested_attributes_for :student_entries, allow_destroy: true
end
