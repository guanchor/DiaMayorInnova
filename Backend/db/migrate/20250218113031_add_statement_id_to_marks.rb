class AddStatementIdToMarks < ActiveRecord::Migration[7.2]
  def change
    add_column :marks, :statement_id, :integer
  end
end
