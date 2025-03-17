class StudentAnnotation < ApplicationRecord
  belongs_to :account, optional: true
  belongs_to :student_entry
end
