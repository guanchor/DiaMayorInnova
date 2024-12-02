class Account < ApplicationRecord
  belongs_to :accounting_plan
  has_many :help_examples
  has_many :annotations
end
