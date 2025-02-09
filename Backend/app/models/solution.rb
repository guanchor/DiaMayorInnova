class Solution < ApplicationRecord
  belongs_to :statement
  has_many :entries, dependent: :destroy

  validates :description, uniqueness: { scope: :statement_id }

  accepts_nested_attributes_for :entries, allow_destroy: true
end
