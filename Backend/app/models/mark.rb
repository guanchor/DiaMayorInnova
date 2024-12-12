class Mark < ApplicationRecord
  has_many :student_entries, dependent: :destroy
  belongs_to :exercise
end
