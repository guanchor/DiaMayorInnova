class Annotation < ApplicationRecord
  belongs_to :entry
  belongs_to :account

  validates :account, presence: true

  before_validation :assign_account_id

  private

  def assign_account_id
    if account_number.present?
      account = Account.find_by(account_number: account_number)
      self.account_id = account.id if account
    end
  end
end
