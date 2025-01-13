class Exercise < ApplicationRecord
  belongs_to :user
  belongs_to :task
  has_many :marks

  accepts_nested_attributes_for :marks, allow_destroy: true
end
