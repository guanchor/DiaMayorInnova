class Annotation < ApplicationRecord
  belongs_to :entry
  belongs_to :account

  validates :account, presence: true
  validates :credit, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :debit, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validate :credit_or_debit_but_not_both

  before_validation :assign_account_id

  private

  def assign_account_id
    if account_number.present?
      account = Account.find_by(account_number: account_number)
      self.account_id = account.id if account
    end
  end

  def credit_or_debit_but_not_both
    if credit.to_f > 0 && debit.to_f > 0
      errors.add(:base, "No se puede ingresar un valor en credit y debit al mismo tiempo.")
    end
  end
end
