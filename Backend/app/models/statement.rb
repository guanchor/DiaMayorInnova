class Statement < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :tasks, join_table: :task_statements
  has_many :solutions

  accepts_nested_attributes_for :solutions, allow_destroy: true
  validates :definition, :explanation, presence: true
  validates :is_public, inclusion: { in: [true, false] }
end
