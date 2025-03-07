class AccountingPlan < ApplicationRecord
  has_many :accounts, dependent: :destroy

  validates :name, :acronym, :description, presence: true
  validates :id, uniqueness: true, numericality: { only_integer: true }
end

