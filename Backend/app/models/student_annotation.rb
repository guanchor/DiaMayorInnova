class StudentAnnotation < ApplicationRecord
  belongs_to :account
  belongs_to :student_entry
end
