class AddStatementIdToSolutions < ActiveRecord::Migration[7.2]
  def change
    add_reference :solutions, :statement, null: false, foreign_key: true
  end
end
