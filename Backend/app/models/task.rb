class Task < ApplicationRecord
  has_and_belongs_to_many :statements, join_table: :task_statements
  belongs_to :user, foreign_key: :created_by

  validate :opening_date_is_before_closing_date

  private

  def opening_date_is_before_closing_date
    if opening_date.present? && closing_date.present? && opening_date >= closing_date
      errors.add(:opening_date, "debe ser anterior a la fecha de cierre")
    end
  end
end
