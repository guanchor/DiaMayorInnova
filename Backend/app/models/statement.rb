class Statement < ApplicationRecord
  has_and_belongs_to_many :tasks, join_table: :task_statements
end
