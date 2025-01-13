class AccountingPlan < ApplicationRecord
  has_many :accounts, dependent: :destroy
end
