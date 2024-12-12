class Task < ApplicationRecord
  has_and_belongs_to_many :statements, join_table: :task_statements
  belongs_to :user, foreign_key: :created_by
end
