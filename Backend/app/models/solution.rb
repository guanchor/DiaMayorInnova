class Solution < ApplicationRecord
  belongs_to :statement
  has_many :entries, dependent: :destroy

  accepts_nested_attributes_for :entries, allow_destroy: true
end
