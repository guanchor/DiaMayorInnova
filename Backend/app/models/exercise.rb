class Exercise < ApplicationRecord
  belongs_to :user
  belongs_to :task
  has_many :marks
end
