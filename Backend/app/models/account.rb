class Account < ApplicationRecord
  belongs_to :accounting_plan
  has_many :help_examples, dependent: :destroy
  has_many :annotations, dependent: :destroy
end

# A