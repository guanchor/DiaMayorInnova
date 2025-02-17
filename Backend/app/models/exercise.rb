class Exercise < ApplicationRecord
  belongs_to :user
  belongs_to :task
  has_many :marks, dependent: :destroy

  def total_mark
    marks_count = marks.count
    return 0 if marks_count == 0
    marks.sum(:mark)&.to_f / marks_count || 0
  end

  accepts_nested_attributes_for :marks, allow_destroy: true
end
